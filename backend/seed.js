import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Basket from './models/Basket.js';
import Program from './models/Program.js';
import ProgramContent from './models/ProgramContent.js';

const seedData = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bjs_program_management';
  await mongoose.connect(mongoUri);
  console.log('[Seeder] Connected to MongoDB');

  // Clear existing collections
  await Basket.deleteMany({});
  await Program.deleteMany({});
  await ProgramContent.deleteMany({});
  console.log('[Seeder] Cleaned existing collections');

  const basketsToInsert = [
    {
      name: 'Prarabdh',
      slug: 'prarabdh',
      tagline: 'Foundation Programs',
      description: 'These Programs Equip BJS Chapters To Connect Within The Community, Participate In Service And Champion Social Responsibility. These Programs Strengthen A Shared Commitment To Duty, Ethical Action And Collective Progress. BJS Head Office Provides Guidance, Support And Resources To Help Chapters Translate The Organisation\'s Purpose Into Meaningful Local Action.',
      logo: { url: '/assets/our-work/basket-prarabdh.png', key: 'basket-prarabdh' },
      displayOrder: 1,
      status: 'active',
    },
    {
      name: 'Pratibimb',
      slug: 'pratibimb',
      tagline: 'Inception Programs',
      description: 'Inception programs designed to seed awareness, inspire empathy, and create accessible public platforms for community welfare across education, organ donation, and social collaboration.',
      logo: { url: '/assets/our-work/basket-pratibimb.png', key: 'basket-pratibimb' },
      displayOrder: 2,
      status: 'active',
    },
    {
      name: 'Pravah',
      slug: 'pravah',
      tagline: 'Infusion Programs',
      description: 'Transforming Lives Through Empowerment & Harmony. Activity-based workshops, youth empowerment, matrimonial dialogue, and family dispute resolution rooted in human values.',
      logo: { url: '/assets/our-work/basket-pravah.png', key: 'basket-pravah' },
      displayOrder: 3,
      status: 'active',
    },
    {
      name: 'Parikalpana',
      slug: 'parikalpana',
      tagline: 'National Programs',
      description: 'These Programmes Address Major Social And Environmental Challenges Through Planned, Large-Scale Action. With A Focus On Water Body Rejuvenation, Values-Based Development And Disaster Response, Parikalpana Works Towards Lasting Change And Stronger Communities Across India.',
      logo: { url: '/assets/our-work/basket-parikalpana.png', key: 'basket-parikalpana' },
      displayOrder: 4,
      status: 'active',
    },
    {
      name: 'Prabodhi',
      slug: 'prabodhi',
      tagline: 'Elevation Programs',
      description: 'These Programmes Equip BJS Chapters, Office Bearers And Volunteers With The Knowledge, Skills And Guidance To Manage Responsibilities Effectively And Contribute Meaningfully To Community Service.',
      logo: { url: '/assets/our-work/basket-prabodhi.png', key: 'basket-prabodhi' },
      displayOrder: 5,
      status: 'active',
    },
  ];

  const createdBaskets = await Basket.insertMany(basketsToInsert);
  const basketMap = new Map(createdBaskets.map((b) => [b.slug, b._id]));
  console.log(`[Seeder] Inserted ${createdBaskets.length} baskets`);

  const programsData = [
    // 1. Prarabdh (Foundation Programs)
    {
      basketSlug: 'prarabdh',
      name: 'You-Waah',
      slug: 'you-waah',
      shortDescription: 'Empowering Youth Leadership & Enterprise.',
      description: 'This Program Celebrates The Spirit Of Youth And Empowers Young Individuals By Acknowledging And Recognising Their Talents.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'you-waah' },
      displayOrder: 1,
      status: 'active',
      content: {
        overview: 'You-Waah is a dynamic youth platform fostering innovation, leadership capabilities, and entrepreneurial spirit among the next generation.',
        objectives: [
          'Recognise and nurture emerging youth talent',
          'Provide pitching opportunities for youth startups',
          'Develop confidence, public speaking, and team leadership',
        ],
        targetAudience: ['Youth aged 16-30', 'Young entrepreneurs', 'College students'],
        duration: 'Annual youth summit & multi-tier competitions',
        modules: [
          {
            title: 'युवा प्रतिभा सन्मान',
            description: 'Honouring outstanding achievements in academics, sports, social work, and innovation.',
            displayOrder: 1,
            topics: ['Talent recognition', 'Youth role models', 'Award felicitation'],
          },
          {
            title: 'Business Pitch Tank',
            description: 'Platform for young founders to pitch ideas to seasoned business mentors and angel investors.',
            displayOrder: 2,
            topics: ['Business model canvas', 'Investor pitch decks', 'Mentorship matching'],
          },
          {
            title: 'Pro Performers',
            description: 'Showcasing cultural, performing, and creative excellence of youth.',
            displayOrder: 3,
            topics: ['Creative arts', 'Stage confidence', 'Peer collaboration'],
          },
          {
            title: 'Lead With Pride',
            description: 'Workshops on ethics, social responsibility, and national nation-building.',
            displayOrder: 4,
            topics: ['Civic leadership', 'Values in business', 'Social entrepreneurship'],
          },
        ],
        resources: [
          {
            title: 'You-Waah Guideline Manual',
            description: 'Participant guidebook and challenge roadmap.',
            type: 'document',
            url: '/assets/resources/reports/you-waah-handbook.pdf',
          },
        ],
        additionalInformation: { youthParticipants: 25000, startupPitches: 320 },
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Cancer Crusaders',
      slug: 'cancer-crusaders',
      shortDescription: 'Early detection, awareness, and support for cancer prevention.',
      description: 'Spreading lifesaving knowledge about early warning symptoms, screening camps, and compassionate patient care networks.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'cancer-crusaders' },
      displayOrder: 2,
      status: 'active',
      content: {
        overview: 'Mobilising communities for timely diagnostic screenings and healthy lifestyle awareness to combat cancer.',
        objectives: ['Conduct screening camps', 'Demystify cancer diagnosis', 'Offer patient counseling'],
        targetAudience: ['Adults 30+', 'Women health groups', 'Community families'],
        duration: 'Periodic screening drives',
        modules: [
          {
            title: 'Awareness & Early Detection Protocol',
            description: 'Recognising early signs and regular checkup schedules.',
            displayOrder: 1,
            topics: ['Symptom identification', 'Screening access', 'Nutritional guidance'],
          },
        ],
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Anjuli',
      slug: 'anjuli',
      shortDescription: 'Community care and support for seniors and elders.',
      description: 'Strengthening connections between younger generations and elders, honouring their wisdom and fostering intergenerational warmth.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'anjuli' },
      displayOrder: 3,
      status: 'active',
      content: {
        overview: 'Anjuli builds caring community ecosystems for senior citizens, ensuring active social lives and emotional wellbeing.',
        objectives: ['Foster intergenerational respect', 'Organise regular elder engagement', 'Ensure healthcare access'],
        targetAudience: ['Senior citizens', 'Youth volunteers', 'Families'],
        duration: 'Ongoing chapter engagement',
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Career Compass',
      slug: 'career-compass',
      shortDescription: 'Guiding students toward informed educational and career pathways.',
      description: 'A career guidance initiative helping high school and college students discover their aptitudes, explore modern career options, and access scholarships.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'career-compass' },
      displayOrder: 4,
      status: 'active',
      content: {
        overview: 'Career Compass connects aspiring learners with experienced industry professionals and career assessment tools.',
        objectives: ['Psychometric evaluation', 'Expert industry mentorship', 'Scholarship awareness'],
        targetAudience: ['Students grades 9-12', 'College undergraduates', 'Parents'],
        duration: 'Weekend workshops and webinars',
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Matrutva',
      slug: 'matrutva',
      shortDescription: 'Maternal health, prenatal guidance, and early childhood care.',
      description: 'Nurturing expectant mothers with scientific prenatal care, holistic nutrition, emotional support, and values of Garbh Sanskar.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'matrutva' },
      displayOrder: 5,
      status: 'active',
      content: {
        overview: 'Comprehensive maternal health and wellness programmes for a healthy mother and child.',
        objectives: ['Promote maternal nutrition', 'Provide prenatal counseling', 'Encourage positive mental health'],
        targetAudience: ['Expectant mothers', 'Young couples', 'Healthcare providers'],
        duration: 'Trimester-wise workshop modules',
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Eco Fiesta',
      slug: 'eco-fiesta',
      shortDescription: 'Celebrating environmental sustainability through festivals and community drives.',
      description: 'Promoting eco-friendly festivals, tree planting, clay idol making, and single-use plastic reduction campaigns across chapters.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'eco-fiesta' },
      displayOrder: 6,
      status: 'active',
      content: {
        overview: 'Engaging families and schools in celebrating green festivals and reducing ecological footprint.',
        objectives: ['Eliminate Plaster of Paris idols', 'Encourage seed balls and native tree planting', 'Minimise waste during festivities'],
        targetAudience: ['Schools', 'Residential societies', 'Chapter volunteers'],
        duration: 'Festival seasons',
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Pitru Parv',
      slug: 'pitru-parv',
      shortDescription: 'Honouring ancestors and living elders through gratitude and service.',
      description: 'A dedicated period for expressing heartfelt gratitude to parents and ancestors through acts of community service and tree planting.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'pitru-parv' },
      displayOrder: 7,
      status: 'active',
      content: {
        overview: 'Transforming traditional remembrance into positive social contributions and environmental stewardship.',
        objectives: ['Encourage acts of kindness in memory of elders', 'Promote social philanthropy', 'Foster family unity'],
        targetAudience: ['Families', 'Community members'],
        duration: 'Annual observation',
      },
    },
    {
      basketSlug: 'prarabdh',
      name: 'Pratibha Spotlight',
      slug: 'pratibha-spotlight',
      shortDescription: 'Spotlighting exceptional talents and community achievers.',
      description: 'Recognising quiet community champions, researchers, artists, and sports achievers who inspire their communities through dedication.',
      thumbnail: { url: '/assets/our-work/basket-prarabdh.png', key: 'pratibha-spotlight' },
      displayOrder: 8,
      status: 'active',
      content: {
        overview: 'Honouring excellence and providing platforms for local talent to shine on regional and national stages.',
        objectives: ['Identify hidden grassroots talent', 'Provide financial stipends and recognition', 'Build peer mentorship networks'],
        targetAudience: ['Young achievers', 'Scholars', 'Artists'],
        duration: 'Annual chapter conclaves',
      },
    },

    // 2. Pratibimb (Inception Programs)
    {
      basketSlug: 'pratibimb',
      name: 'Vidya Daan',
      slug: 'vidya-daan',
      shortDescription: 'Providing educational support and book exhibitions for students in need.',
      description: 'The Vidyadaan Initiative By BJS Focuses On Providing Educational Support To Underprivileged Children While Fostering A Spirit Of Sharing. As Students Progress To Higher Grades, They Are Encouraged To Donate Their Old Books And Study Materials. BJS Then Organises A Meaningful Exhibition Where These Resources Are Made Available To Children In Need. This Initiative Promotes A Culture Of Generosity And Helps Bridge The Educational Gap, Ensuring Every Child Has Access To The Learning Tools They Require. Created By The Nagpur Chapter, Vidyadaan Exemplifies BJS\'s Commitment To Enhancing Educational Opportunities For All.',
      thumbnail: { url: '/assets/our-work/basket-pratibimb.png', key: 'vidya-daan' },
      displayOrder: 1,
      status: 'active',
      content: {
        overview: 'Vidya Daan mobilises educators, professionals, and students to democratise access to quality guidance, books, and study materials.',
        objectives: ['Provide tutoring to underprivileged students', 'Supply study materials and books', 'Foster culture of sharing'],
        targetAudience: ['Students grades 8-12', 'College aspirants', 'Volunteer tutors'],
        duration: 'Academic year-long programme',
      },
    },
    {
      basketSlug: 'pratibimb',
      name: 'Organ Donation',
      slug: 'organ-donation',
      shortDescription: 'Inspiring lifesaving organ pledges and dispelling myths.',
      description: 'The Delhi Chapter Of BJS, In Collaboration With NOTTO, Has Conducted Over 40 Awareness Camps Across Delhi To Promote The Critical Cause Of Organ Donation. These Efforts Aim To Educate People About How Organ Donation Can Save Lives, Inspiring Thousands To Pledge Their Organs By Filling Out BJS Organ Donation Forms And Committing To The Mokshpath Initiative. This Program Is Vital As It Not Only Fosters A Culture Of Generosity And Compassion But Also Addresses The Urgent Need For Organ Donors, Ultimately Helping Save Countless Lives And Creating A Lasting Social Impact.',
      thumbnail: { url: '/assets/our-work/basket-pratibimb.png', key: 'organ-donation' },
      displayOrder: 2,
      status: 'active',
      content: {
        overview: 'BJS Organ Donation initiative actively bridges the gap between waiting organ recipients and voluntary donors through education.',
        objectives: ['Normalise organ donation discussions in families', 'Facilitate donor pledge registrations', 'Train chapter ambassadors'],
        targetAudience: ['Adults 18+', 'Medical colleges', 'Community associations'],
        duration: 'Continuous awareness seminars',
      },
    },
    {
      basketSlug: 'pratibimb',
      name: 'Toy Bank',
      slug: 'toy-bank',
      shortDescription: 'Spreading joy and learning to underserved children through donated toys.',
      description: 'Khilona Bank, A Heartwarming Initiative By BJS, Is Dedicated To Bringing Joy To Underprivileged Children Through The Collection And Distribution Of Toys. Khilona Bank Seeks To Provide Happiness And Support The Development Of Children Who Lack Access To Such Resources. This Initiative Not Only Brightens Young Lives But Also Underscores BJS\'s Steadfast Commitment To Community Welfare. Developed By The Jaipur Chapter, Khilona Bank Is A Testament To The Organization\'s Dedication To Making A Difference.',
      thumbnail: { url: '/assets/our-work/basket-pratibimb.png', key: 'toy-bank' },
      displayOrder: 3,
      status: 'active',
      content: {
        overview: 'Toy Bank collects gently used toys and educational games to create recreational hubs in anganwadis, rural schools, and orphanages.',
        objectives: ['Deliver toys to rural children', 'Encourage sharing and empathy in urban youth', 'Equip early childhood learning centres'],
        targetAudience: ['Children aged 3-12', 'Anganwadis', 'Donor families'],
        duration: 'Year-round collection and distribution',
      },
    },
    {
      basketSlug: 'pratibimb',
      name: 'Business Conclave',
      slug: 'business-conclave',
      shortDescription: 'Connecting industry leaders, entrepreneurs, and innovators for economic progress.',
      description: 'The Business To Business (B2B) Conclave By BJS Is A Flagship Event That Brings Together Industry Leaders And Innovators In A Single, Dynamic Forum. With A Well-Defined Standard Operating Procedure In Place, The Conclave Provides An Exceptional Platform For Building Valuable Partnerships, Exchanging Transformative Insights, And Exploring Collaborative Opportunities Across Various Sectors. By Fostering A Vibrant Atmosphere For Networking And Knowledge Sharing, BJS Aims To Advance Economic Growth And Strategic Alliances. Organized By The Jodhpur Chapter, This Event Exemplifies BJS\'s Commitment To Driving Progress And Innovation.',
      thumbnail: { url: '/assets/our-work/basket-pratibimb.png', key: 'business-conclave' },
      displayOrder: 4,
      status: 'active',
      content: {
        overview: 'Business Conclave is a premier B2B forum for business networking, cross-industry partnerships, and angel mentorship.',
        objectives: ['Facilitate B2B trade partnerships', 'Provide exposure to emerging technologies', 'Mentor early-stage entrepreneurs'],
        targetAudience: ['Business owners', 'Corporate executives', 'Startups'],
        duration: 'Annual two-day conclaves',
      },
    },

    // 3. Pravah (Infusion Programs)
    {
      basketSlug: 'pravah',
      name: 'Smart Girl',
      slug: 'smart-girl',
      shortDescription: 'Life skills and empowerment for adolescent girls aged 13–18.',
      description: 'A two-day, activity-based programme that fosters self-awareness, emotional resilience, decision-making, and open communication with parents.',
      thumbnail: { url: '/assets/53965.png', key: 'smart-girl' },
      displayOrder: 1,
      status: 'active',
      content: {
        overview: 'Smart Girl addresses critical psychological, social, and emotional challenges faced by teenage girls during crucial developmental years.',
        objectives: [
          'Foster self-worth, positive self-image, and emotional strength',
          'Equip girls with critical decision-making abilities',
          'Promote healthy boundaries and communication with parents',
          'Build digital safety awareness and conflict resolution habits',
        ],
        targetAudience: ['Adolescent girls (13–18 years)', 'Parents and guardians', 'School educators'],
        duration: '2 Days (16 hours total)',
        modules: [
          {
            title: 'Self-Awareness & Self-Esteem',
            description: 'Uncovering personal values, strengths, and addressing peer pressure.',
            displayOrder: 1,
            topics: ['Identity discovery', 'Overcoming insecurities', 'Positive body image'],
          },
          {
            title: 'Communication & Healthy Relationships',
            description: 'Expressing feelings constructively and bridging generational divides.',
            displayOrder: 2,
            topics: ['Effective listening', 'Saying No with dignity', 'Parent-adolescent bridge'],
          },
          {
            title: 'Safety, Emotional Health & Decision Making',
            description: 'Managing stress, emotional regulation, and cyber-space safety.',
            displayOrder: 3,
            topics: ['Cyber hygiene', 'Managing anxiety', 'Rational choices under pressure'],
          },
        ],
      },
    },
    {
      basketSlug: 'pravah',
      name: 'Dil Ka Jigsaw',
      slug: 'dil-ka-jigsaw',
      shortDescription: 'Discover compatibility and explore emotional connections.',
      description: 'An engaging programme that helps young adults understand personal compatibility, strengthen mutual communication, and build meaningful relationships.',
      thumbnail: { url: '/assets/afda8.png', key: 'dil-ka-jigsaw' },
      displayOrder: 2,
      status: 'active',
      content: {
        overview: 'Dil Ka Jigsaw is designed for prospective marriage partners to uncover shared values, communication styles, and mutual expectations.',
        objectives: [
          'Enable self-discovery regarding relationship expectations',
          'Provide frameworks to evaluate long-term compatibility',
          'Foster transparent and constructive pre-marital communication',
        ],
        targetAudience: ['Unmarried young adults', 'Prospective couples', 'Parents'],
        duration: '1 Day intensive workshop',
      },
    },
    {
      basketSlug: 'pravah',
      name: 'Jain Parivarik Adalat (JPA)',
      slug: 'jain-parivarik-adalat',
      shortDescription: 'Resolving family conflicts through dialogue, understanding, and mutual consent.',
      description: 'A community-based mediation forum that resolves matrimonial and intra-family disputes through counselling, legal guidance, and empathetic mediation.',
      thumbnail: { url: '/assets/6d1e1.png', key: 'jpa' },
      displayOrder: 3,
      status: 'active',
      content: {
        overview: 'JPA provides confidential, constructive dispute resolution as an alternative to prolonged courtroom litigation.',
        objectives: ['Reconcile estranged couples', 'Facilitate amicable separations without animosity', 'Protect mental wellbeing of children'],
        targetAudience: ['Couples experiencing marital distress', 'Extended families'],
        duration: 'Case-by-case mediation sessions',
      },
    },
    {
      basketSlug: 'pravah',
      name: 'Free Plastic Surgery Camps',
      slug: 'plastic-surgery-camps',
      shortDescription: 'Restoring smiles and rebuilding confidence through specialised surgery.',
      description: 'Since 1993, BJS has brought top plastic surgeons from around the world to provide free surgical corrections for cleft lips, palates, and burn contractures for underserved families.',
      thumbnail: { url: '/assets/e1c8a.png', key: 'plastic-surgery' },
      displayOrder: 4,
      status: 'active',
      content: {
        overview: 'Specialist medical missions providing cleft lip and palate corrective surgeries free of cost, transforming lives and social integration.',
        objectives: ['Deliver free corrective surgeries', 'Screen and provide post-op care', 'Eliminate social stigma'],
        targetAudience: ['Children with cleft lip/palate', 'Burn contracture patients'],
        duration: 'Multi-day intensive surgical camps',
      },
    },

    // 4. Parikalpana (National Programs)
    {
      basketSlug: 'parikalpana',
      name: 'Blue Roots',
      slug: 'blue-roots',
      shortDescription: 'Reviving Water Bodies. Strengthening Water Security.',
      description: 'Blue Roots Rejuvenates Ponds, Lakes And Other Water Bodies Across Multiple States. By Restoring Water Resources And Promoting Sustainable Water Management, The Initiative Helps Communities Address Water Scarcity And Build Water Security For The Future.',
      thumbnail: { url: '/assets/bb1f8.png', key: 'blue-roots' },
      displayOrder: 1,
      status: 'active',
      content: {
        overview: 'Blue Roots revitalises drying water bodies, increases rural water availability, and recharges underground aquifers using an efficient Public-Private-People Partnership (4P) model.',
        objectives: [
          'Deepen and desilt water reservoirs to restore maximum holding capacity',
          'Provide rich silt to farmers to enhance soil fertility without chemical fertilizers',
          'Empower village water committees for sustainable long-term water management',
        ],
        targetAudience: ['Rural farmers', 'Village panchayats', 'District administrations'],
        duration: 'Pre-monsoon operational cycles (March – June)',
        modules: [
          {
            title: 'Geospatial Survey & Planning',
            description: 'Mapping silt accumulation using drone and satellite bathymetry.',
            displayOrder: 1,
            topics: ['Hydrological surveys', 'Farmer silt requisition', 'Machine deployment logistics'],
          },
          {
            title: 'Excavation & Farm Application',
            description: 'Heavy machinery desiltation and soil transportation to beneficiary fields.',
            displayOrder: 2,
            topics: ['Heavy earthmover operations', 'Silt spreading techniques', 'Capacity auditing'],
          },
        ],
        additionalInformation: {
          waterBodiesRejuvenated: 14374,
          villagesReached: 3179,
          storageCapacityCreatedLitres: '10833 Crore',
          earthExcavatedMillionM3: 10.74,
        },
      },
    },
    {
      basketSlug: 'parikalpana',
      name: 'Disaster Relief & Rehabilitation',
      slug: 'disaster-relief-rehabilitation',
      shortDescription: 'Delivering Swift Relief. Rebuilding Resilient Lives.',
      description: 'Delivering immediate relief and long-term rehabilitation during earthquakes, floods, and natural calamities with structured volunteer response and rebuilding permanent schools and shelters.',
      thumbnail: { url: '/assets/2784c.png', key: 'disaster-relief' },
      displayOrder: 2,
      status: 'active',
      content: {
        overview: 'A nationwide volunteer mobilization engine capable of deploying medical aid, temporary shelters, and nutritional supplies within hours of a national emergency.',
        objectives: [
          'Provide emergency rescue, relief kits, and safe drinking water',
          'Deploy mobile health clinics and emergency medical teams',
          'Construct transitional shelters and rebuild community infrastructure',
        ],
        targetAudience: ['Disaster-stricken communities', 'First responders', 'District disaster cells'],
        duration: 'Immediate rapid response (0-72 hrs) through long-term rehabilitation',
      },
    },

    // 5. Prabodhi (Elevation Programs)
    {
      basketSlug: 'prabodhi',
      name: 'Chapter Capacity Building Program',
      slug: 'chapter-capacity-building',
      shortDescription: 'Building Capabilities. Empowering People To Serve.',
      description: 'Chapter Capacity Building Program Is A Structured Training Initiative Designed To Strengthen BJS\'s 500+ Chapters And 50,000+ Karyakartas (Volunteers). Through Focused Learning And Understanding About The Organisation, Programs, Governance, Leadership, Systems, And Processes, The Program Equips Chapters To Work In A Unified, Disciplined, And Process-Oriented Manner. This Program Ensures Every Chapter Operates With Clarity, Alignment, And Organisational Values-Creating A Stronger, More Coherent, And Future-Ready BJS Volunteer Network.',
      thumbnail: { url: '/assets/our-work/basket-prabodhi.png', key: 'ccb' },
      displayOrder: 1,
      status: 'active',
      content: {
        overview: 'CCB transforms volunteer passion into disciplined project management, driving consistent execution of social initiatives across India.',
        objectives: [
          'Train chapter leaders in project planning and financial accountability',
          'Deploy standardized digital reporting and communication tools',
          'Foster inter-chapter collaboration and best-practice sharing',
        ],
        targetAudience: ['Chapter Presidents', 'Secretaries & Treasurers', 'National coordinators'],
        duration: '3-Day residential leadership conclaves',
        modules: [
          {
            title: 'Social Project Management',
            description: 'Designing, budgeting, and delivering measurable community projects.',
            displayOrder: 1,
            topics: ['Goal setting', 'Stakeholder alignment', 'Impact metrics'],
          },
        ],
      },
    },
    {
      basketSlug: 'prabodhi',
      name: 'Webinar Series',
      slug: 'webinar-series',
      shortDescription: 'Digital Learning & Leadership Exchanges.',
      description: 'Online capacity-building seminars bringing national experts, policy makers, and chapter leaders together for continuous learning and strategic execution.',
      thumbnail: { url: '/assets/our-work/basket-prabodhi.png', key: 'webinar-series' },
      displayOrder: 2,
      status: 'active',
      content: {
        overview: 'Regular virtual masterclasses on governance, community mobilization, and digital impact reporting.',
        objectives: ['Continuous executive learning', 'Disseminate standard operating procedures', 'Peer exchange of best practices'],
        targetAudience: ['Chapter office bearers', 'Active volunteers'],
        duration: 'Monthly interactive webinars',
      },
    },
    {
      basketSlug: 'prabodhi',
      name: 'Volunteer Development Program',
      slug: 'volunteer-development-program',
      shortDescription: 'Nurturing Passion Into Impactful Action.',
      description: 'Comprehensive orientation, mentoring, and skill enhancement for grassroots volunteers entering community service and nation building.',
      thumbnail: { url: '/assets/our-work/basket-prabodhi.png', key: 'volunteer-development' },
      displayOrder: 3,
      status: 'active',
      content: {
        overview: 'Structured training modules for new and seasoned volunteers to align with BJS ethos and deliver high-impact programs.',
        objectives: ['Instill core organisational values', 'Develop leadership and communication skills', 'Foster grassroots commitment'],
        targetAudience: ['Youth volunteers', 'Community workers'],
        duration: 'Weekend immersion camps',
      },
    },
  ];

  for (const item of programsData) {
    const basketId = basketMap.get(item.basketSlug);
    if (!basketId) continue;

    const program = new Program({
      basketId,
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription,
      description: item.description,
      thumbnail: item.thumbnail,
      displayOrder: item.displayOrder,
      status: item.status,
    });
    const savedProgram = await program.save();

    if (item.content) {
      const content = new ProgramContent({
        programId: savedProgram._id,
        ...item.content,
      });
      await content.save();
    }
  }

  console.log(`[Seeder] Seeded ${programsData.length} programs with full contents!`);
  await mongoose.disconnect();
  console.log('[Seeder] Done!');
};

seedData().catch((err) => {
  console.error('[Seeder Error]:', err);
  process.exit(1);
});
