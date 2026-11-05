import React, { useEffect, useRef, useState } from 'react';
import { resourcesIntro, articlesIntro, darpanCovers, articles, mediaCards, collateralCards } from './resourcesData';
import './resources.css';

function ResourceImage({item}) {
  const [failed,setFailed] = useState(false);
  useEffect(() => setFailed(false), [item.image]);
  if (item.image && !failed) return <img src={item.image} alt={item.title} loading="lazy" onError={() => setFailed(true)}/>;
  if (item.id === 'darpan-2026-10') return <div className="darpan-cover-art" role="img" aria-label="October 2026 BJS Darpan cover preview"><img className="cover-brand" src="/assets/resources/darpan-2026-10.png" alt=""/><strong className="cover-title">BJS दर्पण</strong><b className="cover-subtitle">प्रतिबिंब राष्ट्रव्यापी सेवा का</b><div className="cover-collage">{['werc-2.png','werc-3.png','werc-1.png','werc-4.png','werc-2.png','werc-3.png'].map((image,index)=><img key={index} src={`/assets/${image}`} alt=""/>)}</div><span className="cover-stamp">BJS<br/>अक्टूबर 2026</span><strong className="cover-footer-title">BJS दर्पण</strong><span className="cover-footer-subtitle">प्रतिबिंब राष्ट्रव्यापी सेवा का</span></div>;
  if (item.document) return <iframe className="resource-document-cover" src={`${item.document}#page=1&view=FitH&toolbar=0&navpanes=0`} title={`${item.title} Darpan cover`} loading="lazy" tabIndex="-1"/>;
  return <div className="resource-placeholder" role="img" aria-label={`${item.title} image coming soon`}><strong aria-hidden="true">BJS</strong><span>{item.title}</span></div>;
}

export function ResourceCard({item, kind, href}) {
  const content = <><div className="resource-image"><ResourceImage item={item}/>{item.id === 'darpan-2026-10' && <span className="resource-latest">Latest<br/>Edition</span>}</div>{kind === 'issue' ? <div className="resource-month">{item.title}</div> : <div className="resource-body">
    {kind === 'article' && <span className="resource-category">{item.category}</span>}
    <h3>{item.title}</h3>
    {kind === 'article' && <><div className="resource-rule"/><time dateTime={item.date}>{new Date(`${item.date}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</time></>}
    {href ? <span className="resource-card-arrow" aria-hidden="true">→</span> : item.document ? <a className="resource-card-arrow" href={item.document} target="_blank" rel="noopener noreferrer" aria-label={`Read ${item.title} (PDF, new tab)`}>→</a> : <button className="resource-card-arrow" type="button" disabled aria-label={`${item.title} — coming soon`} title="Coming soon">→</button>}
  </div>}</>;
  return href ? <a href={href} className={`resource-card resource-card-${kind}`} aria-label={`Explore ${kind === 'issue' ? 'BJS Darpan — ' : ''}${item.title}`}>{content}</a> : <article className={`resource-card resource-card-${kind}`}>{content}</article>;
}

function ResourceSection({id,title,description,items,kind,href,controls=true}) {
  const track=useRef(null);
  const [edges,setEdges]=useState({start:true,end:false});
  useEffect(()=>{
    const element=track.current;
    const update=()=>setEdges({start:element.scrollLeft<=2,end:element.scrollLeft+element.clientWidth>=element.scrollWidth-2});
    const observer=new ResizeObserver(update); observer.observe(element); update();
    element.addEventListener('scroll',update,{passive:true});
    return()=>{observer.disconnect();element.removeEventListener('scroll',update);};
  },[]);
  const scroll=direction=>{
    const element=track.current;
    const distance=element.firstElementChild.getBoundingClientRect().width+(parseFloat(getComputedStyle(element).gap)||0);
    element.scrollBy({left:direction*distance,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  return <section id={id} className={`resource-section resource-section-${kind}`} aria-labelledby={`${id}-heading`}>
    <div className="resources-container resource-section-heading"><h2 id={`${id}-heading`}>{title}</h2><p>{description}</p>
      {controls && <div className="resource-controls">
        {id !== 'darpan' && id !== 'articles' && <button type="button" onClick={()=>scroll(-1)} disabled={edges.start} aria-label={`Previous ${title}`} aria-controls={`${id}-track`}>‹</button>}
        {href ? <a href={href} aria-label={`View all ${title}`}>›</a> : <button type="button" onClick={()=>scroll(1)} disabled={edges.end} aria-label={`Next ${title}`} aria-controls={`${id}-track`}>›</button>}
      </div>}
    </div>
    <div className={`resource-track-wrap${controls?' has-carousel':''}${edges.end?' at-end':''}`}><div className={`resource-track resource-track-${kind}`} ref={track} id={`${id}-track`} role="region" aria-label={`${title} cards`} tabIndex={controls?0:undefined}>
      {items.map(item=><ResourceCard key={item.id} item={item} kind={kind} href={item.href || href}/>)}</div></div>
  </section>;
}

export default function Resources() {
  return <div className="resources-page">
    <header className="resources-container resources-intro"><h1>Resources</h1><p>{resourcesIntro}</p></header>
    <ResourceSection id="darpan" title="BJS Darpan" description={resourcesIntro} items={darpanCovers} kind="issue" href="/alldarpans"/>
    <ResourceSection id="articles" title="Articles" description={articlesIntro} items={articles} kind="article" href="/resources/articles"/>
    <ResourceSection id="media-centre" title="Media Centre" description="Our work, captured and shared. Discover BJS through videos, press coverage and photographs showcasing our initiatives, people and impact." items={mediaCards} kind="media" controls={false}/>
    <ResourceSection id="collaterals" title="Collaterals" description="Resources that bring our mission to life. Access BJS publications, campaign materials and communication assets that help share our vision and work." items={collateralCards} kind="collateral" controls={false}/>
  </div>;
}
