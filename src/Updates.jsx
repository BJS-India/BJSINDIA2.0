import { useState } from 'react';
import './updates.css';

const announcements = [
  { title: <>Registration Open For <em>Parinay Path</em></>, date: '20 Oct 2026', image: '/assets/updates/announcements.png', text: 'Join us for an engaging workshop to develop leadership skills and create positive change.' },
  { title: <>Registration Open For <em>Parinay Path</em></>, date: '20 Oct 2026', image: '/assets/updates/announcements.png', text: 'Join us for an engaging workshop to develop leadership skills and create positive change.' },
  { title: <>Registration Open For <em>Parinay Path</em></>, date: '20 Oct 2026', image: '/assets/updates/announcements.png', text: 'Join us for an engaging workshop to develop leadership skills and create positive change.' },
];
const news = [
  { category: 'MANTHAN', title: 'BJS Strengthens Community Support Through New Outreach Initiatives', image: '/assets/updates/news.png' },
  { category: 'MANTHAN', title: 'BJS Strengthens Community Support Through New Outreach Initiatives', image: '/assets/updates/news.png' },
  { category: 'MANTHAN', title: 'BJS Strengthens Community Support Through New Outreach Initiatives', image: '/assets/updates/news.png' },
];

export default function Updates() {
  const [start, setStart] = useState(0);
  return <div className="updates-page">
    <section className="updates-feature">
      <div className="updates-container">
        <header className="updates-intro"><h1>Updates</h1><p>Stay informed about the latest announcements, news and milestones from BJS and our ongoing initiatives across communities.</p></header>
        <article className="featured-story">
          <div className="featured-image"><img src="/assets/updates/updates.png" alt="BJS team members connecting with children"/><span>FEATURED</span></div>
          <div className="featured-copy"><span className="updates-category">WERC</span><time dateTime="2026-10-12">12 Oct 2026</time><h2>BJS Launches New Education Initiative to Empower More Young Minds</h2><i aria-hidden="true"/><p>A new programme to strengthen access to quality education and create brighter opportunities for children across underserved communities.</p><a className="updates-link" href="/resources/articles">Read Now <span aria-hidden="true">➜</span></a></div>
        </article>
      </div>
    </section>
    <section className="announcements" id="announcements"><div className="updates-container"><h2>Announcements</h2><p className="section-description">Ideas and insights that inspire change. Explore stories, perspectives and experiences on social development,<br className="updates-break"/> community building and the issues that shape our society.</p><div className="announcement-list">{announcements.map((item, i)=><article className="announcement-card" key={i}><img src={item.image} alt="Parinay Path workshop"/><div className="announcement-text"><h3>{item.title}</h3><p>{item.text}</p></div><time dateTime="2026-10-20">{item.date}</time><a className="round-link" href="/resources/articles" aria-label="Read announcement">→</a></article>)}</div></div></section>
    <section className="updates-news" id="news"><div className="updates-container"><div className="news-heading"><h2>News</h2><div className="news-controls"><button aria-label="Previous news" onClick={()=>setStart((start+news.length-1)%news.length)}>‹</button><button aria-label="Next news" onClick={()=>setStart((start+1)%news.length)}>›</button></div></div><div className="news-track">{[0,1,2].map(offset=>{const story=news[(start+offset)%news.length];return <article className="news-card" key={offset}><img src={story.image} alt="BJS community outreach event"/><div className="news-body"><span className="updates-category">{story.category}</span><h3>{story.title}</h3><i aria-hidden="true"/><p>Connect with our team for enquiries, programme information or opportunities to contribute.</p><a href="/resources/articles">Read More <span aria-hidden="true">→</span></a></div></article>;})}</div></div></section>
  </div>;
}
