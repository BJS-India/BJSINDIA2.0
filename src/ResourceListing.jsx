import { useMemo, useState } from 'react';
import { collateralCards, collectionItems, mediaCards, videoItems } from './resourcesData';
import { ResourceCard } from './Resources';
import './resource-listing.css';

const pages = {
  'media-centre': {title:'Media Centre',description:'Our work, captured and shared. Discover BJS through videos, press coverage and photographs showcasing our initiatives, people and impact.',kind:'media',items:mediaCards},
  collaterals: {title:'Collaterals',description:'Resources that bring our mission to life. Access BJS publications, campaign materials and communication assets that help share our vision and work.',kind:'collateral',items:collateralCards},
  videos: {title:'Videos',description:'Watch stories and experiences from BJS initiatives and the communities we work with.',kind:'video',items:videoItems,back:'/resources/media-centre'},
  'press-coverage': {title:'Press Coverage',description:'Explore coverage of BJS initiatives and community impact in the media.',kind:'media',items:collectionItems['press-coverage'],back:'/resources/media-centre'},
  'photo-gallery': {title:'Photo Gallery',description:'Browse moments from BJS programmes, events and community initiatives.',kind:'media',items:collectionItems['photo-gallery'],back:'/resources/media-centre'},
  reports: {title:'Reports',description:'Explore reports documenting BJS programmes, initiatives and impact.',kind:'collateral',items:collectionItems.reports,back:'/resources/collaterals'},
  'program-brochures': {title:'Program Brochures',description:'Discover BJS programmes and initiatives through our brochures.',kind:'collateral',items:collectionItems['program-brochures'],back:'/resources/collaterals'},
  booklets: {title:'Booklets',description:'Browse BJS booklets and publications.',kind:'collateral',items:collectionItems.booklets,back:'/resources/collaterals'},
};

export default function ResourceListing({ type }) {
  const page = pages[type] || pages['media-centre'];
  const [search, setSearch] = useState('');
  const results = useMemo(() => page.items.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase())), [page.items, search]);
  return <section className="resource-listing-page"><div className="resource-listing-container">
    <header className="resource-listing-heading"><h1>{page.title}</h1><p>{page.description}</p></header>
    <label className="resource-listing-search"><span>Search by name</span><input type="search" placeholder={`Search ${page.title.toLowerCase()}`} value={search} onChange={event=>setSearch(event.target.value)}/></label>
    <p className="resource-listing-count" role="status">{results.length} {results.length===1?'item':'items'}</p>
    {results.length ? page.kind === 'video' ? <div className="resource-listing-grid video-listing-grid">{results.map(item=><article className="video-listing-card" key={item.id}><video controls preload="metadata" poster={item.image}><source src={item.video} type="video/mp4"/>Your browser does not support video playback.</video><h2>{item.title}</h2></article>)}</div> : <div className="resource-listing-grid">{results.map(item=><ResourceCard key={item.id} item={item} kind={page.kind} href={page.back ? undefined : item.href}/>)}</div> : <p className="resource-listing-empty">No items match your search.</p>}
    <a className="resource-listing-back" href={page.back || '/resources'}>Back to {page.back?.endsWith('media-centre') ? 'Media Centre' : page.back?.endsWith('collaterals') ? 'Collaterals' : 'Resources'}</a>
  </div></section>;
}
