import React from 'react';
import './impact-page.css';

const impactHeroArtwork = '/assets/impact/hero.svg';

const impactStories = [
  {
    title: 'Blue Roots',
    heading: 'Revitalizing Water Bodies, Strengthening Water Security',
    image: '/assets/impact/blueroots.png',
    basket: 'parikalpana',
    program: 'blue-roots',
    copy: 'BJS’s Blue Roots initiative revitalizes ponds, reservoirs, and other water bodies to strengthen water security, recharge groundwater, and support rural livelihoods. To date, 14,204+ water bodies have been revitalized across 3,179 villages and 220 talukas. With 10.74 million cubic metres of silt excavated, the initiative has created 10,689 crore litres of additional water storage capacity, directly benefiting 24,860+ people.',
  },
  {
    title: 'Plastic Surgery',
    heading: 'Restoring Smiles, Rebuilding Confidence',
    image: '/assets/impact/surgery.png',
    basket: 'pravah',
    program: 'plastic-surgery-camps',
    copy: 'Since 1993, BJS has organized free plastic surgery camps in collaboration with medical professionals to help individuals with congenital conditions, including cleft lip and cleft palate, access essential corrective surgeries regardless of their financial circumstances. Through 557 free plastic surgery camps, the initiative has treated 34,062 patients and facilitated 274,509 surgeries.',
  },
  {
    title: 'Disaster Relief',
    heading: 'Standing Strong In Times Of Crisis',
    image: '/assets/impact/diaster.png',
    basket: 'parikalpana',
    program: 'disaster-response',
    copy: 'For over 30 years, BJS has provided timely disaster relief, safe shelter, and rehabilitation to communities affected by major emergencies. Its efforts include the educational rehabilitation of 1,200 children after the Latur earthquake, the reconstruction of 368 schools after the Gujarat earthquake, and safe shelter for 1,500 people affected by the Kashmir earthquake.',
  },
  {
    title: 'Wagholi Educational Rehabilitation Centre',
    heading: 'From Crisis To Classrooms, From Survival To Success',
    image: '/assets/impact/werc.png',
    basket: 'parikalpana',
    program: 'werc',
    copy: 'Since 1993, BJS has organized free plastic surgery camps in collaboration with medical professionals to help individuals with congenital conditions, including cleft lip and cleft palate, access essential corrective surgeries regardless of their financial circumstances. Through 557 free plastic surgery camps, the initiative has treated 34,062 patients and facilitated 274,509 surgeries.',
  },
];

export default function ImpactPage() {
  return <div className="impact-page">
    <section className="impact-hero">
      <div className="ip-container impact-hero-inner">
        {/* Hero content */}
        <div className="impact-hero-copy">
          <h2>Driving Change<br />At Scale</h2>
          <p>
            Behind every number is a life touched, a community
            strengthened, and a step towards lasting change.
          </p>
        </div>
        <div className="impact-orbit" aria-hidden="true"><img src={impactHeroArtwork} alt="" /></div>
      </div>
    </section>

    <section className="ip-stats ip-container" aria-label="Impact at a glance">
      {[
        ['14,374+', 'Water Bodies Revitalised'],
        ['265,668+', 'Smiles Recovered'],
        ['814,831+', 'Girls Empowered'],
        ['4,227+', 'Children Rehabilitated'],
      ].map(([value, label], i) => (
        <article className="ip-stat" key={i}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>

    <section className="impact-stories" id="impact-stories" aria-label="Our impact stories">
      {impactStories.map((story, index) => <article className={`ip-story${index % 2 ? ' ip-story-reverse' : ''}`} key={story.title}>
        <div className="ip-container ip-story-inner">
          <div className="ip-story-image"><img src={story.image} alt={`${story.title} initiative`} loading="lazy" /></div>
          <div className="ip-story-copy"><span className="ip-tag">{story.title}</span><h2>{story.heading}</h2><p>{story.copy}</p><a className="ip-read-more" href={`/our-work/programs/${story.basket}?program=${story.program}`}>Read More <span aria-hidden="true">→</span></a></div>
        </div>
      </article>)}
    </section>

    <section className="ip-cta"><div className="ip-container"><h2>Ready To Make An Impact?</h2><p>Join BJS in strengthening families, empowering communities and creating lasting social change.</p><div className="ip-cta-actions"><a href="/get-involved"><img src="/assets/impact/donate.svg" alt="" />Donate Securely</a><a href="/get-involved"><img src="/assets/impact/volunteer.svg" alt="" />Volunteer With Us</a><a href="/get-involved"><img src="/assets/impact/csr.svg" alt="" />CSR Partnership</a></div></div></section>
  </div>;
}
