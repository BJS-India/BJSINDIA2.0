import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('artifacts', {recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];const errors=[];
const baseUrl=process.env.VERIFY_BASE_URL || 'http://localhost:5173';
for(const width of [1440,390]) {
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 for(const [name,path] of [['home','/'],['about','/about'],['work','/our-work']]) {
  await page.goto(baseUrl+path);await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.complete?Promise.resolve():new Promise(r=>{img.onload=r;img.onerror=r;}))));
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,rect:{width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height}}))}));
  console.log(`${name} at ${width}: height ${metrics.height}, scroll width ${metrics.scrollWidth}`);
  await page.screenshot({path:`artifacts/${name}-${width}.png`,fullPage:width>600,timeout:30000});
  results.push({name,width,...metrics});
 }
 if(width===390){await page.getByRole('button',{name:'Toggle navigation'}).click();await page.getByRole('link',{name:'About Us',exact:true}).first().click();if(!page.url().endsWith('/about'))throw new Error('Mobile navigation failed');}
 await page.goto(baseUrl+'/');await page.getByLabel('Email address').fill('test@example.com');await page.getByRole('button',{name:'SUBSCRIBE',exact:true}).click();await page.getByRole('status').filter({hasText:'Subscriptions will be available soon'}).waitFor();
 await page.goto(baseUrl+'/about');await page.getByRole('button',{name:'2020',exact:true}).click();await page.getByRole('heading',{name:'COVID-19 response'}).waitFor();
 await page.goto(baseUrl+'/our-work');await page.getByRole('button',{name:'Know More',exact:true}).first().click();await page.getByText('Learn more about Prarabdh').waitFor();
 await page.close();
}
await browser.close();await writeFile('artifacts/verification.json',JSON.stringify({results,errors},null,2));
const failures=results.filter(r=>r.scrollWidth>r.width||r.images.some(i=>!i.loaded));console.log(JSON.stringify({screens:results.map(r=>({name:r.name,width:r.width,scrollWidth:r.scrollWidth,height:r.height,imageCount:r.images.length,failedImages:r.images.filter(i=>!i.loaded)})),errors},null,2));
if(errors.length||failures.length)process.exitCode=1;

