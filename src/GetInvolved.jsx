import React from 'react';
import { involvementCards,contactIcons } from './getInvolvedData';
import './get-involved.css';

function InvolvementIcon({type,source}) {
  if(source)return <img src={source} alt=""/>;
  const icons={
    careers:<><rect x="5" y="15" width="26" height="22" rx="3"/><path d="M13 15v-4h10v4M5 25h26M16 24v5h5v-5M39 42V24m-7 7 7-8 7 8"/></>,
    volunteer:<><path d="M17 39V20c0-4 5-4 5 0V9c0-4 5-4 5 0v15-18c0-4 5-4 5 0v18-14c0-4 5-4 5 0v17l4-5c3-3 7 0 4 4L35 42v4H22v-4l-9-9c-4-4-1-8 3-5l6 5"/><path d="M9 9v15M4 14v14l8 12"/></>,
    collaborate:<><path d="m5 14 9-7 10 5 10-5 9 7-6 10-7-3-6 5-6-5-7 3-6-10ZM14 24l8 17h5l8-17M18 29l-5 5m17-5 5 5"/></>,
    fellowship:<><circle cx="24" cy="10" r="4"/><circle cx="10" cy="14" r="4"/><circle cx="38" cy="14" r="4"/><path d="m17 42 2-22h10l2 22M7 42l-2-19h10M33 23h10l-2 19M24 25v17M10 29v13M38 29v13"/></>,
    donate:<><path d="M24 27 11 14C3 4 17 0 24 9 31 0 45 4 37 14L24 27Z"/><path d="m7 30 5-8m29 8-5-8M7 30h34v12H7V30Zm8 6h18"/></>,
    'contact-us':<><path d="M8 8 4 14c0 14 17 31 30 30l7-6-10-8-6 5c-6-3-10-7-13-13l4-5-8-9Z"/><path d="M25 5h20v14H33l-7 5V5Zm5 5h10m-10 4h7"/></>,
    phone:<path d="M8 8 4 14c0 14 17 31 30 30l7-6-10-8-6 5c-6-3-10-7-13-13l4-5-8-9Z"/>,
    email:<><rect x="5" y="10" width="38" height="28" rx="3"/><path d="m6 12 18 14 18-14"/></>,
    location:<><path d="M24 45S9 29 9 18a15 15 0 0 1 30 0c0 11-15 27-15 27Z"/><circle cx="24" cy="18" r="5"/></>,
  };
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[type]}</svg>;
}

export default function GetInvolved() {
  return <div className="get-involved-page">
    <section className="gi-opportunities gi-container" aria-labelledby="involvement-heading">
      <h1 id="involvement-heading">Be Part of the Change.</h1>
      <p className="gi-intro">Contribute your time, skills or support to help BJS strengthen families, empower communities and create lasting social change.</p>
      <div className="gi-cards">
        {involvementCards.map(card=><article className="gi-card" id={card.id} key={card.id}>
          <div className="gi-photo">{card.image&&<img src={card.image} alt={card.title}/>}</div>
          <span className="gi-badge"><InvolvementIcon type={card.id} source={card.icon}/></span>
          <div className="gi-card-content"><h2>{card.title}</h2><p className="gi-tagline">{card.tagline}</p><span className="gi-card-rule" aria-hidden="true"/><p className="gi-description">{card.description}</p><a className="gi-action" href={card.href}>{card.action} <span aria-hidden="true">→</span></a></div>
        </article>)}
      </div>
    </section>
    <section className="gi-connect gi-container" id="connect" aria-labelledby="connect-heading">
      <div className="gi-connect-copy"><h2 id="connect-heading">We're Here<br/>to Connect.</h2><p>Have a question or want to explore a way to get involved? Reach out to our team and we'll be happy to help</p></div>
      <div className="gi-contact-panel">
        <div className="gi-contact-item"><span className="gi-contact-icon"><InvolvementIcon type="phone" source={contactIcons.phone}/></span><div><h3>Phone</h3><a href="tel:+912066050000">+91 020 6605 0000</a></div></div>
        <div className="gi-contact-item gi-address"><span className="gi-contact-icon"><InvolvementIcon type="location" source={contactIcons.location}/></span><div><h3>Visit Us</h3><address>Level 8, Mutha Chambers, II, Senapati Bapat Rd, <br className="gi-address-break"/>Chattushringi, Gokhalenagar, Pune, Maharashtra 411016</address></div></div>
      </div>
    </section>
  </div>;
}
