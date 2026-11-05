const filenames = Object.keys(import.meta.glob('/public/assets/resources/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP,pdf,PDF}'));
const images = new Map();
const documents = new Map();
filenames.forEach(path => {
  const name = path.split('/').pop();
  (/\.pdf$/i.test(name) ? documents : images).set(name.replace(/\.[^.]+$/, '').toLowerCase(), path.replace(/^\/public\//, '/'));
});
const asset = item => ({...item, image:images.get(item.id) || item.image, document:documents.get(item.id) || item.document});
export const resourcesIntro = 'Explore the stories, insights, publications and creative resources that showcase BJS initiatives, celebrate community impact and bring our mission of meaningful social change to life.';
export const articlesIntro = 'Ideas and insights that inspire change. Explore stories, perspectives and experiences on social development, community building and the issues that shape our society.';
export const mediaIntro = 'Our work, captured and shared. Discover BJS through videos, press coverage and photographs showcasing our initiatives, people and impact.';
export const collateralIntro = 'Resources that bring our mission to life. Access BJS publications, campaign materials and communication assets that help share our vision and work.';
export const darpanCovers = [
  {id:'darpan-2026-10',title:'October 2026'},
  {id:'darpan-2026-09',title:'September 2026',document:'/assets/darpans/Sept%202026.pdf'},
  {id:'darpan-2026-08',title:'August 2026',image:'/assets/darpans/Cover/aug-2026.jpg'},
  {id:'darpan-2026-07',title:'July 2026',image:'/assets/darpans/Cover/jul-2026.jpg'},
  {id:'darpan-2026-06',title:'June 2026',image:'/assets/40d1f.png'},
].map(asset);
// The reference repeats the same article. Replace these entries when approved copy is supplied.
export const articles = [1,2,3].map(number => asset({id:`article-${number}`,title:'Creating Brighter Tomorrows Through Education',category:'WERC',date:'2026-10-12',image:'/assets/get-involved/fellowship.png'}));
export const mediaCards = [
  {id:'media-videos',title:'Videos',image:'/assets/7e865.png',href:'/resources/videos'},
  {id:'media-press',title:'Press Coverage',href:'/resources/press-coverage'},
  {id:'media-gallery',title:'Photo Gallery',href:'/resources/photo-gallery'},
].map(asset);
export const collateralCards = [
  {id:'collateral-reports',title:'Reports',href:'/resources/reports'},
  {id:'collateral-program-brochures',title:'Program Brochures',href:'/resources/program-brochures'},
  {id:'collateral-brochures',title:'Booklets',href:'/resources/booklets'},
].map(asset);

export const videoItems = [
  ['BJS Saksham', 'BJS Saksham 1.mp4'],
  ['DKJ Doctor', 'DKJ Doctor 2.mp4'],
  ['Humsafar Dobara Pune', 'Humsafar Dobara Pune 1.mp4'],
  ['JPA Case Success Story', 'JPA Case SuccesStory Testimonial 1.mp4'],
  ['Parinay Path Jaipur', 'Parinay Path - Jaipur 1.mp4'],
  ['Smart Girls Jahazpur', 'Smart Girls - Jahazpur RJ 1.mp4'],
].map(([title, filename], index) => ({id:`video-${index+1}`,title,video:`/assets/testimonials/${encodeURIComponent(filename)}`,image:'/assets/7e865.png'}));
export const collectionItems = {
  'press-coverage': [asset({id:'media-press',title:'BJS Community Initiatives in the Press'})],
  'photo-gallery': [asset({id:'media-gallery',title:'BJS Community Outreach'})],
  reports: [asset({id:'collateral-reports',title:'Dushkal Mukt Abhiyaan: Annual Progress Report 2019–2020'})],
  'program-brochures': [asset({id:'collateral-program-brochures',title:'You-Waah: National Youth Day'})],
  booklets: [asset({id:'collateral-brochures',title:'BJS Programmes and Initiatives'})],
};
