#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


DEFAULT_SOURCE_ROOT = Path(
    "/Users/goryugo/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian_local/Astro/Publish"
)
DEFAULT_OUTPUT_JSON = Path("data/books/books.json")
DEFAULT_IMAGE_DIR = Path("public/images/books")
USER_AGENT = "Mozilla/5.0 (compatible; goryugo-books-sync/1.0)"
PUBLISH_IMAGE_DIR = DEFAULT_SOURCE_ROOT / "img"


PERMALINK_RE = re.compile(r"^permalink:\s*(?P<value>.+?)\s*$", re.MULTILINE)
TITLE_RE = re.compile(r'<img[^>]+alt="(?P<title>[^"]+)"')
IMAGE_RE = re.compile(r'<img[^>]+src="(?P<url>[^"]+)"')
LINK_RE = re.compile(r'<a[^>]+href="(?P<url>[^"]+)"[^>]*>(?P<label>.*?)</a>', re.DOTALL)
ASIN_RE = re.compile(r"/ASIN/([0-9A-Z]{10})/")
CARD_START = '<div style="border: 1px solid #e5e7eb;'


@dataclass
class BookRecord:
    asin: str
    title: str
    amazon_url: str
    kindle_url: str
    image_url: str
    local_image: str
    authors: list[str]
    publisher: str
    published_date: str
    source_logs: list[dict[str, str]]

    def to_dict(self) -> dict[str, object]:
        return {
            "asin": self.asin,
            "title": self.title,
            "amazon_url": self.amazon_url,
            "kindle_url": self.kindle_url,
            "image_url": self.image_url,
            "local_image": self.local_image,
            "authors": self.authors,
            "publisher": self.publisher,
            "published_date": self.published_date,
            "source_logs": self.source_logs,
        }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract book cards from read-log notes and cache cover images into this repo."
    )
    parser.add_argument("--source-root", type=Path, default=DEFAULT_SOURCE_ROOT)
    parser.add_argument("--output-json", type=Path, default=DEFAULT_OUTPUT_JSON)
    parser.add_argument("--image-dir", type=Path, default=DEFAULT_IMAGE_DIR)
    parser.add_argument("--skip-download", action="store_true")
    return parser.parse_args()


def slug_files(source_root: Path) -> list[Path]:
    return sorted(
        path
        for path in source_root.rglob("*読んだ本.md")
        if path.name != "📋読んだ本.md"
    )


def read_permalink(text: str) -> str:
    match = PERMALINK_RE.search(text)
    return match.group("value").strip() if match else ""


def extract_meta(meta_block: str) -> tuple[list[str], str, str]:
    authors: list[str] = []
    publisher = ""
    published_date = ""
    for line in meta_block.splitlines():
        if line.startswith("著者："):
            raw = line.removeprefix("著者：").strip()
            authors = [part.strip() for part in re.split(r"[、,／/]", raw) if part.strip()]
        elif line.startswith("出版社："):
            publisher = line.removeprefix("出版社：").strip()
        elif line.startswith("出版日："):
            published_date = line.removeprefix("出版日：").strip()
    return authors, publisher, published_date


def pick_links(card_html: str) -> tuple[str, str]:
    amazon_url = ""
    kindle_url = ""
    for match in LINK_RE.finditer(card_html):
        label = unescape(re.sub(r"<.*?>", "", match.group("label"))).strip()
        url = unescape(match.group("url").strip())
        if "Amazon" in label and not amazon_url:
            amazon_url = url
        if "Kindle" in label and not kindle_url:
            kindle_url = url
    if not amazon_url:
        for match in LINK_RE.finditer(card_html):
            url = unescape(match.group("url").strip())
            if "amazon.co.jp" in url:
                amazon_url = url
                break
    if not kindle_url:
        kindle_url = amazon_url
    return amazon_url, kindle_url


def infer_extension(image_url: str) -> str:
    path = urlparse(image_url).path.lower()
    suffix = Path(path).suffix
    return suffix if suffix in {".jpg", ".jpeg", ".png", ".webp"} else ".jpg"


def normalize_title(value: str) -> str:
    return unescape(value).strip()


