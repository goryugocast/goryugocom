
import { useState, useMemo } from 'preact/hooks';

const SERIES_OPTIONS = [
    { value: 'all', label: '全て' },
    { value: 'ks', label: 'アトミック・シンキング' },
    { value: 'obv', label: 'Obsidianの全技術' },
    { value: 'obt', label: 'あなたのためのObsidian' }
];

function detectVideoSeries(item) {
    const file = (item.file || '').toLowerCase();
    const url = (item.url || '').toLowerCase();

    if (file.startsWith('ks') || /\/p\/ks\d+/.test(url)) return 'ks';
    if (file.startsWith('obv') || /\/p\/obv\d+/.test(url)) return 'obv';
    if (file.startsWith('obt') || /\/p\/obt\d+/.test(url)) return 'obt';

    return null;
}

export default function ArchiveList({ items, enableVideoSeriesFilter = false }) {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedSeries, setSelectedSeries] = useState('all');

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const series = detectVideoSeries(item);
            const matchesSeries = !enableVideoSeriesFilter ||
                selectedSeries === 'all' ||
                series === selectedSeries;
            const matchesSearch = (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
                (item.description || '').toLowerCase().includes(search.toLowerCase()) ||
                (item.body || '').toLowerCase().includes(search.toLowerCase());
            const matchesType = filterType === 'all' || item.type === filterType;
            return matchesSeries && matchesSearch && matchesType;
        });
    }, [items, search, filterType, selectedSeries, enableVideoSeriesFilter]);

    // Group by year for better readability
    const groupedItems = useMemo(() => {
        const groups = {};
        filteredItems.forEach(item => {
            const year = new Date(item.date_published).getFullYear();
            if (!groups[year]) groups[year] = [];
            groups[year].push(item);
        });
        return Object.entries(groups).sort((a, b) => b[0] - a[0]); // Descending years
    }, [filteredItems]);

    return (
        <div>
            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Search archives..."
                        value={search}
                        onInput={(e) => setSearch(e.target.value)}
                        style={{ flex: 1, padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        <option value="all">All Types</option>
                        <option value="article">Articles</option>
                        <option value="video">Videos</option>
                    </select>
                </div>
                {enableVideoSeriesFilter && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}>
                        {SERIES_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setSelectedSeries(option.value)}
                                style={{
                                    appearance: 'none',
                                    width: '100%',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '999px',
                                    border: '1px solid #ddd',
                                    background: selectedSeries === option.value ? '#0066cc' : '#fff',
                                    color: selectedSeries === option.value ? '#fff' : '#444',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                }}
                                title={option.label}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
                <div>
                    Showing {filteredItems.length} items
                </div>
            </div>

            <div className="archive-list">
                {groupedItems.map(([year, group]) => (
                    <div key={year}>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginTop: '2rem' }}>{year}</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {group.map((item, index) => {
                                return (
                                <li key={index} style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.2rem' }}>
                                        {new Date(item.date_published).toLocaleDateString('ja-JP')}
                                        <span style={{
                                            marginLeft: '0.8rem',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            background: item.type === 'video' ? '#e6f0ff' : '#f0f0f0',
                                            color: item.type === 'video' ? '#0066cc' : '#666',
                                            fontSize: '0.8rem'
                                        }}>
                                            {item.type === 'video' ? 'VIDEO' : 'ARTICLE'}
                                        </span>
                                        {enableVideoSeriesFilter && item.type === 'video' && detectVideoSeries(item) && (
                                            <span style={{
                                                marginLeft: '0.5rem',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                background: '#f0f7ff',
                                                color: '#1f4d8f',
                                                fontSize: '0.8rem'
                                            }}>
                                                {SERIES_OPTIONS.find(option => option.value === detectVideoSeries(item))?.label}
                                            </span>
                                        )}
                                    </div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </h3>
                                    {item.subtitle && <div style={{ fontWeight: 'bold', color: '#555', fontSize: '0.95rem' }}>{item.subtitle}</div>}
                                    {item.description && <div style={{ fontSize: '0.95rem', color: '#444', marginTop: '0.3rem' }}>{item.description}</div>}

                                    {item.chapters && item.chapters.length > 0 && (
                                        <details style={{ marginTop: '1rem', background: '#f9f9f9', padding: '0.75rem 1rem', borderRadius: '4px' }}>
                                            <summary style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0066cc', cursor: 'pointer' }}>
                                                Chapters (Video) - {item.chapters.length}
                                            </summary>
                                            <ul style={{ paddingLeft: '1.2rem', margin: '0.75rem 0 0 0' }}>
                                                {item.chapters.map((chapter, idx) => (
                                                    <li key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                        <span style={{ fontFamily: 'monospace', background: '#eee', padding: '2px 4px', borderRadius: '3px', marginRight: '8px' }}>
                                                            {chapter.timestamp}
                                                        </span>
                                                        {chapter.url ? (
                                                            <a href={chapter.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: '500', color: '#0066cc', textDecoration: 'none' }}>
                                                                {chapter.title}
                                                            </a>
                                                        ) : (
                                                            <span style={{ fontWeight: '500' }}>{chapter.title}</span>
                                                        )}
                                                        {chapter.description && (
                                                            <div style={{ marginTop: '2px', color: '#666', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                                                                {chapter.description.slice(0, 150)}{chapter.description.length > 150 ? '...' : ''}
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    )}
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
