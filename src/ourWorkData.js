// Read filename keys without generating imports for files in public/.
const files=Object.keys(import.meta.glob('/public/assets/our-work/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}'));
const images=new Map(files.map(path=>[path.split('/').pop().replace(/\.[^.]+$/,'').toLowerCase(),path.replace(/^\/public\//,'/')]));

export const focusAreas=[
  {id:'family',title:'Family & Relationships',description:'Strengthening family bonds through open communication, guidance and meaningful connections that help families navigate challenges together.'},
  {id:'values',title:'Values &\nResponsible Living',description:'Encouraging integrity, respect and empathy through values-based learning, personal development and responsible citizenship.'},
  {id:'environment',title:'Environmental\nConservation &\nDisaster Response',description:'Protecting natural resources and supporting communities through disaster relief, rehabilitation and efforts to build resilience.'},
  {id:'education',title:'Education &\nSkills Development',description:'Helping people pursue education, embrace lifelong learning and develop skills for employment, personal growth and self-reliance.'},
  {id:'networking',title:'Networking & Entrepreneurship',description:'Connecting aspiring entrepreneurs with guidance, resources and networks to nurture ideas, build businesses and support economic progress.'},
  {id:'health',title:'Health & Wellbeing',description:'Supporting physical and mental wellbeing through health awareness, preventive care, health camps and initiatives that encourage healthier lives.'},
  {id:'culture',title:'Culture & Interests',description:'Celebrating art, culture and traditions while creating opportunities for people to explore their interests, develop talents and connect through shared passions.'},
].map((area,index)=>({...area,number:String(index+1).padStart(2,'0'),image:images.get(`focus-${index+1}-${area.id}`)}));

export const programmeBaskets=[
  {id:'prarabdh',name:'Prarabdh',description:'Foundation Programmes',color:'#73e57b'},
  {id:'pratibimb',name:'Pratibimb',description:'Inception Programmes',color:'#ffdb34'},
  {id:'pravah',name:'Pravah',description:'Infusion Programmes',color:'#ff8b58'},
  {id:'parikalpana',name:'Parikalpana',description:'National Programmes',color:'#65b3ff'},
  {id:'prabodhi',name:'Prabodhi',description:'Elevation Programmes',color:'#c68cff'},
].map(basket=>({...basket,image:images.get(`basket-${basket.id}`)}));
