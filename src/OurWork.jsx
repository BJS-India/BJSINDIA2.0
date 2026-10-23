import React, { useState } from 'react';
import BasketDiagram from './BasketDiagram';
import {focusAreas,programmeBaskets} from './ourWorkData';
import './our-work.css';

export default function OurWork() {
  const [expanded,setExpanded]=useState(null);
  return <div className="our-work-approved">
    <section className="ow-focus" id="working-areas" aria-labelledby="focus-heading">
      <div className="ow-container">
        <h1 className="ow-heading" id="focus-heading">Seven Focus Areas. One Shared Purpose.</h1>
        <p className="ow-focus-intro">BJS works across seven interconnected areas to strengthen families, support individual growth and build resilient communities.<br className="ow-desktop-break"/> Together, these focus areas reflect our commitment to a stronger, more capable and balanced society.</p>
        <div className="ow-focus-grid">
          {focusAreas.map(area=><article className={`ow-focus-card focus-${area.id}`} key={area.id}>
            <h2>{area.title}</h2><p>{area.description}</p>
            <span className="ow-focus-number" aria-hidden="true">{area.number}</span>
            {area.image&&<img className="ow-focus-photo" src={area.image} alt=""/>}
          </article>)}
        </div>
      </div>
    </section>
    <section className="ow-baskets" id="program-basket" aria-labelledby="basket-heading">
      <div className="ow-container ow-basket-intro">
        <h2 className="ow-heading" id="basket-heading">Program’s Basket</h2>
        <p>BJS brings together social development, disaster relief, water conservation and other community initiatives to support the wellbeing and progress of people across society. Guided by Jain principles, our vision is a future rooted in integrity, compassion and service, where individuals grow, communities thrive and collective action creates positive change. To advance this vision, BJS has organised its programmes into five distinct baskets, each contributing to our wider purpose:</p>
        <p className="ow-basket-names">Prarabdh • Pratibimb • Pravah • Parikalpana • Prabodhi</p>
        <p>Together, these baskets provide a structured approach to strengthening individuals, supporting families and building stronger communities.</p>
      </div>
      <BasketDiagram/>
      <div className="ow-programme-grid">
        {programmeBaskets.map(basket=><article className="ow-programme-card" key={basket.id} style={{'--basket-color':basket.color}}>
          <div className="ow-programme-photo">{basket.image&&<img src={basket.image} alt={`${basket.name} programmes`}/>}</div>
          <div className="ow-programme-info"><div><h3>{basket.name}</h3><p>{basket.description}</p></div><button aria-expanded={expanded===basket.id} aria-controls={`basket-detail-${basket.id}`} onClick={()=>setExpanded(expanded===basket.id?null:basket.id)}>Know More<span className="sr-only"> about {basket.name}</span></button></div>
          {expanded===basket.id&&<p className="ow-programme-detail" id={`basket-detail-${basket.id}`}>For more information about {basket.name}, <a href={`mailto:info@bjsindia.org?subject=${encodeURIComponent(basket.name+' programmes')}`}>contact BJS</a>.</p>}
        </article>)}
      </div>
    </section>
  </div>;
}
