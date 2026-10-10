const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;

/* mobile menu + active link */
const navUl=$('.nav ul'),menuBtn=$('.menu-btn');
let menuY=0;
const setMenu=(open)=>{if(!navUl)return;navUl.classList.toggle('open',open);menuBtn?.setAttribute('aria-expanded',open);menuY=scrollY};
const closeMenu=()=>{if(navUl?.classList.contains('open'))setMenu(false)};
if(navUl&&menuBtn){
  navUl.id||(navUl.id='site-nav');menuBtn.setAttribute('aria-controls',navUl.id);menuBtn.setAttribute('aria-expanded','false');
  menuBtn.addEventListener('click',()=>setMenu(!navUl.classList.contains('open')));
  navUl.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
  document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&navUl.classList.contains('open')){closeMenu();menuBtn.focus()}});
  addEventListener('scroll',()=>{if(Math.abs(scrollY-menuY)>40)closeMenu()},{passive:true});
}
$$('.nav ul a').forEach(a=>{const f=location.pathname.split('/').pop()||'index.html';if(a.getAttribute('href')===f)a.classList.add('active')});

/* injected UI: progress bar, cursor glow, subpage blobs */
const bar=document.createElement('div');bar.id='progress';document.body.prepend(bar);
const glow=document.createElement('div');glow.id='glow';document.body.prepend(glow);
$$('.page-hero').forEach(p=>p.insertAdjacentHTML('afterbegin','<div class="blob b1"></div><div class="blob b3"></div><div class="grid-bg"></div>'));

/* price calculator (rates in USD per word — edit to your own pricing) */
const rates={'academic-5':0.024,'academic-2':0.035,'academic-1':0.045,'proof-5':0.018,'proof-2':0.028,'proof-1':0.038,'business-3':0.026,'business-1':0.040,'rush-4h':0.065,'rush-2h':0.080,'dev-14':0.035,'rewrite-3':0.050};
/* currency: USD or INR (INR_RATE = rupees per 1 US dollar; keep in sync with PRICING in dashboard.html and verify-order) */
const INR_RATE=85;
const getCur=()=>{try{const c=localStorage.getItem('ce_currency');if(c==='USD'||c==='INR')return c}catch(e){}return /^Asia\/(Calcutta|Kolkata)$/.test(Intl.DateTimeFormat().resolvedOptions().timeZone||'')?'INR':'USD'};
let ccy=getCur();
const fmtMoney=(usd,c,dp)=>c==='INR'?'₹'+(usd*INR_RATE).toLocaleString('en-IN',{minimumFractionDigits:dp,maximumFractionDigits:dp}):'$'+usd.toFixed(dp);
const setCur=(c)=>{ccy=c;try{localStorage.setItem('ce_currency',c)}catch(e){}document.dispatchEvent(new Event('currencychange'))};

const sel=$('#q-service'),words=$('#q-words'),ppw=$('#q-ppw'),tot=$('#q-total'),curSel=$('#q-cur');
function calc(){
  if(!sel)return;
  const r=rates[sel.value]||0,w=Math.max(0,parseInt(words.value)||0);
  ppw.textContent=fmtMoney(r,ccy,ccy==='INR'?2:3);tot.textContent=fmtMoney(r*w,ccy,ccy==='INR'?0:2);
  tot.classList.add('pop');setTimeout(()=>tot.classList.remove('pop'),180);
}
sel&&[sel,words].forEach(e=>e.addEventListener('input',calc));
if(curSel){curSel.value=ccy;curSel.addEventListener('change',()=>setCur(curSel.value))}
document.addEventListener('currencychange',()=>{if(curSel)curSel.value=ccy;calc()});
calc();

/* pricing page: every element with data-usd shows its USD price in the chosen currency */
const priceCells=$$('[data-usd]'),curBtns=$$('[data-cur]');
function renderPrices(){
  priceCells.forEach(el=>el.textContent=fmtMoney(parseFloat(el.dataset.usd),ccy,ccy==='INR'?2:3));
  curBtns.forEach(b=>b.classList.toggle('on',b.dataset.cur===ccy));
}
curBtns.forEach(b=>b.addEventListener('click',()=>setCur(b.dataset.cur)));
document.addEventListener('currencychange',renderPrices);
renderPrices();

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
  setInterval(()=>{i=(i+1)%w.length;rot.style.animation='none';rot.offsetWidth;rot.textContent=w[i];rot.style.animation='wordin .6s cubic-bezier(.2,.7,.2,1)'},3200)}

/* header hide/show + progress + parallax + horizontal scroll (smoothed).
   The loop runs only while something is moving (scroll, mouse, easing) and reads layout once per resize, not every frame. */
const header=$('header'),hs=$('.hscroll'),track=$('.htrack'),hbar=$('.hbar i');
const speedEls=$$('[data-speed]'),fwraps=$$('.fwrap');
let lastY=0,mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my,cur=0,rafOn=false;
let docMax=0,hsTop=0,hsSpan=1,trackW=0;
/* on phones the services row is a native swipe carousel (see styles.css), so no scroll-driven track */
const phoneHs=matchMedia('(max-width:600px)');
const hsOn=()=>hs&&!phoneHs.matches;
function measure(){
  if(hs){hs.style.height=hsOn()?(track.scrollWidth-innerWidth+innerHeight+120)+'px':''}
  docMax=document.documentElement.scrollHeight-innerHeight;
  if(hs){hsTop=hs.getBoundingClientRect().top+scrollY;hsSpan=Math.max(1,hs.offsetHeight-innerHeight);trackW=track.scrollWidth-innerWidth}
}
function kick(){if(!rafOn&&!reduce){rafOn=true;requestAnimationFrame(frame)}}
function frame(){
  rafOn=false;
  const y=scrollY;let moving=false;
  bar.style.transform=`scaleX(${docMax>0?y/docMax:0})`;
  header.classList.toggle('scrolled',y>40);
  header.classList.toggle('hide',y>lastY&&y>300&&!navUl.classList.contains('open'));lastY=y;
  speedEls.forEach(el=>el.style.transform=`translate3d(0,${y*el.dataset.speed}px,0)`);
  if(hsOn()){
    const target=Math.min(Math.max((y-hsTop)/hsSpan,0),1);
    cur+=(target-cur)*.09;
    if(Math.abs(target-cur)>.0005)moving=true;else cur=target;
    track.style.transform=`translate3d(${-cur*trackW}px,0,0)`;
    hbar.style.transform=`scaleX(${cur})`;
  }
  gx+=(mx-gx)*.12;gy+=(my-gy)*.12;
  if(Math.abs(mx-gx)>.4||Math.abs(my-gy)>.4)moving=true;
  glow.style.transform=`translate(${gx}px,${gy}px)`;
  if(moving)kick();
}
addEventListener('scroll',kick,{passive:true});
addEventListener('resize',()=>{measure();kick()});
phoneHs.addEventListener?.('change',()=>{if(!hsOn()&&track){track.style.transform='';cur=0}measure();kick()});
addEventListener('load',()=>{measure();kick()});
if('ResizeObserver' in window)new ResizeObserver(()=>{measure();kick()}).observe(document.body);
measure();
if(!reduce)kick();else{header.classList.add('scrolled')}

/* mouse: glow, hero parallax, card tilt, magnetic buttons */
if(fine&&!reduce){
  addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;glow.style.opacity=1;kick();
    const cx=(e.clientX/innerWidth-.5),cy=(e.clientY/innerHeight-.5);
    fwraps.forEach(el=>{const d=+el.dataset.depth||20;el.style.transform=`translate(${-cx*d*2}px,${-cy*d*2}px)`});
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
