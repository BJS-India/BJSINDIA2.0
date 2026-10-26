import React, { useState } from 'react';
import { articles, articlesIntro } from './resourcesData';
import { ResourceCard } from './Resources';
import './Darpan/Darpan.css';

export default function Articles() {
  const [search,setSearch]=useState('');
  const [year,setYear]=useState('all');
  const [sort,setSort]=useState('latest');
  const years=[...new Set(articles.map(article=>article.date.slice(0,4)))].sort().reverse();
  const results=articles.filter(article=>(year==='all'||article.date.startsWith(year)) && `${article.title} ${article.category}`.toLowerCase().includes(search.trim().toLowerCase())).sort((a,b)=>sort==='latest'?b.date.localeCompare(a.date):a.date.localeCompare(b.date));
  const clear=()=>{setSearch('');setYear('all');setSort('latest');};
  return <section className="darpan-page articles-page"><div className="darpan-container">
    <nav className="articles-breadcrumb" aria-label="Breadcrumb"><a href="/resources">Resources</a><span aria-hidden="true">/</span><span aria-current="page">Articles</span></nav>
    <header className="darpan-heading"><h1>Articles</h1><p>{articlesIntro}</p></header>
    <div className="darpan-filters" aria-label="Filter articles">
      <label className="darpan-search"><span>Search by name</span><input type="search" placeholder="Search articles" value={search} onChange={event=>setSearch(event.target.value)}/></label>
      <label><span>Year</span><select value={year} onChange={event=>setYear(event.target.value)}><option value="all">All years</option>{years.map(value=><option key={value}>{value}</option>)}</select></label>
      <label><span>Sort by</span><select value={sort} onChange={event=>setSort(event.target.value)}><option value="latest">Latest to oldest</option><option value="oldest">Oldest to latest</option></select></label>
    </div>
    <p className="articles-result-count" role="status">{results.length} {results.length===1?'article':'articles'}</p>
    {results.length ? <div className="darpan-grid articles-grid">{results.map(article=><ResourceCard key={article.id} item={article} kind="article"/>)}</div> : <div className="darpan-empty"><p>No articles match those filters.</p><button type="button" onClick={clear}>Clear filters</button></div>}
    <a className="darpan-back" href="/resources">Back to Resources</a>
  </div></section>;
}
