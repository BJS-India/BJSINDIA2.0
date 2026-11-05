import { useEffect, useMemo, useState } from 'react';
import { darpanIssues } from './DarpanData';
import './Darpan.css';

export default function Darpan() {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('all');
  const [sort, setSort] = useState('latest');
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    if (!selectedIssue) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setSelectedIssue(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedIssue]);

  const years = [...new Set(darpanIssues.map(issue => issue.year))].sort((a, b) => b - a);
  const filteredIssues = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return darpanIssues
      .filter(issue => year === 'all' || issue.year === Number(year))
      .filter(issue => issue.title.toLowerCase().includes(searchTerm))
      .sort((a, b) => sort === 'latest'
        ? b.publishedAt.localeCompare(a.publishedAt)
        : a.publishedAt.localeCompare(b.publishedAt));
  }, [search, sort, year]);

  return (
    <section className="darpan-page">
      <div className="darpan-container">
        <header className="darpan-heading">
          <h1>Choose Darpan</h1>
          <p>Explore stories, initiatives and updates from across BJS.</p>
          <div style={{borderBottom: "1px solid var(--darpan-accent)", marginTop:"10px", marginBottom:"10px"}}/>
        </header>

        <div className="darpan-filters" aria-label="Filter magazines">
          <label className="darpan-search">
            <span>Search by name</span>
            <input
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search magazines"
            />
          </label>
          <label>
            <span>Year</span>
            <select value={year} onChange={event => setYear(event.target.value)}>
              <option value="all">All years</option>
              {years.map(issueYear => <option key={issueYear} value={issueYear}>{issueYear}</option>)}
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="latest">Latest to oldest</option>
              <option value="oldest">Oldest to latest</option>
            </select>
          </label>
        </div>

        {filteredIssues.length > 0 ? (
          <div className="darpan-grid">
            {filteredIssues.map(issue => (
              <article className="darpan-card" key={issue.filename}>
                <button
                  className="darpan-cover-link"
                  type="button"
                  onClick={() => setSelectedIssue(issue)}
                  aria-label={`Read ${issue.title} magazine`}
                >
                  <div className="darpan-cover">
                    <iframe
                      src={`${issue.url}#page=1&view=FitH&toolbar=0&navpanes=0`}
                      title={`${issue.title} Darpan cover`}
                      loading="lazy"
                      tabIndex="-1"
                    />
                  </div>
                </button>
                <div className="darpan-card-footer">
                  <h2>{issue.title}</h2>
                  <button type="button" onClick={() => setSelectedIssue(issue)}>Read issue <span aria-hidden="true">↗</span></button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="darpan-empty" role="status">No magazines match those filters.</p>
        )}

        <a className="darpan-back" href="/">Back to Home</a>
      </div>
      {selectedIssue && (
        <div className="darpan-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedIssue(null); }}>
          <section className="darpan-modal" role="dialog" aria-modal="true" aria-labelledby="darpan-modal-title">
            <header className="darpan-modal-header">
              <h2 id="darpan-modal-title">{selectedIssue.title} Darpan</h2>
              <button type="button" className="darpan-modal-close" onClick={() => setSelectedIssue(null)} aria-label="Close magazine">×</button>
            </header>
            <iframe
              className="darpan-reader"
              src={`${selectedIssue.url}#toolbar=1&navpanes=0&view=FitH`}
              title={`${selectedIssue.title} Darpan magazine`}
            />
          </section>
        </div>
      )}
    </section>
  );
}
