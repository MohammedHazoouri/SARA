const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];

/* bokeh water lights, like the harbor reflections */
const cv=$('#bokeh'),cx=cv.getContext('2d');let dots=[];
function size(){cv.width=innerWidth;cv.height=innerHeight;dots=Array.from({length:55},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:6+Math.random()*26,s:.1+Math.random()*.3,p:Math.random()*6,c:['242,184,201','217,183,122','169,195,222'][Math.floor(Math.random()*3)]}))}
size();addEventListener('resize',size);
(function draw(t){cx.clearRect(0,0,cv.width,cv.height);
 dots.forEach(d=>{const a=.08+.1*Math.sin(t/1200+d.p);d.y-=d.s;if(d.y<-40)d.y=cv.height+40;
  const g=cx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r);g.addColorStop(0,`rgba(${d.c},${a*2})`);g.addColorStop(1,`rgba(${d.c},0)`);
  cx.fillStyle=g;cx.beginPath();cx.arc(d.x,d.y,d.r,0,7);cx.fill()});requestAnimationFrame(draw)})(0);

/* gate */
function openSite(){const e=$('#envelope');e.classList.add('open');setTimeout(()=>{$('#gate').classList.add('out');$('#site').classList.remove('hidden');typeLoop();confetti(40)},900)}
$('#envelope').onclick=openSite;$('#envelope').onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openSite()};

/* typing */
const lines=['Happy greetings to my favorite girl.','Lana mood on, Mystic Falls on repeat.','Best friend. Style icon. Soso.'];
let li=0,ci=0,del=false;
function typeLoop(){const el=$('#typed'),w=lines[li];ci+=del?-1:1;el.textContent=w.slice(0,ci);
 let d=del?25:60;if(!del&&ci===w.length){del=true;d=1600}else if(del&&ci===0){del=false;li=(li+1)%lines.length;d=400}setTimeout(typeLoop,d)}

/* hero tilt */
const tilt=$('#tilt');
document.addEventListener('mousemove',e=>{const x=(e.clientX/innerWidth-.5)*14,y=(e.clientY/innerHeight-.5)*-14;tilt.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`});

/* confetti + sparkle trail */
function confetti(n=70){const ic=['✦','♡','☾','✧','🌸','🖤'];for(let i=0;i<n;i++){const s=document.createElement('span');s.className='conf';s.textContent=ic[i%ic.length];
 s.style.left=Math.random()*100+'vw';s.style.fontSize=12+Math.random()*20+'px';s.style.animationDelay=Math.random()*1.2+'s';s.style.color=['#f2b8c9','#d9b77a','#a9c3de'][i%3];document.body.appendChild(s);setTimeout(()=>s.remove(),4500)}}
$('#confettiBtn').onclick=()=>{confetti(90);alert2('Sending you a huge hug, Soso ♡')};
let last=0;document.addEventListener('mousemove',e=>{if(Date.now()-last<60)return;last=Date.now();const s=document.createElement('span');s.className='spark';s.textContent='✦';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.fontSize=8+Math.random()*10+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),900)});
function alert2(t){const d=document.createElement('div');d.textContent=t;Object.assign(d.style,{position:'fixed',bottom:'30px',left:'50%',transform:'translateX(-50%)',background:'#f6eef0',color:'#3a2230',padding:'.8rem 1.6rem',borderRadius:'30px',zIndex:100,fontFamily:'Cormorant Garamond',fontSize:'1.2rem',fontStyle:'italic'});document.body.appendChild(d);setTimeout(()=>d.remove(),2600)}

/* polaroids: flip + drag */
$$('.pola').forEach(p=>{$('.back p',p).textContent=p.dataset.back;let sx,sy,ox=0,oy=0,drag=false,moved=false;
 p.addEventListener('pointerdown',e=>{drag=true;moved=false;sx=e.clientX;sy=e.clientY;p.setPointerCapture(e.pointerId);p.style.zIndex=5;p.style.cursor='grabbing'});
 p.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;p.style.translate=`${ox+dx}px ${oy+dy}px`});
 p.addEventListener('pointerup',e=>{drag=false;p.style.cursor='grab';const m=/(-?[\d.]+)px (-?[\d.]+)px/.exec(p.style.translate||'');if(m){ox=+m[1];oy=+m[2]}if(!moved)p.classList.toggle('flip')})});

/* TVD flip */
$$('.card').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));

/* music */
const songs={'Lana Del Rey':['Blue Jeans','Summertime Sadness','Video Games','Young and Beautiful','Born to Die'],'Justin Bieber':['Peaches','Sorry','Ghost','Baby','Love Yourself']};
$$('.record').forEach(r=>r.onclick=()=>{const on=r.classList.contains('on');$$('.record').forEach(x=>x.classList.remove('on'));
 const pl=$('#player'),tr=$('#tracks');tr.innerHTML='';
 if(on){pl.classList.remove('go');$('#nowPlaying').textContent='Now spinning: nothing yet';return}
 r.classList.add('on');pl.classList.add('go');$('#nowPlaying').textContent=`Now spinning: ${r.dataset.title} · ${r.dataset.artist}`;
 songs[r.dataset.artist].forEach((s,i)=>{const sp=document.createElement('span');sp.textContent='♪ '+s;sp.style.animationDelay=i*.08+'s';tr.appendChild(sp)})});

/* vote */
let vs=5,vd=5;$$('.vbtns button').forEach(b=>b.onclick=()=>{b.dataset.v==='s'?vs++:vd++;const p=vs/(vs+vd)*100;$('#vs').style.width=p+'%';
 $('#voteMsg').textContent=b.dataset.v==='s'?'A romantic classic. Respect.':'Chaos is a lifestyle. Respect.'});

/* fashion mixer */
const slots=$$('.slot');slots.forEach(s=>{s._o=JSON.parse(s.dataset.opts);s._i=0;const b=$('b',s);b.textContent=s._o[0];
 const go=()=>{b.style.opacity=0;setTimeout(()=>{s._i=(s._i+1)%s._o.length;b.textContent=s._o[s._i];b.style.opacity=1;score()},220)};s.onclick=go});
const words=['Cute, but you can go bolder.','Effortless. Very Soso.','Main character energy!','Fashion week called. They want this look.'];
function score(){const v=Math.min(100,60+slots.reduce((a,s)=>a+(s._i===0?10:s._i*7),0)%41);$('#meterFill').style.width=v+'%';$('#verdict').textContent=`Style score ${v}%. ${words[Math.min(3,Math.floor((v-60)/10))]}`}
score();

/* reasons */
$$('.reasons button').forEach(b=>b.onclick=()=>{$('#reasonMsg').textContent=b.dataset.t;confetti(10)});
