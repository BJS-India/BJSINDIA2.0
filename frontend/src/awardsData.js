import { aboutAssets as B } from './approvedAssets.js';

// Content transcribed from the supplied 16-award CSV.
// Add replacement PNG photos at photoPath; existing matching photos are fallbacks.
const records = [
  {
    "id": "1986-pune-yuva-gaurav-puraskar",
    "year": "1986",
    "title": "Pune Yuva Gaurav Puraskar",
    "description": "Presented by Shri T. N. Seshan.",
    "photoPath": "/assets/awards/1986-pune-yuva-gaurav-puraskar.png",
    "fallbackKey": null
  },
  {
    "id": "1989-medi-foundation-award",
    "year": "1989",
    "title": "Medi Foundation Award",
    "description": "Presented by President Shankar Dayal Sharma.",
    "photoPath": "/assets/awards/1989-medi-foundation-award.png",
    "fallbackKey": "img36AwardsShankarDyalSharma21"
  },
  {
    "id": "1997-diwaliben-mohanlal-mehta-award",
    "year": "1997",
    "title": "Diwaliben Mohanlal Mehta Award",
    "description": "Presented by Justice P. N. Bhagwati and His Holiness the Dalai Lama. ",
    "photoPath": "/assets/awards/1997-diwaliben-mohanlal-mehta-award.png",
    "fallbackKey": null
  },
  {
    "id": "2004-giants-recognition-award",
    "year": "2004",
    "title": "Giants Recognition Award",
    "description": "Presented by Amitabh Bachchan.",
    "photoPath": "/assets/awards/2004-giants-recognition-award.png",
    "fallbackKey": "img2005SgmGiantsAward22"
  },
  {
    "id": "2005-wango-world-association-of-ngos-international-award",
    "year": "2005",
    "title": "WANGO (World Association of NGOs) International Award",
    "description": "International recognition for BJS’s activities and contributions to excellence. ",
    "photoPath": "/assets/awards/2005-wango-world-association-of-ngos-international-award.png",
    "fallbackKey": "img2005WangoAward22"
  },
  {
    "id": "2010-qimpro-awards",
    "year": "2010",
    "title": "QIMPRO Awards",
    "description": "Recognised for excellence in education practices. ",
    "photoPath": "/assets/awards/2010-qimpro-awards.png",
    "fallbackKey": null
  },
  {
    "id": "2012-credai-lifetime-achievement-awards",
    "year": "2012",
    "title": "CREDAI Lifetime Achievement Awards",
    "description": "Presented by Kareena Kapoor. ",
    "photoPath": "/assets/awards/2012-credai-lifetime-achievement-awards.png",
    "fallbackKey": "img2012Dsc04092Credai20122"
  },
  {
    "id": "2012-tarun-kranti-puruskar",
    "year": "2012",
    "title": "Tarun Kranti Puruskar",
    "description": "Presented by Muni Tarun Sagar for extraordinary contributions to nation building. ",
    "photoPath": "/assets/awards/2012-tarun-kranti-puruskar.png",
    "fallbackKey": null
  },
  {
    "id": "2016-jito-pride-of-pune-award",
    "year": "2016",
    "title": "Jito Pride of Pune Award",
    "description": "Recognised for social service to the community; presented by Anupam Kher. ",
    "photoPath": "/assets/awards/2016-jito-pride-of-pune-award.png",
    "fallbackKey": null
  },
  {
    "id": "2016-savitribai-phule-jeevan-sadhana-gaurav-puraskar",
    "year": "2016",
    "title": "Savitribai Phule ”Jeevan Sadhana Gaurav” Puraskar",
    "description": "Presented by Smt. Pratibha Patil. ",
    "photoPath": "/assets/awards/2016-savitribai-phule-jeevan-sadhana-gaurav-puraskar.png",
    "fallbackKey": "imgSavitribaiPhuleAward61"
  },
  {
    "id": "2017-abp-maza-krutadnyata-puraskar",
    "year": "2017",
    "title": "ABP Maza Krutadnyata Puraskar",
    "description": "Presented by Union Minister Nitin Gadkari.",
    "photoPath": "/assets/awards/2017-abp-maza-krutadnyata-puraskar.png",
    "fallbackKey": null
  },
  {
    "id": "2017-maharashtra-vaibhav-award",
    "year": "2017",
    "title": "Maharashtra Vaibhav Award",
    "description": "Honoured in the presence of Maharashtra Chief Minister Devendra Fadnavis and Governor C. Vidyasagar Rao. ",
    "photoPath": "/assets/awards/2017-maharashtra-vaibhav-award.png",
    "fallbackKey": null
  },
  {
    "id": "2017-rajiv-gandhi-manav-seva-awards",
    "year": "2017",
    "title": "Rajiv Gandhi Manav Seva Awards",
    "description": "Honoured by President Ram Nath Kovind for his contribution to children’s welfare. ",
    "photoPath": "/assets/awards/2017-rajiv-gandhi-manav-seva-awards.png",
    "fallbackKey": null
  },
  {
    "id": "2018-ahimsa-award",
    "year": "2018",
    "title": "Ahimsa Award",
    "description": "Presented by Lord Bates at the House of Commons, London.",
    "photoPath": "/assets/awards/2018-ahimsa-award.png",
    "fallbackKey": "img2717102018SocialWorkerShantilalMutthaWinsTheAhimsaAward20182"
  },
  {
    "id": "2018-lokmat-maharashtra-of-the-year",
    "year": "2018",
    "title": "Lokmat Maharashtra of the Year",
    "description": "Recognised for his contribution to social work.",
    "photoPath": "/assets/awards/2018-lokmat-maharashtra-of-the-year.png",
    "fallbackKey": null
  },
  {
    "id": "2020-vasundara-gaurav-award",
    "year": "2020",
    "title": "Vasundara Gaurav Award",
    "description": "Honoured for his contribution to social work at Sangli.",
    "photoPath": "/assets/awards/2020-vasundara-gaurav-award.png",
    "fallbackKey": null
  }
];

// Discover filenames only: public assets must be served from /assets, not imported.
const photoFiles = Object.keys(import.meta.glob('/public/assets/awards/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}'));
const photosById = new Map(photoFiles.map(path=>[
  path.split('/').pop().replace(/\.[^.]+$/,'').toLowerCase(),path.replace(/^\/public\//,'/'),
]));

export const awards = records.map(award=>({
  ...award,
  expectedPhotoPath:award.photoPath,
  photoPath:photosById.get(award.id.toLowerCase()) || null,
  fallbackImage:award.fallbackKey ? B[award.fallbackKey] : null,
}));
