const filenames=Object.keys(import.meta.glob('/public/assets/get-involved/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}'));
const assets=new Map(filenames.map(path=>[path.split('/').pop().replace(/\.[^.]+$/,'').toLowerCase(),path.replace(/^\/public\//,'/')]));
export const involvementCards=[
  {id:'careers',title:'Careers',tagline:'Find Purpose in Your Work.',description:'Explore jobs and internships where your skills can contribute to meaningful social initiatives.',action:'Explore Jobs & Internships',href:'#connect'},
  {id:'volunteer',title:'Volunteer',tagline:'Your Time Can Make a Difference.',description:'Join the BJS volunteer network and support initiatives that bring positive change to the community and nation.',action:'Become A Volunteer',href:'#connect'},
  {id:'collaborate',title:'Collaborate With Us',tagline:'Collaborate for Greater Impact.',description:'Bring your expertise, resources or ideas to BJS and work together to address shared social challenges.',action:'Collaborate With Us',href:'#connect'},
  {id:'fellowship',title:'Fellowship',tagline:'Learn Through Action. Grow With Purpose.',description:'Develop your skills, gain practical experience and contribute to social development through fellowship opportunities at BJS.',action:'Submit Your Profile',href:'#connect'},
  {id:'donate',title:'Donate',tagline:'Help Meaningful Work Go Further.',description:'Support initiatives that strengthen families, empower communities and respond to pressing social needs.',action:'Donate Now',href:'#connect'},
].map(card=>({...card,image:assets.get(card.id),icon:assets.get(`icon-${card.id}`)}));

export const contactIcons={phone:assets.get('icon-phone'),email:assets.get('icon-email'),location:assets.get('icon-location')};
