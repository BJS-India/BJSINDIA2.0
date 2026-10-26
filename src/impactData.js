import { landingAssets as L } from './approvedAssets';

const photos = [L.imgImage9,L.imgImage10,L.imgImage12,L.imgImage11];
const cards = (items, images = photos) => items.map(([value,label],index)=>({value,label,image:images[index],photoIndex:index}));

export const impactProgrammes = [
  {title:'Blue Roots',background:'#cdeaff',color:'#00508b',cards:cards([
    ['14,204+','Water Bodies\nRejuvenated'],['24860+','Direct Beneficiaries'],
    ['10.74','Million Cubic Metres\nEarth Excavated'],['10,833+','Crore litres of additional\nwater storage\ncapacity created'],
  ])},
  {title:'WERC',background:'#ffffbd',color:'#dfa600',cards:cards([
    ['320','flood-affected\nstudents'],['20','Districts Covered'],['206','Talukas Reached'],['320','Total Students\nSupported'],
  ],[]).map((card,index)=>({...card,exportImage:`/assets/werc-${index+1}.png`}))},
  {title:'Disaster Response',background:'#fff6df',color:'#ff6b00',cards:cards([
    ['30+','Years of Disaster\nResponse Initiatives'],['1200','Childrens\nRehabilitated after\nLatur Earthquake'],
    ['368','Schools Rebuilt\nafter Gujarat\nEarthquake'],['1500','lives offered with\nsafe shelter after\nKashmir Earthquake'],
  ])},
  {title:'Plastic Surgery',background:'#ddffde',color:'#078510',cards:cards([
    ['557','Total Camps'],['34062','No. of Patients\nTreated'],['10.88+','No. of Surgeries\nPerformed'],
  ])},
  {title:'Manthan',background:'#eadcff',color:'#5533d6',cards:cards([
    ['7','Total States\nCovered'],['4,344','No. of Jain\nFamilies Served'],['38','Total Locations\nReached'],['73','No. of Villages\nVisited'],
  ])},
  {title:'JPA',background:'#ffe8d4',color:'#f45100',cards:cards([
    ['138','Total Cases'],['96','Total Cases Closed'],['35','Divorce Settlement'],['42','Cases in-process'],
  ],['/assets/JPA-1.png','/assets/JPA-2.png','/assets/JPA-3.png','/assets/JPA-4.png'])},
  {title:'CCB',background:'#ddfaff',color:'#0799bc',cards:cards([
    ['5','Total Trainings'],['594','Total Participant\nRegistered'],['206','Total Registered\nChapter'],['372','Participant\nAttended'],
  ])},
  {title:'Parinay Path',background:'#ffe5ee',color:'#91033e',cards:cards([
    ['14,374+','People Registered\n114: Female\n186: Male'],['167','Attended\n76: Female\n91: Male'],
  ])},
  {title:'Dil ka Jigsaw',background:'#ffe5e5',color:'#d90000',cards:cards([
    ['177','People Registered\n92: Female\n85: Male'],['161','Attended\n75: Female\n66: Male'],
  ])},
  {title:'Foundation Programs',background:'#fff4dd',color:'#e78100',cards:cards([
    ['1078','Total Programs'],['204','Total Vibrant\nChapters'],
  ])},
];