def extract_books(path: Path) -> list[BookRecord]:
    text = path.read_text()
    permalink = read_permalink(text)
    month_note = path.stem
    records: list[BookRecord] = []

    for card_html, meta_block in iter_card_blocks(text):
        title_match = TITLE_RE.search(card_html)
        image_match = IMAGE_RE.search(card_html)
        if not title_match or not image_match:
            continue

        amazon_url, kindle_url = pick_links(card_html)
        asin_match = ASIN_RE.search(amazon_url or kindle_url)
        if not asin_match:
            continue

        asin = asin_match.group(1)
        title = normalize_title(title_match.group("title"))
        image_url = unescape(image_match.group("url").strip())
        authors, publisher, published_date = extract_meta(meta_block)
        extension = infer_extension(image_url)

        records.append(
            BookRecord(
                asin=asin,
                title=title,
                amazon_url=amazon_url,
                kindle_url=kindle_url,
                image_url=image_url,
                local_image=f"/images/books/{asin}{extension}",
                authors=authors,
                publisher=publisher,
                published_date=published_date,
                source_logs=[{"permalink": permalink, "month_note": month_note}],
            )
        )

    return records


def iter_card_blocks(text: str) -> list[tuple[str, str]]:
    lines = text.splitlines()
    blocks: list[tuple[str, str]] = []
    index = 0

    while index < len(lines):
        line = lines[index]
        if not line.startswith(CARD_START):
            index += 1
            continue

        html_lines: list[str] = []
        depth = 0
        while index < len(lines):
            current = lines[index]
            html_lines.append(current)
            depth += current.count("<div")
            depth -= current.count("</div>")
            index += 1
            if depth <= 0 and current.strip() == "</div>":
                break

        meta_lines: list[str] = []
        while index < len(lines) and lines[index].startswith(("著者：", "出版社：", "出版日：")):
            meta_lines.append(lines[index])
            index += 1

        blocks.append(("\n".join(html_lines), "\n".join(meta_lines)))

    return blocks


def merge_books(records: list[BookRecord]) -> list[BookRecord]:
    merged: dict[str, BookRecord] = {}
    for record in records:
        current = merged.get(record.asin)
        if current is None:
            merged[record.asin] = record
            continue

        if not current.amazon_url and record.amazon_url:
            current.amazon_url = record.amazon_url
        if not current.kindle_url and record.kindle_url:
            current.kindle_url = record.kindle_url
        if not current.image_url and record.image_url:
            current.image_url = record.image_url
            current.local_image = record.local_image
        if not current.authors and record.authors:
            current.authors = record.authors
        if not current.publisher and record.publisher:
            current.publisher = record.publisher
        if not current.published_date and record.published_date:
            current.published_date = record.published_date

        known_logs = {(item["permalink"], item["month_note"]) for item in current.source_logs}
        for source_log in record.source_logs:
            key = (source_log["permalink"], source_log["month_note"])
            if key not in known_logs:
                current.source_logs.append(source_log)
                known_logs.add(key)

    return sorted(merged.values(), key=lambda item: (item.title.lower(), item.asin))


def download_image(url: str, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request) as response:
        data = response.read()
    target.write_bytes(data)


def copy_local_publish_image(image_url: str, target: Path) -> bool:
    basename = Path(urlparse(image_url).path).name
    if not basename:
        return False
    source = PUBLISH_IMAGE_DIR / basename
    if not source.exists():
        stem = re.sub(r"\._[^.]+(\.[^.]+)$", "", basename)
        matches = sorted(PUBLISH_IMAGE_DIR.glob(f"{stem}*"))
        if not matches:
            return False
        source = matches[0]
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    return True


def write_output(records: list[BookRecord], output_json: Path, source_root: Path) -> None:
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_root": str(source_root),
        "image_root": "/images/books/",
        "books": [record.to_dict() for record in records],
    }
    output_json.parent.mkdir(parents=True, exist_ok=True)
    output_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")


def main() -> int:
    args = parse_args()
    files = slug_files(args.source_root)
    extracted: list[BookRecord] = []
    for path in files:
        extracted.extend(extract_books(path))

    records = merge_books(extracted)
    write_output(records, args.output_json, args.source_root)

    failures: list[str] = []
    if not args.skip_download:
        for record in records:
            target = args.image_dir / Path(record.local_image).name
            try:
                download_image(record.image_url, target)
            except (HTTPError, URLError) as error:
                if not copy_local_publish_image(record.image_url, target):
                    failures.append(f"{record.asin} {record.title}: {error}")

    print(f"books={len(records)} files={len(files)}")
    if failures:
        print("image_download_failures:")
        for failure in failures:
            print(f"  {failure}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
