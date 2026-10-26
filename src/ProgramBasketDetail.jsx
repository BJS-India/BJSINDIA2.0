import React, { useState } from 'react';
import { programBasketPages } from './programBasketData';
import ImpactSection from './ImpactSection';
import './program-basket-detail.css';

export default function ProgramBasketDetail({ basketId }) {
  const basket = programBasketPages.find(item => item.id === basketId);
  const [activeProgramId, setActiveProgramId] = useState(() => new URLSearchParams(window.location.search).get('program') || '');

  if (!basket) return <section className="pbd-missing"><h1>Program not found</h1><a href="/our-work#program-basket">Back to Program’s Basket</a></section>;

  const activeProgram = basket.programs.find(program => program.id === activeProgramId) || basket.programs[0];
  if (!activeProgram) return null;

  const gallery = [activeProgram.image || basket.image, ...(activeProgram.gallery || [])].filter(Boolean).slice(0, 4);

  return <div className="pbd-page" style={{'--pbd-color': basket.color}}>
    <section className="pbd-section">
      <div className="pbd-shell">
        <nav className="pbd-basket-nav" aria-label="Program baskets">
          {programBasketPages.map(item => <a key={item.id} className={item.id === basket.id ? 'active' : ''} href={`/our-work/programs/${item.id}`} aria-current={item.id === basket.id ? 'page' : undefined}>
            <strong>{item.name}</strong><span>{item.description}</span>
          </a>)}
        </nav>

        <header className="pbd-intro">
          <h1>{basket.heading}</h1>
          <p className="pbd-tagline">{basket.intro}</p>
          <p>{basket.summary}</p>
        </header>

        {basket.featured.length > 0 && <div className="pbd-featured">
          {basket.featured.map(item => <article key={item.name}><h2>{item.name}</h2><p>{item.description}</p></article>)}
        </div>}

        <nav className="pbd-program-nav" aria-label={`${basket.name} initiatives`}>
          {basket.programs.map(program => <button type="button" key={program.id} className={program.id === activeProgram.id ? 'active' : ''} aria-pressed={program.id === activeProgram.id} onClick={() => setActiveProgramId(program.id)}>{program.name}</button>)}
        </nav>

        <section className="pbd-program" aria-live="polite">
          <header className="pbd-program-heading">
            <div className="pbd-logo">{activeProgram.logo ? <img src={activeProgram.logo} alt=""/> : <span>{activeProgram.name.slice(0, 1)}</span>}</div>
            <div><h2>{activeProgram.name}</h2><p>{activeProgram.tagline}</p></div>
          </header>

          <div className="pbd-content-grid">
            <article className="pbd-details">
              <h3>Program Details</h3>
              <p>{activeProgram.details}</p>
              <h4>Programme focus</h4>
              <ul>{activeProgram.points.map(point => <li key={point}>{point}</li>)}</ul>
              <a className="pbd-action" href="/get-involved">Explore {activeProgram.name}<span aria-hidden="true">→</span></a>
            </article>
            <div className="pbd-gallery" aria-label={`${activeProgram.name} photos`}>
              {gallery.map((image, index) => <div className="pbd-photo" key={`${image}-${index}`}><img src={image} alt={`${activeProgram.name} programme ${index + 1}`} /></div>)}
              {Array.from({length: Math.max(0, 4 - gallery.length)}, (_, index) => <div className="pbd-photo empty" key={`empty-${index}`} aria-hidden="true"/>)}
            </div>
          </div>

          <ImpactSection programName={activeProgram.name}>
            <h2>Our Impact</h2>
            <p>Impact and outcomes for {activeProgram.name}.</p>
          </ImpactSection>
        </section>
      </div>
    </section>
  </div>;
}
