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
  {id:'media-videos',title:'Videos',image:'/assets/7e865.png'},
  {id:'media-press',title:'Press Coverage'},
  {id:'media-gallery',title:'Photo Gallery'},
].map(asset);
export const collateralCards = [
  {id:'collateral-reports',title:'Reports'},
  {id:'collateral-program-brochures',title:'Program Brochures'},
  {id:'collateral-brochures',title:'Booklets'},
].map(asset);
