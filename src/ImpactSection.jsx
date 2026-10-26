import React, { useRef, useState } from 'react';
import { landingAssets as L } from './approvedAssets';
import { impactProgrammes } from './impactData';

export default function ImpactSection({ children }) {
  const [active,setActive] = useState(0);
  const [windowStart,setWindowStart] = useState(0);
  const tabRefs = useRef({});
  const program = impactProgrammes[active];
  function select(index,focus=false) {
    const next=(index+impactProgrammes.length)%impactProgrammes.length;
    setActive(next);
    if(next<windowStart)setWindowStart(next);
    else if(next>=windowStart+4)setWindowStart(Math.min(next-3,impactProgrammes.length-4));
    if(focus)requestAnimationFrame(()=>tabRefs.current[next]?.focus());
  }
  function keyDown(event) {
    const next={ArrowRight:active+1,ArrowLeft:active-1,Home:0,End:impactProgrammes.length-1}[event.key];
    if(next!==undefined){event.preventDefault();select(next,true);}
  }
  return <section className="sp-impact" id="impact" style={{'--impact-background':program.background,'--impact-color':program.color}}>
    <div className="sp-container">
      <div className="sp-impact-copy">{children}</div>
      <div className="sp-impact-browser">
        <div className="sp-impact-tabs">
          <button aria-label="Previous impact category" onClick={()=>select(active-1)}><img src={L.imgGroup6042} alt=""/></button>
          <div role="tablist" aria-label="Impact by program" onKeyDown={keyDown}>
            {impactProgrammes.slice(windowStart,windowStart+4).map((item,offset)=>{
              const index=windowStart+offset;
              return <button key={item.title} ref={node=>{tabRefs.current[index]=node;}} role="tab" tabIndex={active===index?0:-1} aria-selected={active===index} id={`impact-tab-${index}`} aria-controls="impact-panel" onClick={()=>select(index)}>{item.title}</button>;
            })}
          </div>
          <button aria-label="Next impact category" onClick={()=>select(active+1)}><img src={L.imgGroup19} alt=""/></button>
        </div>
        <div id="impact-panel" role="tabpanel" aria-labelledby={`impact-tab-${active}`} tabIndex={0}>
          <div className="sp-impact-metrics" style={{'--impact-count':program.cards.length}} key={program.title}>
            {program.cards.map(card=><article className={`sp-impact-metric metric-${card.photoIndex}${program.title==='JPA'?' impact-jpa':''}${card.exportImage?' sp-impact-export':''}`} key={card.label}>
              {card.exportImage ? <img className="sp-impact-export-image" src={card.exportImage} alt={`${card.value} ${card.label.replaceAll('\n',' ')}`}/> : <>
                <strong>{card.value}</strong><p>{card.label}</p>
                {card.image && <div><img src={card.image} alt={card.label.replaceAll('\n',' ')}/></div>}
              </>}
            </article>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
