import { aboutAssets as B } from './approvedAssets.js';

// Content transcribed from the supplied 16-award CSV.
// Add replacement PNG photos at photoPath; existing matching photos are fallbacks.
const records = [
  {
    "id": "1986-pune-yuva-gaurav-puraskar",
    "year": "1986",
    "title": "Pune Yuva Gaurav Puraskar",
    "description": "Shri Shantilal Muttha honored with Pune Yuva Gaurav Puraskar by Secretary,Minister of environment and forest Shri TN Shenshan in 1986, in presence of Smt. Sarala Muttha.",
    "photoPath": "/assets/awards/1986-pune-yuva-gaurav-puraskar.png",
    "fallbackKey": null
  },
  {
    "id": "1989-medi-foundation-award",
    "year": "1989",
    "title": "Medi Foundation Award",
    "description": "Shri Shantilal Muttha honored with Medi Foundation Award by President Shri Shankar Dyal Sharma in 1989.",
    "photoPath": "/assets/awards/1989-medi-foundation-award.png",
    "fallbackKey": "img36AwardsShankarDyalSharma21"
  },
  {
    "id": "1997-diwaliben-mohanlal-mehta-award",
    "year": "1997",
    "title": "Diwaliben Mohanlal Mehta Award",
    "description": "Shri Shantilal Muttha honoured with Diwaliben Mohanlal Mehta Award in 1997 by Chief Justice P. N. Bhagwati and H.H.The Dalai Lama.",
    "photoPath": "/assets/awards/1997-diwaliben-mohanlal-mehta-award.png",
    "fallbackKey": null
  },
  {
    "id": "2004-giants-recognition-award",
    "year": "2004",
    "title": "Giants Recognition Award",
    "description": "Shri Shantilal Muttha honored with Giants Recognition Award in 2004 by leading cinema personality Shri Amitabh Bachhan.",
    "photoPath": "/assets/awards/2004-giants-recognition-award.png",
    "fallbackKey": "img2005SgmGiantsAward22"
  },
  {
    "id": "2005-wango-world-association-of-ngos-international-award",
    "year": "2005",
    "title": "WANGO (World Association of NGOs) International Award",
    "description": "Shri Shantilal Muttha honored with WANGO (World Association of NGOs) international award at the hand of Chairman of WANGO, Mr. Taj Hamad for the year 2005 in recognition for BJS activities & contribution towards excellence.",
    "photoPath": "/assets/awards/2005-wango-world-association-of-ngos-international-award.png",
    "fallbackKey": "img2005WangoAward22"
  },
  {
    "id": "2010-qimpro-awards",
    "year": "2010",
    "title": "QIMPRO Awards",
    "description": "Shri Shantilal Muttha honored with QIMPRO Awards in 2010 for National Statesman of excellence in Education Practices.",
    "photoPath": "/assets/awards/2010-qimpro-awards.png",
    "fallbackKey": null
  },
  {
    "id": "2012-credai-lifetime-achievement-awards",
    "year": "2012",
    "title": "CREDAI Lifetime Achievement Awards",
    "description": "Shri Shantilal Muttha honored with CREDAI lifetime achievement awards at the hand of film star Kareena Kapoor in 2012, in presence of Smt. Sarala Muttha.",
    "photoPath": "/assets/awards/2012-credai-lifetime-achievement-awards.png",
    "fallbackKey": "img2012Dsc04092Credai20122"
  },
  {
    "id": "2012-tarun-kranti-puruskar",
    "year": "2012",
    "title": "Tarun Kranti Puruskar",
    "description": "Shri Shantilal Muttha honored with Tarun Kranti Puruskar at the hand of Muni Tarun Sagar for extraordinary work in the field of nation building in 2012.",
    "photoPath": "/assets/awards/2012-tarun-kranti-puruskar.png",
    "fallbackKey": null
  },
  {
    "id": "2016-jito-pride-of-pune-award",
    "year": "2016",
    "title": "Jito Pride of Pune Award",
    "description": "Shri Shantilal Muttha receiving ‘Jito Pride of Pune Award’ for Social Service to the Community at the hands of leading cinema personality Mr. Anupam Kher in 2016.",
    "photoPath": "/assets/awards/2016-jito-pride-of-pune-award.png",
    "fallbackKey": null
  },
  {
    "id": "2016-savitribai-phule-jeevan-sadhana-gaurav-puraskar",
    "year": "2016",
    "title": "Savitribai Phule ”Jeevan Sadhana Gaurav” Puraskar",
    "description": "Shri Shantilal Muttha honored with Savitribai Phule ”Jeevan Sadhana Gaurav” Puraskar at the hands of Hon.Smt.Pratibhatai Patil (President of India) in 2016.",
    "photoPath": "/assets/awards/2016-savitribai-phule-jeevan-sadhana-gaurav-puraskar.png",
    "fallbackKey": "imgSavitribaiPhuleAward61"
  },
  {
    "id": "2017-abp-maza-krutadnyata-puraskar",
    "year": "2017",
    "title": "ABP Maza Krutadnyata Puraskar",
    "description": "Shri Shantilal Muttha honored with ABP Maza Krutadnyata Puraskar by Shri Nitin Gadkari, Minister Road transport, Government of India in 2017.",
    "photoPath": "/assets/awards/2017-abp-maza-krutadnyata-puraskar.png",
    "fallbackKey": null
  },
  {
    "id": "2017-maharashtra-vaibhav-award",
    "year": "2017",
    "title": "Maharashtra Vaibhav Award",
    "description": "Shri Shantilal Muttha honored with Maharashtra Vaibhav Award in 2017 in the presence of Hon'ble Chief Minister Shri Devendra Fadnavis and Hon'ble Governor of Maharashtra Shri. C. Vidyasagar Rao.",
    "photoPath": "/assets/awards/2017-maharashtra-vaibhav-award.png",
    "fallbackKey": null
  },
  {
    "id": "2017-rajiv-gandhi-manav-seva-awards",
    "year": "2017",
    "title": "Rajiv Gandhi Manav Seva Awards",
    "description": "Shri Shantilal Muttha honored with Rajiv Gandhi Manav Seva Awards in 2017 for the service rendered in the field of welfare of children, by Hon'ble President of India, Shri Ramnath Kovind.",
    "photoPath": "/assets/awards/2017-rajiv-gandhi-manav-seva-awards.png",
    "fallbackKey": null
  },
  {
    "id": "2018-ahimsa-award",
    "year": "2018",
    "title": "Ahimsa Award",
    "description": "Shri Shantilal Muttha honored with Ahimsa Award in 2018 by Lord Bates, Minister of State for International Development at the House of Commons, London. Smt.Sarala Muttha also present in Award ceremony",
    "photoPath": "/assets/awards/2018-ahimsa-award.png",
    "fallbackKey": "img2717102018SocialWorkerShantilalMutthaWinsTheAhimsaAward20182"
  },
  {
    "id": "2018-lokmat-maharashtra-of-the-year",
    "year": "2018",
    "title": "Lokmat Maharashtra of the Year",
    "description": "Shri Shantilal Muttha honored with Lokmat Maharashtra of the Year awards 2018 by Actor-director and guru and theatre star,Shri Bharat Dabholkar and in presence of Minister of State for Social Justice and Empowerment Shri.Ramdas Athawale for his contribution towards Social work.",
    "photoPath": "/assets/awards/2018-lokmat-maharashtra-of-the-year.png",
    "fallbackKey": null
  },
  {
    "id": "2020-vasundara-gaurav-award",
    "year": "2020",
    "title": "Vasundara Gaurav Award",
    "description": "Shri Shantilal Muttha honored with Vasundara Gaurav Award for Social Work at Sangali in 2020.",
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
