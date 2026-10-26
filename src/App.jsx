import { useEffect, useState } from 'react';
import * as A from './assets';
import OurWork from './OurWork';
import { subscribeNewsletter } from './api';
import { ApprovedLanding, ApprovedAbout, ApprovedFooter } from './ApprovedPages';
import Darpan from './Darpan/Darpan';
import GetInvolved from './GetInvolved';
import Resources from './Resources';
import Articles from './Articles';
import AdminPages from './AdminPages';
import Updates from './Updates';

export const Button = ({ children, href, onClick, className = '' }) => href ? <a className={`button ${className}`} href={href}>{children}<span aria-hidden="true">↗</span></a> : <button className={`button ${className}`} onClick={onClick}>{children}<span aria-hidden="true">↗</span></button>;

function Header({ page }) {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('');
  useEffect(() => { setOpen(false); setExpandedMenu(''); }, [page]);
  const menus = [
    { label: 'About Us', href: '/about', links: [['Our story', '/about'], ['Who we are and how we work', '/about'], ['Vision and mission', '/about#vision-mission'], ['Our presence', '/about#presence'], ['Founder', '/about#founder'], ['Trust board', '/about#trust-board'], ['Volunteer network', '/about#volunteer-network'], ['Head office', '/about#head-office'], ['Awards and recognition', '/about#awards']] },
    { label: 'Our Work', href: '/our-work', links: [['Working areas', '/our-work'], ['Programs & Initiatives', '/our-work#program-basket'], ['Program and Program Basket', '/our-work#program-basket'], ['Research, Reports and Data', '/our-work']] },
    { label: 'Impact', href: '/#impact', links: [['Our impact', '/#impact'], ['Impact stories', '/#stories']] },
    { label: 'Get Involved', href: '/get-involved', links: [['Careers (Jobs & internship)', 'mailto:info@bjsindia.org?subject=Careers'], ['Volunteer', 'mailto:info@bjsindia.org?subject=Volunteer%20with%20BJS'], ['Partner With Us', '/#partners'], ['Fellowship', 'mailto:info@bjsindia.org?subject=Fellowship'], ['Donate', 'mailto:info@bjsindia.org?subject=Donation%20enquiry'], ['Contact us', '#contact']] },
    { label: 'Resources', href: '/resources', links: [['BJS Darpan', '/alldarpans'], ['Blogs', '/#stories'], ['Articles', '/resources/articles'], ['Media Centre', '/resources#media-centre'], ['Research', '/our-work'], ['Collaterals', '/resources#collaterals']] },
    { label: 'Updates', href: '/updates', links: [['Announcements', '/updates#announcements'], ['News & Press Releases', '/updates#news'], ['Events & Activities', '/updates#announcements']] },
  ];
  const closeNavigation = () => {
    setOpen(false);
    setExpandedMenu('');
  };
  return <header className="header"><a href="/" aria-label="BJS India home"><img className="logo" src={A.imgBjsLogo041} alt="Bharatiya Jain Sanghatana" /></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button><nav className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpandedMenu(''); }}>
    {menus.map(({ label, href, links }) => <div key={label} className={`nav-item${expandedMenu === label ? ' expanded' : ''}`} onMouseEnter={() => setExpandedMenu(label)} onMouseLeave={() => setExpandedMenu('')} onFocus={() => setExpandedMenu(label)}>
      <a href={href} aria-current={(page === 'about' && href === '/about') || (page === 'get-involved' && href === '/get-involved') || (page === 'updates' && href === '/updates') || (['resources','articles','darpan'].includes(page) && href === '/resources') ? 'page' : undefined} onClick={closeNavigation}>{label}</a>
      <button className="nav-expand" type="button" aria-label={`Show ${label} sections`} aria-expanded={expandedMenu === label} aria-controls={`nav-menu-${label.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setExpandedMenu(expandedMenu === label ? '' : label)}><span aria-hidden="true">⌄</span></button>
      <div className="nav-dropdown" id={`nav-menu-${label.toLowerCase().replaceAll(' ', '-')}`} aria-label={`${label} sections`}>
        <div className="nav-dropdown-inner"><h2>{label}</h2><ul>{links.map(([item, target]) => <li key={item}><a href={target} onClick={closeNavigation}>{item}<span aria-hidden="true">↗</span></a></li>)}</ul></div>
      </div>
    </div>)}<a className="donate" href="mailto:info@bjsindia.org?subject=Donation%20enquiry" onClick={closeNavigation}>Donate</a>
  </nav></header>;
}

export function Footer({ detailed = false, navy = false }) {
  const socials = [
    [A.imgFrame6147, 'Facebook', 'https://www.facebook.com/BJSIndia'],
    [A.imgFrame6148, 'Instagram', 'https://www.instagram.com/bhartiyajainsanghatana'],
    [A.imgFrame6149, 'YouTube', 'https://www.youtube.com/channel/UCFLe91tMq_twtQ7EDi97USQ'],
    [A.imgFrame6150, 'LinkedIn', 'https://www.linkedin.com/company/bjs-india/posts/?feedView=all'],
    [A.imgFrame6151, 'X', 'https://x.com/BJS_India'],
  ];
  return <footer id="contact" className={`footer ${detailed?'detailed':''} ${navy?'navy':''}`}><div className="footer-inner container"><div className="footer-brand"><a href="/" aria-label="BJS home"><img src={A.imgWhiteBjsEnglish1} alt="Bharatiya Jain Sanghatana" width="172" height="95" /></a>{detailed && <p>Level 8, Mutha Chambers, II, Senapati Bapat Rd, Chattushringi, Gokhalenagar, Pune, Maharashtra 411016</p>}<div className="socials">{socials.map(([src, label, href]) => <a key={label} href={href} aria-label={`BJS India on ${label}`} target="_blank" rel="noopener noreferrer"><img src={src} alt="" /></a>)}</div><p>Follow Us</p></div>
  {detailed ? <div className="footer-columns">{[['About us',['Our Story','/about'],['Our Presence','/about#presence'],['Founder','/about#founder'],['Head Office','/about#leadership']],['Our Work',['Working Areas','/our-work'],['Program | Initiatives','/our-work#program-basket']],['Get Involved',['Volunteer','/get-involved'],['Partner With Us','/#partners'],['Donate','mailto:info@bjsindia.org?subject=Donation%20enquiry'],['Contact With us','#contact']],['Resources',['BJS Darpan','/#resources'],['Articles','/#resources'],['Media Centre','/#stories']]].map(([title,...links])=><div key={title}><h3>{title}</h3>{links.map(([label,href])=><a key={label} href={href}>{label}</a>)}</div>)}</div> : <div className="footer-main"><div className="footer-links"><a href="/about">Overview</a><a href="/our-work">Program</a><a href="/#resources">BJS Darpan</a><a href="/#stories">Gallery</a></div><h3>About Us</h3><p>Driven by a shared commitment to social impact, our volunteers come together to create meaningful change across communities.</p><h3>Other Companies</h3><div className="footer-links small"><span>Shantilal Muttha Foundation</span><span>Medhakshar</span></div></div>}
  <div className="footer-contact"><h3>Let's Connect</h3><h3>Call</h3><a href="tel:+91206605000">0 20 6605000</a><h3>Email</h3><a href="mailto:info@bjsindia.org">info@bjsindia.org</a></div></div><div className="copyright">2026 | BJS India | All Rights Reserved</div></footer>;
}

function Newsletter() {
  const [email,setEmail] = useState(''); const [status,setStatus] = useState(''); const [busy,setBusy] = useState(false);
  async function submit(e) { e.preventDefault(); setBusy(true); setStatus(''); try { const result = await subscribeNewsletter(email); setStatus(result.configured ? 'Thank you for subscribing to BJS Darpan.' : 'Subscriptions will be available soon. Please contact info@bjsindia.org to receive BJS Darpan.'); if(result.configured) setEmail(''); } catch(err) { setStatus(err.message); } finally { setBusy(false); } }
  return <section className="newsletter" id="resources"><div className="container newsletter-inner"><div className="newsletter-art"><img src={A.imgComponent191} alt="BJS Darpan newsletter editions" /></div><div className="newsletter-content"><h2>Subscribe Our Newsletter <strong>BJS Darpan</strong></h2><p>Stay connected with the latest updates, initiatives, stories and impact from BJS.</p><form onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" autoComplete="email" placeholder="Enter your email" required value={email} onChange={e=>setEmail(e.target.value)} /><button disabled={busy} type="submit">{busy ? 'SUBSCRIBING…' : 'SUBSCRIBE'}</button><a className="whatsapp" aria-label="Contact BJS about the newsletter" href="mailto:info@bjsindia.org?subject=BJS%20Darpan"><img src={A.imgUnion} alt="" /></a></form><p className="form-status" role="status">{status}</p></div></div></section>;
}

const programs = [
  {title:'Dil Ka Jigsaw',image:A.imgRectangle467,logo:A.imgRectangle301,color:'peach',description:'Building meaningful connections and stronger families.'},
  {title:'Manthan',image:A.imgRectangle468,logo:A.imgBjsManthan411,color:'blue',description:'Creating space for dialogue, reflection and growth.'},
  {title:'JPA',suffix:' (Jain Parivarik adalat)',image:A.imgRectangle469,logo:A.imgRectangle302,color:'yellow',description:'Helping families navigate challenges together.'},
];

function Programs() {
  return <section className="programs" id="programs"><div className="container section-heading"><h2>Our Programs</h2><p>lorem ipsum dolor sit amet consectetur adipiscing elit facere similique dolore et in quas imperdiet ducimus deleniti ullamco quos odio aliqua sit deleniti nihil velit imperdiet omnis excepteur non ad occaecat ut at anim expedita</p></div><div className="program-track">{programs.map(p=><article className={`program-card ${p.color}`} key={p.title}><div className="program-photo"><img src={A.imgRectangle466} alt="" className="photo-underlay"/><img src={p.image} alt={`${p.title} community program`} /></div><div className="program-body"><div><span className="tag">Infusion Programs</span><h3>{p.title}<small>{p.suffix}</small></h3><a href={`/our-work#program-basket`}>Learn More <span aria-hidden="true">↗</span></a></div><div className={`program-logo ${p.title==='Manthan'?'manthan':''}`}><img src={p.logo} alt={`${p.title} logo`} /></div></div></article>)}</div></section>;
}

function Impact() {
  const columns = [
    {image:A.imgRectangle400,mask:A.imgRectangle399,value:'265,668+',label:'Smiles Recovered',stat:'70+',statLabel:'Conflicts Resolved'},
    {image:A.imgRectangle409,mask:A.imgRectangle408,value:'14,374+',label:'Water Bodies Rejuvenated',stat:'4,227+',statLabel:'Children Rehabilitated',reverse:true},
    {image:A.imgRectangle425,mask:A.imgRectangle424,value:'38,137+',label:'Connections Facilitated',stat:'814,831+',statLabel:'Girls Empowered'},
  ];
  return <section className="impact container" id="impact"><h2>Our Impact</h2><p className="intro">From people and families to communities and society, BJS brings ideas, action and<br className="desktop-break"/> collaboration together to create meaningful change.</p><div className="impact-grid">{columns.map(c=><div className={`impact-column ${c.reverse?'reverse':''}`} key={c.label}><div className="impact-photo" style={{maskImage:`url(${c.mask})`}}><img className="impact-image" src={c.image} alt={c.label} />{c.label==='Connections Facilitated' && <img className="impact-overlay" src={A.imgRectangle423} alt=""/>}<div><strong>{c.value}</strong><span>{c.label}</span></div></div><div className="impact-stat"><strong>{c.stat}</strong><span>{c.statLabel}</span></div></div>)}</div></section>;
}

export function PresenceStats({compact=false}) {
  return <div className={`presence-stats ${compact?'compact':''}`}>{(compact ? [['12+','States'],['170+','Districts'],['500+','Chapters'],['40K+','Volunteers']] : [['12+','States'],['170+','Districts'],['500+','Chapters'],['40+','Years Of BJS'],['5K+','Office Bearers'],['40K+','Volunteers']]).map(([n,label],i)=><div className={i<3&&!compact?'outline-stat':'solid-stat'} key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>;
}

const testimonials = [
  {image:A.imgRectangle52,title:'We now have water throughout the year.',quote:"Earlier we had to walk long distances to fetch water, especially in summer. With BJS's support, our village now has improved water storage and we have water available throughout the year. It has made life much easier for our families.",name:'Savitri Tai',role:'Village Resident, Maharashtra',color:'peach'},
  {image:A.imgRectangle53,title:'We received support when we needed it the most.',quote:"When the floods damaged our home, we didn't know where to begin. The timely relief support from BJS helped our family with food, essential supplies and temporary shelter.",name:'Ramesh Patil',role:'Flood-Affected Resident, Maharashtra',color:'blue'},
];

export function CarouselArrows({previous,next}) {return <div className="carousel-arrows"><button onClick={previous} aria-label="Previous slide"><img src={A.imgGroup6041} alt=""/></button><button onClick={next} aria-label="Next slide"><img src={A.imgGroup18} alt=""/></button></div>;}

function Testimonials() { const [index,setIndex]=useState(0);return <section className="testimonials container"><div className="heading-with-controls"><div><h2>Lives Changed. Futures Transformed.</h2><p>Discover how BJS initiatives are creating real opportunities, stronger communities and brighter futures.</p></div><CarouselArrows previous={()=>setIndex(1-index)} next={()=>setIndex(1-index)}/></div><div className="testimonial-grid">{[0,1].map(offset=>{const t=testimonials[(index+offset)%2];return <article className={`testimonial ${t.color}`} key={t.name}><img className="testimonial-photo" src={t.image} alt={t.name}/><div><img className="quote-mark" src={A.imgQuoteRightSayingSpeech} alt=""/><h3>{t.title}</h3><blockquote>{t.quote}</blockquote><strong>{t.name}</strong><small>{t.role}</small></div></article>;})}</div></section>;}

function Stories() { const [index,setIndex]=useState(1);const slides=[A.imgRectangle450,A.imgImage8,A.imgRectangle452];return <section className="stories" id="stories"><div className="container heading-with-controls"><div><h2>Stories That Inspire Change.</h2><p>Watch our videos to see how BJS initiatives are creating real impact on the ground.</p></div><CarouselArrows previous={()=>setIndex((index+2)%3)} next={()=>setIndex((index+1)%3)}/></div><div className="stories-stage"><img className="story-side" src={slides[(index+2)%3]} alt="Previous BJS story"/><div className="story-main"><img src={slides[index]} alt="BJS stories: impacting lives, ushering change"/></div><img className="story-side" src={slides[(index+1)%3]} alt="Next BJS story"/></div></section>;}

function Landing() {
 return <><section className="hero"><div className="container hero-inner"><div className="hero-copy"><h1>Impact That Brings<br/> India Together.</h1><p>From people and families to communities and society, BJS brings ideas, action and collaboration together to create meaningful change.</p><Button href="#get-involved">Join Us</Button></div><div className="hero-visual"><div className="hero-person"><img src={A.imgWebsiteBannerImage5} alt="BJS volunteer working with communities" /></div><div className="hero-stat bearers"><strong>5K+</strong><span>Office<br/>Bearers</span></div><div className="hero-badge years">40+ years of impact</div><div className="hero-badge volunteers">40K+ Volunteers</div><div className="hero-badge count">44+ Programs</div><div className="hero-stat lives"><strong>10L+</strong><span>Lives<br/>Impacted</span></div></div></div></section><Newsletter/><Programs/><Impact/><section className="presence" id="get-involved"><div className="container presence-inner"><div><h2>A Growing<br/> Presence Across India</h2><p>Our network of volunteers and initiatives continues to expand. reaching more communities and creating a wider impact every year.</p><Button href="/about#presence">Know more</Button></div><PresenceStats/></div></section><Testimonials/><Stories/><section className="partners container" id="partners"><h2>In Partnership<br/>For a Better Tomorrow</h2><div className="partner-logos">{[[A.imgImages11,'Dr. A.P.J. Abdul Kalam Amrut Abhiyan'],[A.img96581IiflMain1,'IIFL'],[A.imgForceMotorsLogoWine1,'Force Motors'],[A.imgImages21,'Tata Trusts']].map(([src,alt])=><div key={alt}><img src={src} alt={alt}/></div>)}</div></section></>;
}

export default function App() {
 const [pathname,setPathname]=useState(window.location.pathname);
 useEffect(()=>{ const navigate=(e)=>{const a=e.target.closest('a');if(!a || e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download'))return;const url=new URL(a.href,window.location.href);if(url.origin!==window.location.origin)return;e.preventDefault();window.history.pushState({},'',url);setPathname(url.pathname);requestAnimationFrame(()=>{if(url.hash)document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior:'smooth'});else window.scrollTo(0,0);});};const pop=()=>{setPathname(window.location.pathname);};document.addEventListener('click',navigate);window.addEventListener('popstate',pop);return()=>{document.removeEventListener('click',navigate);window.removeEventListener('popstate',pop);};},[]);
 const route=pathname.replace(/\/$/,'');
 if (route.startsWith('/admin')) return <AdminPages pathname={route} />;
  const page=route==='/about'?'about':route==='/our-work'?'work':route==='/alldarpans'?'darpan':route==='/get-involved'?'get-involved':route==='/resources'?'resources':route==='/resources/articles'?'articles':route==='/updates'?'updates':'home';
 useEffect(()=>{document.title= `${page==='about'?'About Us':page==='work'?'Our Work':page==='darpan'?'BJS Darpan':page==='get-involved'?'Get Involved':page==='resources'?'Resources':page==='articles'?'Articles':page==='updates'?'Updates':'Impact That Brings India Together'} | BJS India`;},[page]);
 return <><a href="#main" className="skip-link">Skip to content</a><Header page={page}/><main id="main">{page==='about'?<ApprovedAbout/>:page==='work'?<OurWork/>:page==='darpan'?<Darpan/>:page==='get-involved'?<GetInvolved/>:page==='resources'?<Resources/>:page==='articles'?<Articles/>:page==='updates'?<Updates/>:<ApprovedLanding/>}</main><ApprovedFooter landing={page!=='about'&&page!=='updates'}/></>;
}
