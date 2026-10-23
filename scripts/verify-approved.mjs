import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const baseUrl=process.env.VERIFY_BASE_URL || 'http://localhost:5173';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];const results=[];
try {
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
  page.on('pageerror',error=>errors.push(error.message));
  for(const [name,path] of [['landing-sp','/'],['about-approved','/about']]){
   await page.goto(baseUrl+path,{waitUntil:'networkidle'});await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(img=>img.decode().catch(()=>{}))]));
   const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,images:[...document.images].map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height}))}));
   results.push({name,...result});console.log(`${name} ${width}: height=${result.height}, scrollWidth=${result.scrollWidth}, failed images=${result.images.filter(i=>!i.loaded).length}`);
   await page.screenshot({path:`artifacts/${name}-${width}.png`,timeout:30000});
   await page.locator(name==='landing-sp'?'#impact':'#leadership').scrollIntoViewIfNeeded();
   await page.screenshot({path:`artifacts/${name}-${width}-detail.png`,timeout:30000});
  }
  await page.goto(baseUrl+'/');
  const formVisible=await page.locator('.sp-newsletter form').evaluate(form=>[...form.querySelectorAll('input,button')].every(element=>{const rect=element.getBoundingClientRect();return rect.left>=0&&rect.right<=innerWidth;}));
  if(!formVisible)throw new Error(`Newsletter controls clipped at ${width}px`);
  await page.getByRole('tab',{name:'WERC',exact:true}).click();await page.getByRole('tabpanel',{name:'WERC',exact:true}).getByRole('img',{name:'320 flood-affected students',exact:true}).waitFor();
  await page.getByRole('tab',{name:'Blue Roots',exact:true}).click();await page.getByRole('tabpanel').getByText('14,204+', {exact:true}).waitFor();
  await page.getByLabel('Email or WhatsApp number').fill('test@example.com');await page.getByRole('button',{name:'SUBSCRIBE',exact:true}).click();await page.getByRole('status').filter({hasText:'Subscriptions will be available soon'}).waitFor();
  if(width===390){await page.getByRole('button',{name:'Toggle navigation'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'About Us',exact:true}).click();await page.getByRole('heading',{name:'Who We Are',exact:true}).waitFor();}else await page.goto(baseUrl+'/about');
  await page.getByRole('button',{name:'1985',exact:true}).click();await page.getByRole('button',{name:'1985',exact:true}).getAttribute('aria-pressed').then(value=>{if(value!=='true')throw new Error('Journey selection failed');});
  await page.locator('.sp-person-more').first().click();await page.getByText('For further information,').waitFor();
  await page.close();
 }
}finally{await browser.close();}
await writeFile('artifacts/approved-verification.json',JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({errors,screens:results.map(r=>({name:r.name,width:r.width,height:r.height,scrollWidth:r.scrollWidth,imageCount:r.images.length,failedImages:r.images.filter(i=>!i.loaded)}))},null,2));
if(errors.length||results.some(r=>r.scrollWidth>r.width||r.images.some(i=>!i.loaded)))process.exitCode=1;
