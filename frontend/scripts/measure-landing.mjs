import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report=[];
const expected={
 '.sp-hero h1':{x:98,y:181,fontSize:54},
 '.sp-hero h1 strong':{x:98,y:304,fontSize:110},
 '.sp-hero-copy>p':{x:98,y:468,width:520},
 '.sp-hero-actions':{x:98,y:587},
 '.sp-darpan-art':{x:130,y:764,width:520,height:223},
 '.sp-programme-card':{x:98,y:1113,width:304,height:427},
 '.sp-programme-body h3':{x:123,y:1366,fontSize:26},
 '.sp-programme-note':{x:98,y:1582,height:109},
 '.sp-impact h2':{x:98,y:1937,fontSize:54},
 '.sp-impact-tabs':{x:610,y:1901,width:732,height:43},
 '.sp-impact-metric':{x:610,y:1992,width:160},
 '.sp-presence':{y:2351,height:544},
 '.sp-presence h2':{x:98,y:2496},
 '.sp-testimonials h2':{x:98,y:3032},
 '.sp-testimonial-track article':{x:98,y:3166,width:269,height:395},
 '.sp-stories':{y:3640,height:838},
 '.sp-stories h2':{x:98,y:3785},
 '.sp-story-main':{y:3929,width:709,height:449},
 '.sp-footer':{y:4858,height:438},
};
const failures=[];
for(const width of [1440,1366,390]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
 await page.goto(process.env.VERIFY_BASE_URL||'http://localhost:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const metrics=await page.evaluate(()=>{const selectors=['.sp-header','.sp-hero','.sp-hero h2','.sp-hero h2 strong','.sp-hero-copy>p','.sp-hero-actions','.sp-hero-mosaic','.sp-newsletter','.sp-darpan-art','.sp-newsletter-content','.sp-programmes','.sp-programmes .sp-kicker','.sp-programme-track','.sp-programme-card','.sp-programme-body h3','.sp-programme-note','.sp-impact','.sp-impact h2','.sp-impact-tabs','.sp-impact-metric','.sp-presence','.sp-presence h2','.sp-stats','.sp-testimonials','.sp-testimonials h2','.sp-testimonial-track','.sp-testimonial-track article','.sp-stories','.sp-stories h2','.sp-story-main','.sp-partners','.sp-footer','.sp-copyright'];return {width:innerWidth,height:document.documentElement.scrollHeight,scrollWidth:document.documentElement.scrollWidth,elements:selectors.map(selector=>{const el=document.querySelector(selector);const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{selector,x:r.x,y:r.y+scrollY,width:r.width,height:r.height,fontSize:s.fontSize,lineHeight:s.lineHeight,scrollLeft:el.scrollLeft};})};});
 report.push(metrics);
 if(width>=1024){
  const scale=Math.min(1,width/1440);
  for(const [selector,properties] of Object.entries(expected)){
   const actual=metrics.elements.find(el=>el.selector===selector);
   for(const [property,value] of Object.entries(properties)){
    if(Math.abs(parseFloat(actual[property])-value*scale)>0.75)failures.push({width,selector,property,expected:value*scale,actual:actual[property]});
   }
  }
  if(Math.abs(metrics.height-5296*scale)>1)failures.push({width,expectedHeight:5296*scale,actualHeight:metrics.height});
 }
 await page.screenshot({path:`artifacts/landing-spacing-${width}.png`,fullPage:width>600,timeout:60000});
 console.log(JSON.stringify(metrics));await page.close();
}
await writeFile('artifacts/landing-spacing.json',JSON.stringify({report,failures},null,2));await browser.close();
console.log(JSON.stringify({measurementFailures:failures}));if(failures.length)process.exitCode=1;
