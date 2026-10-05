const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;

/* mobile menu + active link */
const navUl=$('.nav ul');
$('.menu-btn')?.addEventListener('click',()=>navUl.classList.toggle('open'));
$$('.nav ul a').forEach(a=>{const f=location.pathname.split('/').pop()||'index.html';if(a.getAttribute('href')===f)a.classList.add('active')});

/* injected UI: progress bar, cursor glow, subpage blobs */
const bar=document.createElement('div');bar.id='progress';document.body.prepend(bar);
const glow=document.createElement('div');glow.id='glow';document.body.prepend(glow);
$$('.page-hero').forEach(p=>p.insertAdjacentHTML('afterbegin','<div class="blob b1"></div><div class="blob b3"></div><div class="grid-bg"></div>'));

/* price calculator (rates in USD per word — edit to your own pricing) */
const rates={'academic-5':0.024,'academic-2':0.035,'academic-1':0.045,'proof-5':0.018,'proof-2':0.028,'proof-1':0.038,'business-3':0.026,'business-1':0.040,'rush-4h':0.065,'rush-2h':0.080,'dev-14':0.035,'rewrite-3':0.050};
const sel=$('#q-service'),words=$('#q-words'),ppw=$('#q-ppw'),tot=$('#q-total');
function calc(){
  if(!sel)return;
  const r=rates[sel.value]||0,w=Math.max(0,parseInt(words.value)||0);
  ppw.textContent='$'+r.toFixed(3);tot.textContent='$'+(r*w).toFixed(2);
  tot.classList.add('pop');setTimeout(()=>tot.classList.remove('pop'),180);
}
sel&&[sel,words].forEach(e=>e.addEventListener('input',calc));calc();

$$('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();$('.msg',f).textContent='Thanks! This is a demo form — connect it to your email/backend.';
}));

/* scroll reveal with stagger */
const targets='.section-head,.card,.step,.compare .box,.faq details,.table-wrap,.note,.quote-box,.quote>div,.checks li,.stats-grid>div,.cta-band .container>*';
$$(targets).forEach(el=>{
  if(el.closest('.hscroll'))return;
  el.classList.add('rv');
  const sib=[...el.parentElement.children].filter(c=>c.matches(targets));
  el.style.setProperty('--d',Math.min(sib.indexOf(el),6)*.1+'s');
  if(el.matches('.compare .box:first-child'))el.classList.add('rl');
  if(el.matches('.compare .box:last-child'))el.classList.add('rr');
  if(el.matches('.stats-grid>div,.quote-box'))el.classList.add('rs');
});
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll?.('[data-count]').forEach(count);
  if(e.target.hasAttribute('data-count'))count(e.target);
  setTimeout(()=>e.target.classList.remove('rv'),1600);
}),{threshold:.15,rootMargin:'0px 0px -40px 0px'});
$$('.rv').forEach(el=>io.observe(el));

/* counters */
function count(el){
  if(el.dataset.done)return;el.dataset.done=1;
  const end=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now(),dur=1800;
  (function tick(t){const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,4);
    el.textContent=Math.round(end*e)+suf;if(p<1)requestAnimationFrame(tick)})(t0);
}

/* rotating hero word */
const rot=$('#rot');
if(rot){const w=['academics','researchers','businesses','authors','students'];let i=0;
  setInterval(()=>{i=(i+1)%w.length;rot.style.animation='none';rot.offsetWidth;rot.textContent=w[i];rot.style.animation=''},3200)}

/* header hide/show + progress + parallax + horizontal scroll (smoothed) */
const header=$('header'),hs=$('.hscroll'),track=$('.htrack'),hbar=$('.hbar i');
let lastY=0,mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my,cur=0;
function sizeH(){if(!hs)return;hs.style.height=(track.scrollWidth-innerWidth+innerHeight+120)+'px'}
addEventListener('resize',sizeH);addEventListener('load',sizeH);sizeH();
function frame(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${max>0?y/max:0})`;
  header.classList.toggle('scrolled',y>40);
  header.classList.toggle('hide',y>lastY&&y>300&&!navUl.classList.contains('open'));lastY=y;
  $$('[data-speed]').forEach(el=>el.style.transform=`translate3d(0,${y*el.dataset.speed}px,0)`);
  if(hs){
    const r=hs.getBoundingClientRect(),span=hs.offsetHeight-innerHeight;
    const target=Math.min(Math.max(-r.top/span,0),1);
    cur+=(target-cur)*.09;
    track.style.transform=`translate3d(${-cur*(track.scrollWidth-innerWidth)}px,0,0)`;
    hbar.style.transform=`scaleX(${cur})`;
  }
  gx+=(mx-gx)*.12;gy+=(my-gy)*.12;
  glow.style.transform=`translate(${gx}px,${gy}px)`;
  requestAnimationFrame(frame);
}
if(!reduce)requestAnimationFrame(frame);else{header.classList.add('scrolled')}

/* mouse: glow, hero parallax, card tilt, magnetic buttons */
if(fine&&!reduce){
  addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;glow.style.opacity=1;
    const cx=(e.clientX/innerWidth-.5),cy=(e.clientY/innerHeight-.5);
    $$('.fwrap').forEach(el=>{const d=+el.dataset.depth||20;el.style.transform=`translate(${-cx*d*2}px,${-cy*d*2}px)`});
  });
  $$('.card,.hcard,.quote-box').forEach(c=>{
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform=`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateY(-6px)`});
    c.addEventListener('mouseleave',()=>c.style.transform='');
  });
  $$('.btn').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });
}
