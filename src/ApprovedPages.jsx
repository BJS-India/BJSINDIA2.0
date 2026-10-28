import React, { useEffect, useRef, useState } from 'react';
import { landingAssets as L, aboutAssets as B } from './approvedAssets';
import { subscribeNewsletter } from './api';
import ImpactSection from './ImpactSection';
import AwardPhoto from './AwardPhoto';
import { awards } from './awardsData';
import './approved.css';
import './landing-desktop.css';
import './review-corrections.css';
import './impact-tabs.css';
import './awards.css';

function Action({ href, children, filled = false, arrow = true, onClick, ariaLabel }) {
  const content = <>{children}{arrow && <img className="sp-action-arrow" src={filled ? L.imgGroup6001 : L.imgGroup5998} alt="" />}</>;
  return href ? <a className={`sp-action ${filled ? 'filled' : ''}`} href={href} aria-label={ariaLabel}>{content}</a> : <button className={`sp-action ${filled ? 'filled' : ''}`} onClick={onClick} aria-label={ariaLabel}>{content}</button>;
}
function Kicker({ children }) { return <p className="sp-kicker"><img src={L.imgLine1} alt="" />{children}</p>; }
function Arrows({ previous, next, small = false, previousDisabled = false, nextDisabled = false }) {
  const activeIcon = small ? L.imgGroup19 : L.imgGroup18;
  const disabledIcon = small ? L.imgGroup6042 : L.imgGroup6041;
  return <div className={`sp-arrows ${small ? 'small' : ''}`}>
    <button aria-label="Previous slide" onClick={previous} disabled={previousDisabled}><img src={previousDisabled ? disabledIcon : activeIcon} alt="" /></button>
    <button aria-label="Next slide" onClick={next} disabled={nextDisabled}><img src={nextDisabled ? disabledIcon : activeIcon} alt="" /></button>
  </div>;
}

function useCarouselEdges(ref) {
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;
    const update = () => {
      const next = {
        start: track.scrollLeft <= 2,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
      };
      setEdges(current => current.start === next.start && current.end === next.end ? current : next);
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);
  return edges;
}

export function ApprovedHeader({ page = 'home' }) {
  const [open, setOpen] = useState(false);
  return <header className="sp-header"><div className="sp-container"><a href="/" aria-label="BJS India home"><img className="sp-logo" src={L.imgBjsLogo041} alt="Bharatiya Jain Sanghatana" /></a><button className="sp-menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '\u2715' : '\u2630'}</button><nav className={open ? 'open' : ''} aria-label="Main navigation">{[['About Us', '/about'], ['Our Work', '/our-work'], ['Impact', '/impact'], ['Get Involved', '/get-involved'], ['Resources', '/resources'], ['Updates', '/updates']].map(([title, href]) => <a key={title} href={href} aria-current={title === 'Impact' && page === 'impact' ? 'page' : undefined} onClick={() => setOpen(false)}>{title}</a>)}</nav><div className="sp-header-tools"><span className="sp-language"><img src={L.imgVector} alt="" />EN</span><a className="sp-donate" href="mailto:info@bjsindia.org?subject=Donation%20enquiry">DONATE</a></div></div></header>;
}

