
import { useState, useMemo } from 'preact/hooks';

export default function ArchiveList({ items }) {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'article', 'video'

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
                (item.description || '').toLowerCase().includes(search.toLowerCase()) ||
                (item.body || '').toLowerCase().includes(search.toLowerCase());
            const matchesType = filterType === 'all' || item.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [items, search, filterType]);

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
                <div>
                    Showing {filteredItems.length} items
                </div>
            </div>

            <div className="archive-list">
                {groupedItems.map(([year, group]) => (
                    <div key={year}>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginTop: '2rem' }}>{year}</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {group.map((item, index) => (
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
                                    </div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </h3>
                                    {item.subtitle && <div style={{ fontWeight: 'bold', color: '#555', fontSize: '0.95rem' }}>{item.subtitle}</div>}
                                    {item.description && <div style={{ fontSize: '0.95rem', color: '#444', marginTop: '0.3rem' }}>{item.description}</div>}

                                    {item.chapters && item.chapters.length > 0 && (
                                        <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0066cc' }}>Chapters (Video)</div>
                                            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
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
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
