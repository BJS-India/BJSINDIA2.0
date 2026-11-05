import { programmeBaskets } from './ourWorkData';

const sharedCopy = 'BJS programmes bring people together through practical guidance, community participation and care rooted in Jain values.';

const basketPrograms = {
  prarabdh: [
    { id: 'tithigram', name: 'Tithigram Calendar Programs', tagline: 'Building Stronger, Connected Communities', details: 'Chapter-led programmes create regular opportunities for neighbours to come together, share resources and take collective action.', image: '/assets/our-work/basket-prarabdh.png', points: ['Community participation', 'Local leadership', 'Sustained chapter activities'] },
    { id: 'shunyagram', name: 'Shunyagram Zero Day Programmes', tagline: 'A Collective Step Towards Zero Waste', details: 'Local communities work together to reduce waste and adopt practical, sustainable habits in daily life.', image: '/assets/our-work/basket-prarabdh.png', points: ['Waste awareness', 'Responsible daily practices', 'Community-led action'] },
  ],
  pratibimb: [
    { id: 'vidya-daan', name: 'Vidya Daan', tagline: 'Sharing Knowledge. Opening Possibilities.', details: 'A community education initiative that helps learners access guidance, learning resources and support.', image: '/assets/our-work/basket-pratibimb.png', points: ['Learning support', 'Access to educational resources', 'Community mentorship'] },
    { id: 'organ-donation', name: 'Organ Donation', tagline: 'Inspiring Awareness. Saving Lives.', details: 'Awareness activities encourage informed conversations about organ donation and its life-saving potential.', image: '/assets/our-work/basket-pratibimb.png', points: ['Public awareness', 'Informed conversations', 'Community outreach'] },
    { id: 'toy-bank', name: 'Toy Bank', tagline: 'Play, Learn and Grow Together', details: 'Toy Bank helps children learn through play by connecting communities with useful play and learning materials.', image: '/assets/our-work/basket-pratibimb.png', points: ['Learning through play', 'Sharing useful resources', 'Supporting child development'] },
    { id: 'business-conclave', name: 'Business Conclave', tagline: 'Ideas and Connections for Shared Growth', details: 'A platform for people to exchange ideas, build networks and explore opportunities for responsible enterprise.', image: '/assets/our-work/basket-pratibimb.png', points: ['Knowledge exchange', 'Professional connections', 'Responsible enterprise'] },
  ],
  pravah: [
    { id: 'smart-girl', name: 'Smart Girl', tagline: 'Life Skills for Confident Young Women', details: 'A two-day, activity-based programme for girls aged 13–18. It supports social and emotional growth and helps participants understand themselves, build healthy relationships and make informed decisions with confidence.', image: '/assets/53965.png', logo: '/assets/73acf.svg', points: ['Self-awareness', 'Communication and relationships', 'Women’s health', 'Self-esteem and confidence', 'Choices and decision-making', 'Understanding mental health', 'Communication with parents'], outcomes: ['Confidence', 'Life skills', 'Wellbeing', 'Self-reliance'] },
    { id: 'parinay-path', name: 'Parinay Path', tagline: 'A Thoughtful Approach to Choosing a Life Partner', details: 'Parinay Path offers guidance and a considered process for people exploring a life partnership, supporting informed choices and meaningful connections.', image: '/assets/our-work/basket-pravah.png', points: ['Self-understanding', 'Thoughtful partner selection', 'Guidance for families'] },
    { id: 'dil-ka-jigsaw', name: 'Dil Ka Jigsaw', tagline: 'Discover Compatibility. Explore Connection.', details: 'An engaging programme that helps young adults understand compatibility, strengthen communication and build meaningful relationships.', image: '/assets/afda8.png', points: ['Communication', 'Understanding compatibility', 'Building healthy relationships'] },
    { id: 'bjs-saksham', name: 'BJS Saksham', tagline: 'MSME Awareness. Business Empowerment.', details: 'BJS Saksham helps entrepreneurs understand MSME schemes and build the knowledge and connections to grow their businesses.', image: '/assets/our-work/basket-pravah.png', points: ['MSME scheme awareness', 'Business guidance', 'Entrepreneurial connections'] },
    { id: 'jain-parivarik-adalat', name: 'Jain Parivarik Adalat', tagline: 'Supporting Families Through Dialogue and Understanding', details: 'A community-based approach to resolving family matters through dialogue, mutual understanding and informed guidance.', image: '/assets/6d1e1.png', points: ['Dialogue and listening', 'Family-focused guidance', 'Mutual understanding'] },
    { id: 'plastic-surgery-camps', name: 'Free Plastic Surgery Camps', tagline: 'Specialist Care. Renewed Possibilities.', details: 'BJS brings specialist medical care to children and families who may otherwise face barriers to treatment.', image: '/assets/e1c8a.png', points: ['Specialist medical care', 'Community-based camps', 'Support for underserved families'] },
  ],
  parikalpana: [
    { id: 'werc', name: 'Wagholi Education Rehabilitation Centre', tagline: 'Learning Support for Every Child', details: 'The centre supports children through educational rehabilitation, a nurturing learning environment and opportunities to build confidence.', image: '/assets/60029.png', points: ['Education and rehabilitation', 'Individual learning support', 'Holistic development'] },
    { id: 'disaster-response', name: 'Disaster Response', tagline: 'Relief Today. Resilience for Tomorrow.', details: 'BJS works with communities during emergencies and supports recovery and resilience after disasters.', image: '/assets/2784c.png', points: ['Emergency relief', 'Community recovery', 'Long-term resilience'] },
    { id: 'blue-roots', name: 'Blue Roots', tagline: 'Restoring Water. Strengthening Communities.', details: 'Blue Roots supports water conservation and the rejuvenation of local water bodies for communities across India.', image: '/assets/bb1f8.png', points: ['Water conservation', 'Water-body rejuvenation', 'Community stewardship'] },
  ],
  prabodhi: [
    { id: 'chapter-capacity-building', name: 'Chapter Capacity Building', tagline: 'Stronger Chapters. Greater Community Impact.', details: 'Capacity-building support helps BJS chapters strengthen leadership, plan programmes and serve their communities effectively.', image: '/assets/our-work/basket-prabodhi.png', points: ['Leadership development', 'Programme planning', 'Stronger local networks'] },
  ],
};

export const programBasketPages = programmeBaskets.map(basket => ({
  ...basket,
  heading: `${basket.description} (${basket.name})`,
  intro: basket.id === 'pravah' ? 'Rooted in Jain values. Driven by care and participation.' : sharedCopy,
  summary: sharedCopy,
  featured: basket.id === 'pravah' ? [
    { name: 'Sarva-Sneh', description: 'Strengthening the Jain community through dialogue and shared participation.' },
    { name: 'Sevarth', description: 'Serving society through meaningful community action.' },
  ] : [],
  programs: basketPrograms[basket.id] || [],
}));