export function ApprovedFooter({ landing = false }) {
  const columns = [
    ['About us', ['Our Story', '/about'], ['Our Presence', '/about#presence'], ['Founder', '/about#founder'], ['Head Office', '/about#leadership']],
    ['Our Work', ['Working Areas', '/our-work'], ["Program's Basket", '/our-work#program-basket']],
    ['Get Involved', ['Careers', 'mailto:info@bjsindia.org?subject=Careers'], ['Volunteer', '/#get-involved'], ['Partner With Us', '/#partners'], ['Donate', 'mailto:info@bjsindia.org?subject=Donation%20enquiry'], ['Contact With us', '#contact']],
    ['Resources', ['BJS Darpan', '/alldarpans'], ['Articles', '/resources/articles'], ['Media Center', '/resources/media-centre'], ['Collaterals', '/resources/collaterals']],
  ];
  const socials = [
    [L.imgFrame6147, 'Facebook', 'https://www.facebook.com/BJSIndia'],
    [L.imgFrame6148, 'Instagram', 'https://www.instagram.com/bhartiyajainsanghatana'],
    [L.imgFrame6149, 'YouTube', 'https://www.youtube.com/channel/UCFLe91tMq_twtQ7EDi97USQ'],
    [L.imgFrame6150, 'X', 'https://x.com/BJS_India'],
    [L.imgFrame6151, 'LinkedIn', 'https://www.linkedin.com/company/bjs-india/posts/?feedView=all'],
  ];
  return <footer className={`sp-footer${landing ? ' sp-footer-landing' : ''}`} id="contact"><div className="sp-container sp-footer-inner"><div className="sp-footer-brand"><a href="/" aria-label="BJS India home"><img src={L.imgWhiteBjsEnglish1} alt="Bharatiya Jain Sanghatana" /></a><p>Level 8, Mutha Chambers, II,<br />Senapati Bapat Rd,<br />Chattushringi, Gokhalenagar,<br />Pune, Maharashtra 411016</p><div className="sp-socials">{socials.map(([src, label, href]) => <a key={label} href={href} aria-label={`BJS India on ${label}`} target="_blank" rel="noopener noreferrer"><img src={src} alt="" /></a>)}</div><strong>Follow Us</strong></div><div className="sp-footer-columns">{columns.map(([title, ...links]) => <div key={title}><h3>{title}</h3>{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>)}</div><div className="sp-footer-contact"><h3>Connect With Us</h3><strong>Call</strong><a href="tel:+912066050000">020 6605 0000</a><strong>Email</strong><a href="mailto:info@bjsindia.org">info@bjsindia.org</a></div></div><div className="sp-copyright">2026 | BJS India | All Rights Reserved</div></footer>;
}
//OLD HERO SECTION
// function Hero() {
//   return <section className="sp-hero"><div className="sp-hero-mosaic" aria-hidden="true"><div className="sp-mosaic-top">{[L.imgRectangle33, L.imgRectangle43, L.imgRectangle29, L.imgRectangle34].map((src, i) => <div className="sp-mosaic-tile" key={i}><img src={src} alt="" /></div>)}</div><div className="sp-mosaic-bottom">{[L.imgRectangle31, L.imgRectangle30, L.imgRectangle32, L.imgRectangle35].map((src, i) => <div className="sp-mosaic-tile" key={i}><img src={src} alt="" /></div>)}</div></div><div className="sp-container"><div className="sp-hero-copy"><h1>Building Solutions.<br />Creating Change.<strong>Together.</strong></h1><p>Driven by a shared commitment to social impact. our volunteers come together to create meaningful change across communities.</p><div className="sp-hero-actions"><Action filled href="/about">Explore BJS</Action></div></div></div></section>;
// }


function Hero() {
  const heroImages = [
    '/assets/hero-mosaic.png',
    '/assets/hero-mosaic-2.png',
    '/assets/hero-mosaic-3.png',
  ];
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [previousHeroImage, setPreviousHeroImage] = useState(heroImages.length - 1);

  useEffect(() => {
    const carouselTimer = window.setInterval(() => {
      setPreviousHeroImage(activeHeroImage);
      setActiveHeroImage((activeHeroImage + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(carouselTimer);
  }, [activeHeroImage]);

  return (
    <section className="sp-hero">
      <div className="sp-hero-art" aria-hidden="true">
        <div className="sp-hero-art-track">
          <img
            className="is-previous"
            src={heroImages[previousHeroImage]}
            alt=""
            key={`previous-${previousHeroImage}`}
          />
          <img
            className="is-active"
            src={heroImages[activeHeroImage]}
            alt=""
            key={`active-${activeHeroImage}`}
          />
        </div>
        <div className="sp-hero-indicators" aria-hidden="true">
          {heroImages.map((src, index) => (
            <span
              className={index === activeHeroImage ? 'is-active' : ''}
              key={src}
            />
          ))}
        </div>
      </div>

      <div className="sp-container">
        <div className="sp-hero-copy">
          <h1>
            <strong>Visionary
              Solutions</strong>
            for Evolving Social Challenges
          </h1>

          <p>
            For over 42 years, BJS has been empowering individuals, strengthening families, and
            uniting communities turning vision into collective action for a stronger nation.
          </p>

          <div className="sp-hero-actions">
            <Action outlined href="/our-work">
              Explore BJS
            </Action>
          </div>
        </div>
      </div>
    </section>
  );
}


const darpanCovers = [L.imgRectangle456, L.imgRectangle454, L.imgRectangle452, L.imgRectangle334, L.imgRectangle453, L.imgRectangle455, L.imgRectangle457];
const coverGeometry = [
  ['43.74% 76.72% 0 0', 'hypot(46.4558cqw, -36.1811cqh)', 'hypot(53.5442cqw, 63.8189cqh)', 'rotate(-38.98deg) skewX(-0.06deg)'],
  ['26.55% 68.46% 6.35% 4.5%', 'hypot(50.2714cqw, -32.6895cqh)', 'hypot(49.7286cqw, 67.3105cqh)', 'rotate(-34.75deg) skewX(-0.05deg)'],
  ['9.91% 55.15% 15.88% 17.98%', 'hypot(66.9208cqw, -19.5513cqh)', 'hypot(33.0792cqw, 80.4487cqh)', 'rotate(-19.13deg) skewX(-0.04deg)'],
  ['0 39.54% 14.75% 34.77%', '100%', '100%', 'none'],
  ['8.6% 23.92% 14.83% 49.94%', 'hypot(76.8501cqw, 12.9006cqh)', 'hypot(-23.1499cqw, 87.0994cqh)', 'rotate(11.94deg) skewX(0.02deg)'],
  ['21.5% 7.03% 5.84% 65.92%', 'hypot(62.4081cqw, 22.8497cqh)', 'hypot(-37.5919cqw, 77.1503cqh)', 'rotate(22.92deg) skewX(0.04deg)'],
  ['42.44% 0 0 78.04%', 'hypot(58.6677cqw, 25.7692cqh)', 'hypot(-41.3323cqw, 74.2308cqh)', 'rotate(26.34deg) skewX(0.05deg)'],
];

function Newsletter() {
  const [contact, setContact] = useState('');
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);
  const redirectTimer = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(redirectTimer.current);
    window.clearTimeout(toastTimer.current);
  }, []);

  function showToast(message, type) {
    window.clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  }

  async function submit(event) {
    event.preventDefault();
    const value = contact.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/^\+?[\d\s()-]{8,20}$/.test(value)) {
      showToast('Enter a valid email address or WhatsApp number.', 'error');
      return;
    }
    setBusy(true);
    try {
      const result = await subscribeNewsletter(value);
      showToast(
        result.configured
          ? 'Thank you for subscribing to BJS Darpan.'
          : 'Subscriptions will be available soon. Please contact info@bjsindia.org to receive BJS Darpan.',
        result.configured ? 'success' : 'info'
      );
      if (result.configured) setContact('');
      redirectTimer.current = window.setTimeout(() => window.location.assign('/alldarpans'), 2000);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  return <section className="sp-newsletter" id="resources"><div className="sp-container">
    <img
      src="/assets/DarpanGif.gif"
      alt="BJS Darpan newsletter editions"
      className="sp-darpan-gif"
    />
    <div className="sp-newsletter-content"><h2>Subscribe Our Newsletter <strong>BJS Darpan</strong></h2><p>Stay connected with the latest updates, initiatives, stories and impact from BJS.</p><form onSubmit={submit}><label className="sr-only" htmlFor="sp-newsletter-contact">Email or WhatsApp number</label><input id="sp-newsletter-contact" required value={contact} onChange={event => setContact(event.target.value)} placeholder="Enter your E-Mail or WhatsApp Number" /><button type="submit" disabled={busy}>{busy ? 'SUBSCRIBING…' : 'SUBSCRIBE'}</button></form></div></div>
    {toast && <div className={`sp-newsletter-toast ${toast.type}`} role={toast.type === 'error' ? 'alert' : 'status'}>{toast.message}</div>}
  </section>;
}

const programmes = [
  { title: 'Blue Roots', image: L.imgRectangle17, circle: L.imgEllipse1, icon: L.imgLayerX00201, copy: 'Reviving water bodies and strengthening regional water security.', theme: 'blue', crop: { width: '131.73%', height: '135.53%', left: '-10.08%', top: '-34.94%' } },
  { title: 'WERC', image: L.imgRectangle18, circle: L.imgEllipse2, icon: L.imgGroup6028, copy: 'Empowering children through educational rehabilitation and holistic development.', theme: 'gold', crop: { width: '136.33%', height: '118.34%', left: '-14.42%', top: '-0.13%' } },
  { title: 'Disaster Response', image: L.imgRectangle19, circle: L.imgEllipse3, icon: '/assets/disaster-response-logo.png', copy: 'Delivering disaster relief and supporting long-term community recovery.', theme: 'pink', crop: { width: '108.23%', height: '105.58%', left: '-4.2%', top: '-3.05%' } },
  { title: 'Manthan', image: L.imgRectangle20, circle: L.imgEllipse4, icon: '/assets/3a259.svg', copy: 'Encouraging social dialogue to address challenges and explore solutions', theme: 'peach', crop: { width: '165.05%', height: '143.26%', left: '-32.49%', top: '-17.35%' } },
  { title: 'Plastic Surgery', image: L.imgRectangle21, circle: L.imgEllipse5, icon: '/assets/fb768.svg', copy: 'Providing free plastic surgery to children from underserved communities.', theme: 'pink', crop: { width: '174.66%', height: '179.71%', left: '-37.3%', top: '-39.93%' } },
  { title: "Smart Girl", image: "/assets/53965.png", "circle": "/assets/73acf.svg", "icon": "/assets/16c29.svg", copy: "Equipping adolescent girls with life skills and confidence." },
  { title: "JPA", "subtitle": "(Jain Parivarik Adalat)", image: "/assets/6d1e1.png", "circle": "/assets/47a74.svg", "icon": "/assets/18f5b.svg", copy: 'Resolving family conflicts through dialogue, understanding and mutual consent', crop: { "width": "125.22%", "height": "128.83%", "left": "-12.58%", "top": "-28.83%" } },
  { title: "Saksham", image: "/assets/57103.png", "circle": "/assets/2f476.svg", "icon": "/assets/9ff8d.svg", copy: "Helping entrepreneurs access MSME schemes and grow businesses." },
  { title: "Vivaah Verse Series", image: "/assets/afda8.png", "circle": "/assets/08a7e.svg", "icon": "/assets/beb94.svg", copy: "Enabling meaningful partner connections through self-discovery and compatibility." },
  { title: "Foundation Program", image: "/assets/6053d.png", "circle": "/assets/f4409.svg", "icon": "/assets/38a47.svg", copy: "Strengthening community engagement through structured, chapter-led initiatives.", crop: { "width": "163.58%", "height": "112.02%", "left": "-31.79%", "top": "0" } },
  { title: 'CCB', image: '/assets/ccb-card.png', circleColor: '#f3ebde', icon: '/assets/ccb-logo.svg', copy: 'Building community capabilities for collective action and sustainable development.', crop: { width: '100%', height: '216.7513%', left: '0', top: '0' } },
];
function Programs() {
  const ref = useRef(null);
  const edges = useCarouselEdges(ref);
  const scroll = direction => { const track = ref.current; if (track) track.scrollBy({ left: direction * (track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap)), behavior: "smooth" }); };
  return <section className="sp-programmes" id="programs">
    <div className="sp-container sp-section-bar">
      <Kicker>Our Programs</Kicker>
      <Arrows previous={() => scroll(-1)} next={() => scroll(1)} previousDisabled={edges.start} nextDisabled={edges.end} />
    </div>
    <div className="sp-programme-track" ref={ref}>{
      programmes.map(p =>
        <article className="sp-programme-card" key={p.title}>
          <div className="sp-programme-photo">
            <img src={p.image} alt={`${p.title} initiative`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }} />
          </div>
          <div className="sp-programme-symbol" style={p.circleColor ? { backgroundColor: p.circleColor, borderRadius: "50%" } : undefined}>
            {p.circle && <img src={p.circle} alt="" />}
            <span><img src={p.icon} alt="" /></span>
          </div>
          <div className="sp-programme-body">
            <h3>{p.title}{p.subtitle && <> <small>{p.subtitle}</small></>}</h3>
            <p>{p.copy}</p>
            <a href="/our-work#program-basket">Learn More <img src={L.imgGroup5998} alt="" /></a>
          </div>
        </article>)}
    </div>
    <div className="sp-container">
      <div className="sp-programme-note">
        <p>From water and environment to education, health and social development<br />our initiatives are designed to create sustainable and inclusive change</p>
        <a href="/our-work">View All Programs <img src={L.imgGroup5998} alt="" /></a>
      </div>
    </div>
  </section>;
}

function Impact() {
  return <ImpactSection><Kicker>Our Impact</Kicker><h2>Change Where <br /> It Matters Most</h2><p style={{ maxWidth: "85%" }}>Addressing diverse challenges through practical solutions and collective action for people, communities and the nation.</p><Action href="/impact">Explore Our Impact</Action></ImpactSection>;
}

export function ApprovedStats({ compact = false }) { const stats = compact ? [['12+', 'States'], ['170+', 'Districts'], ['500+', 'Chapters'], ['40K+', 'Volunteers']] : [['12+', 'States'], ['170+', 'Districts'], ['500+', 'Chapters'], ['42+', 'Years Of BJS'], ['5K+', 'Office Bearers'], ['40K+', 'Volunteers']]; return <div className={`sp-stats ${compact ? 'compact' : ''}`}>{stats.map(([value, label], i) => <div className={i < 3 && !compact ? 'outlined' : 'raised'} key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>; }
function PresenceCount({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value);
        return;
      }
      const start = performance.now();
      const update = now => {
        const progress = Math.min((now - start) / 2600, 1);
        setCount(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return <strong ref={ref} aria-label={`${value}${suffix}`}>{new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 0 }).format(count)}{suffix}</strong>;
}
function PresenceStats() {
  const stats = [[12, '+', 'States'], [170, '+', 'Districts'], [500, '+', 'Chapters'], [42, '+', 'Years Of BJS'], [5000, '+', 'Office Bearers'], [40000, '+', 'Volunteers']];
  return <div className="sp-stats">{stats.map(([value, suffix, label], i) => <div className={i < 3 ? 'outlined' : 'raised'} key={label}><PresenceCount value={value} suffix={suffix} /><span>{label}</span></div>)}</div>;
}
function Presence() { return <section className="sp-presence" id="get-involved"><img className="sp-presence-map" src={L.imgD4D674418D584E59B54C8Af56B24639D1} alt="" /><div className="sp-container"><div style={{ alignSelf: "center" }}><Kicker>Our Presence</Kicker><h2>A Growing<br />Presence Across India</h2><p>Our network of volunteers and initiatives continues to expand, reaching more communities and creating a wider impact every year.</p><Action href="/about#presence">View Map</Action></div><PresenceStats /></div></section>; }
function TestimonialVideoCard({ file, title, programme, onOpen }) {
  return <article className="sp-testimonial-card">
    <div className="sp-testimonial-player">
      <video
        className="sp-testimonial-video"
        src={`/assets/testimonials/${encodeURIComponent(file)}`}
        muted
        playsInline
        preload="metadata"
        aria-label={title}
      />
      <strong className="sp-testimonial-programme">{programme}</strong>
      <button
        type="button"
        className="sp-testimonial-play-toggle"
        onClick={onOpen}
        aria-label={`Play ${title}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
      </button>
    </div>
    <h3>{title}</h3>
    <p>Watch their story</p>
  </article>;
}

function Testimonials() {
  const ref = useRef(null);
  const modalRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalPlaybackError, setModalPlaybackError] = useState('');
  const edges = useCarouselEdges(ref);
  const videos = [
    ['Parinay Path - Jaipur 1.mp4', 'Parinay Path - Jaipur', 'Parinay Path'],
    ['Smart Girls - Jahazpur RJ 1.mp4', 'Smart Girls - Jahazpur', 'Smart Girls'],
    ['BJS Saksham 1.mp4', 'BJS Saksham', 'BJS Saksham'],
    ['DKJ Doctor 2.mp4', 'Dil Ka Jigsaw - Doctor', 'Dil Ka Jigsaw'],
    ['Humsafar Dobara Pune 1.mp4', 'Humsafar Dobara - Pune', 'Humsafar Dobara'],
    ['JPA Case SuccesStory Testimonial 1.mp4', 'JPA Success Story', 'JPA'],
  ];
  useEffect(() => {
    if (!selectedVideo) return undefined;
    setModalPlaybackError('');
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setSelectedVideo(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus();
    };
  }, [selectedVideo]);

  return <>
    <section className="sp-testimonials"><div className="sp-container"><Kicker>Real Stories. Real Change.</Kicker><div className="sp-section-bar"><div><h2>Real Lives. Lasting Change.</h2><p>Behind every initiative are people with a story. Hear what change means to them. </p></div><Arrows previous={() => ref.current?.scrollBy({ left: -289, behavior: 'smooth' })} next={() => ref.current?.scrollBy({ left: 289, behavior: 'smooth' })} previousDisabled={edges.start} nextDisabled={edges.end} /></div></div><div className="sp-testimonial-track" ref={ref}>{videos.map(([file, title, programme]) => <TestimonialVideoCard key={file} file={file} title={title} programme={programme} onOpen={() => setSelectedVideo({ file, title })} />)}</div></section>
    {selectedVideo && <div className="sp-testimonial-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedVideo(null); }}>
      <section className="sp-testimonial-modal" role="dialog" aria-modal="true" aria-labelledby="sp-testimonial-modal-title" tabIndex="-1" ref={modalRef}>
        <header className="sp-testimonial-modal-header">
          <h2 id="sp-testimonial-modal-title">{selectedVideo.title}</h2>
          <button type="button" className="sp-testimonial-modal-close" onClick={() => setSelectedVideo(null)} aria-label="Close video">×</button>
        </header>
        <video
          className="sp-testimonial-modal-video"
          src={`/assets/testimonials/${encodeURIComponent(selectedVideo.file)}`}
          controls
          autoPlay
          playsInline
          onError={() => setModalPlaybackError('This video could not be loaded. Please try again later.')}
        />
        {modalPlaybackError && <p className="sp-testimonial-modal-error" role="alert">{modalPlaybackError}</p>}
      </section>
    </div>}
  </>;
}
// OLD STORIES SECTION - 
// function Stories() { const [index, setIndex] = useState(1); const slides = [L.imgRectangle450, L.imgImage8, L.imgRectangle458]; return <section className="sp-stories" id="stories"><div className="sp-container"><Kicker>Media Center</Kicker><div className="sp-section-bar"><div><h2>Stories That Inspire Change.</h2><p>Watch our videos to see how BJS initiatives are creating real impact on the ground.</p></div><Arrows previous={() => setIndex((index + 2) % 3)} next={() => setIndex((index + 1) % 3)} /></div></div><div className="sp-story-stage"><img className="sp-story-side" src={slides[(index + 2) % 3]} alt="Previous BJS story" /><div className="sp-story-main"><img src={slides[index]} alt="BJS stories: impacting lives, ushering change" /></div><img className="sp-story-side" src={slides[(index + 1) % 3]} alt="Next BJS story" /></div></section>; }

function Stories() {
  const videos = [
    "LLg32P8vTKo",
    "Nba31fBkDME",
    "uBKArGHwz_8",
    "jY7LCStHhfg",
    "9Azx8W5iqaU",
    "V6SPfrESFOs",
    "wYcd1CK8Yig",
    "NBefzjHJ0FQ",
    "aJHpGUYJmCg",
  ];

  const [index, setIndex] = useState(0);

  const changeVideo = (direction) => {
    setIndex((current) =>
      (current + direction + videos.length) % videos.length
    );
  };

  return (
    <section className="sp-stories" id="stories">
      <div className="sp-container">
        <Kicker>Media Center</Kicker>

        <div className="sp-section-bar">
          <div>
            <h2>Stories Through The Lens.</h2>
            <p>
              From a vision for social change to decades of action across India.
            </p>
          </div>

          <Arrows
            previous={() => changeVideo(-1)}
            next={() => changeVideo(1)}
          />
        </div>
      </div>

      <div className="sp-story-gallery">
        <div className="sp-story-stage">
          {[-1, 0, 1].map((offset) => {
            const videoIndex =
              (index + offset + videos.length) % videos.length;

            return (
              <button
                key={offset}
                type="button"
                className={`sp-story-preview ${offset === 0
                  ? "is-center"
                  : offset === -1
                    ? "is-left"
                    : "is-right"
                  }`}
                onClick={() => {
                  if (offset !== 0) changeVideo(offset);
                }}
                aria-label={
                  offset === 0
                    ? `Currently selected video ${videoIndex + 1}`
                    : `Play video ${videoIndex + 1}`
                }
              >
                {offset === 0 ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videos[index]}?rel=0`}
                    title={`BJS story video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${videos[videoIndex]}/hqdefault.jpg`}
                    alt=""
                    draggable="false"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="sp-story-indicators" role="group" aria-label="Select a Media Center video">
          {videos.map((video, videoIndex) => (
            <button
              key={video}
              type="button"
              className={videoIndex === index ? "is-active" : ""}
              aria-label={`Show video ${videoIndex + 1} of ${videos.length}`}
              aria-current={videoIndex === index ? "true" : undefined}
              onClick={() => setIndex(videoIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


function Partners() {
  const logos = [
    ['/assets/Partners-Logo/credai.png', 'CREDAI'],
    ['/assets/Partners-Logo/unitedway.png', 'United Way'],
    ['/assets/Partners-Logo/jaina.png', 'JAINA'],
    ['/assets/Partners-Logo/tatatrusts.jpg', 'Tata Trusts'],
    ['/assets/Partners-Logo/bajaj.png', 'Bajaj'],
    ['/assets/Partners-Logo/forcemotors.png', 'Force Motors'],
    ['/assets/Partners-Logo/abp.jpg', 'ABP'],
    ['/assets/Partners-Logo/deshapnaye.jpg', 'Desh Apnaye'],
    ['/assets/Partners-Logo/Emcure-Logo.jpg', 'Emcure'],
  ];
  return <section className="sp-partners" id="partners">
    <div className="sp-container">
      <div><Kicker>Our Partners</Kicker>
        <h2>In Partnership<br />For a Better Tomorrow</h2>
      </div>
      <div className="sp-partner-logos" aria-label="Our partners">
        <div className="sp-partner-logo-track">{[0, 1].map(copy =>
          <div className="sp-partner-logo-group"
            key={copy}
            aria-hidden={copy === 1}>
            {logos.map(([src, label]) =>
              <div className="sp-partner-logo" key={label}>
                <img src={src} alt={copy === 0 ? label : ''} />
              </div>)
            }
          </div>
        )}
        </div>
      </div>
    </div>
  </section>;
}
export function ApprovedLanding() { return <div className="approved-landing"><Hero /><Newsletter /><Programs /><Impact /><Presence /><Testimonials /><Stories /><Partners /></div>; }

const journeyMilestones = [
  { year: '1985', title: 'Mass Marriage', image: '/assets/bjsJourney/1985-MassMarriage.jpg' },
  { year: '1989', title: 'Padyatra', image: '/assets/bjsJourney/1989-Padyatra.jpg' },
  { year: '1993', title: 'Latur Earthquake', image: '/assets/bjsJourney/1993-LaturEarthquake.jpg' },
  { year: '2003', title: 'FJEI', image: '/assets/bjsJourney/2003-FJEI.jpg' },
  { year: '2013', title: 'Maharashtra Drought', image: '/assets/bjsJourney/2013-MaharashtraDrought.JPG' },
  { year: '2020', title: 'COVID Relief', image: '/assets/bjsJourney/2020-COVIDRelief.jpg' },
  { year: '2022', title: 'RWB', image: '/assets/bjsJourney/2022-RWB.jpeg' },
];
export function ApprovedAbout() {
  const [year, setYear] = useState(2); const [expanded, setExpanded] = useState(null); const awardRef = useRef(null);
  const awardEdges = useCarouselEdges(awardRef);
  return <div className="approved-about">
    <section className="about-banner">
      <img src={B.img31} alt="BJS founder addressing a community gathering" />
      <h1>4 Decades of Nation Building</h1>
    </section>
    <section className="sp-who">
      <div className="sp-container">
        <h2>Who We Are</h2>
        <h3>Strengthening Communities. Supporting Families. Responding in Times of Need.</h3>
        <p>Established in 1985, Bharatiya Jain Sanghatana (BJS) is a nonprofit organisation that develops practical, research-based solutions to pressing social and national challenges. BJS began by mobilising communities against harmful social practices, including dowry and female foeticide. This early work grew into a mass movement for social reform.</p>
        <p> Since 1993, BJS has also played a leading role in disaster relief and rehabilitation across India and neighbouring countries, supporting communities through natural disasters,
          droughts and the COVID-19 pandemic. Strengthening the family system remains central to BJS’s work. Through ongoing research and thoughtfully designed programmes,
          BJS addresses emerging challenges around marriage and family life, helping individuals and families build stronger relationships and navigate social change.
        </p>
        <div className="sp-vision-mission" id="vision-mission">
          {[
            ['Our Vision', B.imgImage21, 'To collectively contribute towards nation building through the holistic development of society, fostering an empowered, self-reliant and inclusive nation where every individual has equal opportunities to learn, grow, participate and thrive.'],
            ['Our Mission', B.imgImage22, 'BJS identifies key societal challenges and delivers meaningful, sustainable solutions through professional expertise and its nationwide volunteer network, empowering communities and creating lasting positive change for the greater good of society.']
          ].map(([title, img, copy]) =>
            <article key={title}>
              <div className="sp-value-icon">
                <img src={B.imgEllipse55} alt="" />
                <img src={img} alt="" />
              </div>
              <img className="sp-value-line" src={B.imgLine29} alt="" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          )}
        </div>
      </div>
    </section>
    <section className="sp-about-presence" id="presence">
      <div className="sp-container">
        <div>
          <h2>A Shared Purpose.<br />A Strong Local Presence.</h2>
          <p>Bharatiya Jain Sanghatana is a volunteer-based organisation bringing together over 40,000 Jain volunteers across 12 states. Through local BJS chapters,
            they represent the organisation in their regions, bringing its initiatives closer to communities and turning shared purpose into local action.</p>
        </div>
        <div className="sp-about-map">
          <img src={B.imgD4D674418D584E59B54C8Af56B24639D1} alt="BJS presence across India" />
        </div>
        <ApprovedStats compact />
      </div>
    </section>
    <section className="sp-journey">
      <div className="sp-container">
        <p className="sp-journey-eyebrow">
          Defining Moments
        </p>
        <h2>
          The BJS Journey
        </h2>
        <article className="sp-journey-card">
          <div>
            <img
              src={journeyMilestones[year].image}
              alt={`${journeyMilestones[year].title} (${journeyMilestones[year].year})`}
            />
          </div>
          <h3>{journeyMilestones[year].title}</h3>
        </article>
        <div className="sp-timeline" role="group" aria-label="Select a year in the BJS journey">
          <img className="sp-timeline-line" src={B.imgLine5} alt="" />

          {journeyMilestones.map(
            ({ year: value }, i) =>
              <button key={value}
                aria-pressed={year === i}
                onClick={() => setYear(i)}>
                <span>
                  <img src={year === i ? B.imgEllipse27 : B.imgEllipse19}
                    alt="" />
                </span>
                {value}
              </button>
          )}
        </div>
      </div>
    </section>
    <section className="sp-founder" id="founder">
      <div className="sp-founder-inner sp-container">
        <div className="sp-founder-copy">
          <h2>Founder</h2>
          <h3>Mr. Shantilal Muttha</h3>
          <p>Social Reformer | Philanthropist | Humanitarian</p>
          <p style={{ textAlign: "left", fontSize: "14px", lineHeight: "20px" }}>Shri Shantilal Muttha is an Indian social reformer and philanthropist dedicated to nation-building through social development. Born in Maharashtra in 1954, he founded the Bharatiya Jain Sanghatana (BJS) in 1985 to address social challenges through education, family development, and disaster rehabilitation.</p>
          <p style={{ textAlign: "left", fontSize: "14px", lineHeight: "20px" }}>His initiatives include anti-dowry campaigns, mass marriages, educational reforms, and rehabilitation of children affected by the 1993 Latur earthquake through the Wagholi Educational and Rehabilitation Centre (WERC). Through the Shantilal Muttha Foundation, he continues to advance educational transformation and community development. His contributions have earned him over 40 national and international honours.</p>
          <Action href="https://hi.wikipedia.org/wiki/%E0%A4%B8%E0%A4%A6%E0%A4%B8%E0%A5%8D%E0%A4%AF_%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%BE:Shantilal_G_Muttha">
            Know more
          </Action>
        </div>
        <div className="sp-founder-photo">
          <img src={B.imgPolishedCorporatePortraitInAWarmOffice1} alt="Mr. Shantilal Muttha, founder of BJS" />
        </div>
      </div>
    </section>
    <section className="sp-people sp-container" id="leadership">
      <div className="sp-people-intro">
        <h2>How We Work</h2>
        <p>An organizational structure where top leadership drives strategic decision-making, with resources developed at the head office and disseminated nationwide through a network of volunteers.</p>
        <article className="sp-head-office" id="head-office">
          <img src={B.imgImage23} alt="BJS Head Office" />
          <h3>BJS Head Office</h3>
          <p style={{ textAlign: "left", fontSize: "16px", marginLeft: "15px" }}>A team of specialists that designs programmes, develops strategies, and drives implementation across the organisation.</p>
          <Action href="#contact" ariaLabel="Contact BJS about the Head Office"></Action>
        </article>
      </div>
      <div className="sp-people-cards">
        <span className="sp-people-line-horizontal" aria-hidden="true">
          <img src={B.imgLine22} alt="" />
        </span>
        <span className="sp-people-line-vertical" aria-hidden="true">
          <img src={B.imgLine23} alt="" />
        </span>
        {[
          ['Trust Board', B.imgImg202507181651581, "The organisation’s highest decision-making body, providing strategic direction and overseeing key priorities."],
          ['Founder President’s Office', B.imgScreenshot202608041615551, "The driving force behind BJS’s vision, guiding new initiatives and shaping the organisation’s future direction."],
          ['Volunteer Network', B.img41, "A nationwide network of volunteers that connects BJS with communities and carries its programmes into action across regions."]
        ].map(([title, img, description], i) => <article
          key={title}
          id={i === 0
            ? 'trust-board'
            : i === 2
              ? 'volunteer-network'
              : undefined}
          className={`sp-person-card person-${i}`}>
          <div className="sp-person-photo"><
            img src={img} alt={title} /></div>
          <div>
            <h3>{title}</h3>
            <p style={{ textAlign: "left", fontSize: "16px" }}>{description}</p>
            <button
              type="button"
              className="sp-person-more"
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-label={`${expanded === i ? 'Hide' : 'Show'} more about ${title}`}
              aria-expanded={expanded === i}
            >
              <img
                src={B[['imgGroup5999', 'imgGroup6000', 'imgGroup6001'][i]]}
                alt=""
              />
            </button>{expanded === i && <p className="sp-person-info">
              For further information,
              <a href="mailto:info@bjsindia.org">contact BJS</a>.
            </p>
            }
          </div>
        </article>
        )}
      </div>
    </section>
    <section className="sp-awards" id="awards">
      <div className="sp-container sp-awards-intro">
        <h2>Awards &amp; Recognition</h2>
        <p>
          Recognised by distinguished national and international institutions for <br /> outstanding contributions to social development.
        </p>
        <Arrows
          previous={() => awardRef.current?.scrollBy({ left: -425, behavior: 'smooth' })}
          next={() => awardRef.current?.scrollBy({ left: 425, behavior: 'smooth' })}
          previousDisabled={awardEdges.start}
          nextDisabled={awardEdges.end} />
      </div>
      <div className="sp-award-track" ref={awardRef}>
        {awards.map(award => <article key={award.id}><AwardPhoto award={award} />
          <div>
            <strong>{award.year}</strong>
            <h3>{award.title}</h3>
            <p>{award.description}</p>
          </div></article>)}</div>
    </section>
  </div>;
}
