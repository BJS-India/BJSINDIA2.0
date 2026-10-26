import React, { useRef, useState } from 'react';
import { landingAssets as L } from './approvedAssets';
import { impactProgrammes } from './impactData';

const impactAliases = {
  'wagholi education rehabilitation centre': 'WERC',
  'jain parivarik adalat': 'JPA',
  'free plastic surgery camps': 'Plastic Surgery',
  'chapter capacity building': 'CCB',
};

export function findImpactProgramme(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();
  const title = impactAliases[normalized] || name;
  return impactProgrammes.find(item => item.title.toLowerCase() === title.toLowerCase()) || null;
}

export default function ImpactSection({ children, programName }) {
  const programmeMode = programName !== undefined;
  const matchedProgramme = programmeMode ? findImpactProgramme(programName) : null;
  const programmes = programmeMode ? (matchedProgramme ? [matchedProgramme] : []) : impactProgrammes;
  const [active,setActive] = useState(0);
  const [windowStart,setWindowStart] = useState(0);
  const tabRefs = useRef({});
  const program = programmes[active] || programmes[0];
  if (!program) return <section className="sp-impact pbd-impact" id="impact" style={{'--impact-background':'#fff4ef','--impact-color':'#f45145'}}>
    <div className="sp-container"><div className="sp-impact-copy">{children}</div><div className="sp-impact-empty"><p>Impact information for {programName} will be added soon.</p></div></div>
  </section>;
  function select(index,focus=false) {
    const next=(index+programmes.length)%programmes.length;
    setActive(next);
    if(next<windowStart)setWindowStart(next);
    else if(next>=windowStart+4)setWindowStart(Math.min(next-3,programmes.length-4));
    if(focus)requestAnimationFrame(()=>tabRefs.current[next]?.focus());
  }
  function keyDown(event) {
    const next={ArrowRight:active+1,ArrowLeft:active-1,Home:0,End:programmes.length-1}[event.key];
    if(next!==undefined){event.preventDefault();select(next,true);}
  }
  return <section className={`sp-impact${programmeMode?' pbd-impact':''}`} id="impact" style={{'--impact-background':program.background,'--impact-color':program.color}}>
    <div className="sp-container">
      <div className="sp-impact-copy">{children}</div>
      <div className="sp-impact-browser">
        {!programmeMode && <>
        <div className="sp-impact-tabs">
          <button aria-label="Previous impact category" onClick={()=>select(active-1)}><img src={L.imgGroup19} alt=""/></button>
          <div role="tablist" aria-label="Impact by program" onKeyDown={keyDown}>
            {impactProgrammes.slice(windowStart,windowStart+4).map((item,offset)=>{
              const index=windowStart+offset;
              return <button key={item.title} ref={node=>{tabRefs.current[index]=node;}} role="tab" tabIndex={active===index?0:-1} aria-selected={active===index} id={`impact-tab-${index}`} aria-controls="impact-panel" onClick={()=>select(index)}>{item.title}</button>;
            })}
          </div>
          <button aria-label="Next impact category" onClick={()=>select(active+1)}><img src={L.imgGroup19} alt=""/></button>
        </div>
        </>}
        <div id={programmeMode ? undefined : 'impact-panel'} role={programmeMode ? undefined : 'tabpanel'} aria-labelledby={programmeMode ? undefined : `impact-tab-${active}`} tabIndex={programmeMode ? undefined : 0}>
          <div className="sp-impact-metrics" style={{'--impact-count':program.cards.length}} key={program.title}>
            {program.cards.map(card=><article className={`sp-impact-metric metric-${card.photoIndex}${program.title==='JPA'?' impact-jpa':''}${card.image?' impact-photo-card':''}${program.title==='Blue Roots'&&card.photoIndex===2?' impact-water-image':''}${card.exportImage?' sp-impact-export':''}`} key={card.label}>
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
