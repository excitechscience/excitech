const btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}));
const map={approach:'home',founder:'expertise',faqs:'expertise'};
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const id=map[e.target.id]||e.target.id;links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+id))}})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));

const track=document.getElementById('track'),dots=document.getElementById('dots'),n=track.children.length;
let i=0,timer;
for(let k=0;k<n;k++){const d=document.createElement('button');d.setAttribute('aria-label','Show book '+(k+1));d.onclick=()=>{go(k);play()};dots.appendChild(d)}
function go(k){i=(k+n)%n;track.style.transform='translateX(-'+i*100+'%)';[...dots.children].forEach((d,j)=>d.classList.toggle('on',j===i))}
function play(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(()=>go(i+1),3500)}
document.getElementById('prev').onclick=()=>{go(i-1);play()};
document.getElementById('next').onclick=()=>{go(i+1);play()};
const car=document.querySelector('.carousel');
car.addEventListener('mouseenter',()=>clearInterval(timer));car.addEventListener('mouseleave',play);
go(0);play();
