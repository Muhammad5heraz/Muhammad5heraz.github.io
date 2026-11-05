(function(){
  var d=document,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  d.documentElement.classList.remove('no-js');
  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  [].forEach.call(d.querySelectorAll('.rv'),function(el){io.observe(el)});
  /* count-up */
  function count(el){var to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,comma=el.dataset.comma==='1',t0=null;
    if(reduce){el.textContent=fmt(to);return}
    function fmt(v){var s=v.toFixed(dec);return comma?Number(s).toLocaleString('en-US',{minimumFractionDigits:dec}):s}
    (function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=fmt(to*e);if(p<1)requestAnimationFrame(step)})(performance.now())}
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}})},{threshold:.6});
  [].forEach.call(d.querySelectorAll('[data-count]'),function(el){cio.observe(el)});
  /* rail / top-bar highlight */
  var links=[].slice.call(d.querySelectorAll('[data-ch]')),secs=[].slice.call(d.querySelectorAll('section.ch'));
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var id=e.target.id;links.forEach(function(a){a.classList.toggle('on',a.dataset.ch===id)});
    var ac=getComputedStyle(e.target).getPropertyValue('--ac');d.documentElement.style.setProperty('--ac',ac);
    var on=d.querySelector('.top nav a.on');if(on&&on.scrollIntoView&&innerWidth<=860){var n=on.parentNode;n.scrollTo({left:on.offsetLeft-20,behavior:'smooth'})}}})},{threshold:.5});
  secs.forEach(function(s){so.observe(s)});
  /* clock (Faisalabad) */
  var ck=[].slice.call(d.querySelectorAll('[data-clock]'));
  function tick(){try{var p=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',hour12:true,timeZone:'Asia/Karachi'}).formatToParts(new Date()),h='',m='',a='';p.forEach(function(x){if(x.type==='hour')h=x.value;if(x.type==='minute')m=x.value;if(x.type==='dayPeriod')a=x.value});
    ck.forEach(function(el){el.textContent=el.dataset.clock==='big'?h+':'+m:'Faisalabad · '+h+':'+m+' '+a})}catch(e){}}
  tick();setInterval(tick,1000);
  /* email assembled in script */
  var addr=['anshshoukat','gmail.com'].join('@');
  [].forEach.call(d.querySelectorAll('[data-mail]'),function(a){var sub=a.dataset.mail?'?subject='+encodeURIComponent(a.dataset.mail):'';a.href='mailto:'+addr+sub;if(a.dataset.show)a.textContent=addr});
  /* toast + bibtex */
  var toast=d.getElementById('toast');
  function say(t){toast.textContent=t;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on')},2200)}
  [].forEach.call(d.querySelectorAll('[data-copy]'),function(b){b.addEventListener('click',function(){var t=d.getElementById(b.dataset.copy).textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){say('BibTeX copied')},function(){say('Copy not available')})})});
  /* vault filters */
  var fb=[].slice.call(d.querySelectorAll('.fl button')),cards=[].slice.call(d.querySelectorAll('.vc'));
  fb.forEach(function(b){b.addEventListener('click',function(){fb.forEach(function(x){x.classList.toggle('on',x===b)});cards.forEach(function(c){c.hidden=!(b.dataset.f==='all'||c.dataset.cat===b.dataset.f)})})});
  /* vault viewer */
  var dlg=d.getElementById('viewer');
  function openDoc(title,meta,f,state){
    d.getElementById('vt').textContent=title;d.getElementById('vs').textContent=meta;var body=d.getElementById('vb');
    if(f){body.innerHTML=/\.pdf$/i.test(f)?'<iframe src="'+f+'" title="'+title+'"></iframe>':'<img src="'+f+'" alt="'+title+'">'}
    else{var s=state==='r';body.innerHTML='<div class="pend"><div><h5>'+(s?'Available on request':'Document being added')+'</h5><p>'+(s?'This document contains personal identifiers, so it is released directly on request.':'The viewing copy of this document will be published here shortly.')+'</p><a href="#" data-mail="Document request: '+title.replace(/"/g,'')+'">Request it by email</a></div></div>';
      var a=body.querySelector('[data-mail]');a.href='mailto:'+addr+'?subject='+encodeURIComponent(a.dataset.mail)}
    dlg.showModal()}
  window.__openDoc=openDoc;
  cards.forEach(function(c){c.addEventListener('click',function(){openDoc(c.dataset.title,c.dataset.meta,c.dataset.file,c.dataset.state)})});
  d.getElementById('vx').addEventListener('click',function(){dlg.close()});dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  /* dust in the hero beam */
  var cv=d.getElementById('dust');if(cv&&!reduce){var h=d.getElementById('profile'),x=cv.getContext('2d'),W,H,dpr=Math.min(devicePixelRatio||1,2),M=[],vis=true;
    function size(){W=cv.width=h.clientWidth*dpr;H=cv.height=h.clientHeight*dpr}size();addEventListener('resize',size);
    for(var k=0;k<44;k++)M.push({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.4,s:Math.random()*.00006+.00002,p:Math.random()*6.28});
    new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(h);
    (function loop(t){if(vis){x.clearRect(0,0,W,H);M.forEach(function(m){m.y-=m.s*16;m.x+=Math.sin(t/3000+m.p)*.00006;if(m.y<-.02){m.y=1.02;m.x=Math.random()}var a=(.25+.35*Math.sin(t/900+m.p))*Math.min(1,m.x*1.6);x.fillStyle='rgba(243,201,139,'+Math.max(0,a)+')';x.beginPath();x.arc(m.x*W,m.y*H,m.r*dpr,0,6.28);x.fill()})}requestAnimationFrame(loop)})(0)}
})();
;(function(){
  var d=document,mq=matchMedia('(min-width:861px) and (min-height:560px)');
  function fit(){
    var els=d.querySelectorAll('section.ch .fit');
    for(var i=0;i<els.length;i++){var f=els[i];f.style.zoom='';
      if(!mq.matches)continue;
      var avail=innerHeight-Math.max(40,innerHeight*0.08),h=f.getBoundingClientRect().height;
      f.dataset.nat=Math.round(h);
      if(h>avail)f.style.zoom=(avail/h).toFixed(3);}
  }
  window.__fit=fit;
  addEventListener('resize',fit);addEventListener('load',fit);
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(fit);
  fit();
  d.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.fl button'))setTimeout(fit,0)});
})();
;(function(){
  var d=document,pop=d.getElementById('pop'),card=pop.querySelector('.pop-card'),inn=d.getElementById('pop-in'),DET={},last=null,open=false,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  try{DET=JSON.parse(d.getElementById('det').textContent)}catch(e){}
  function E(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  var i;function P(h){return h.replace('>',' style="--i:'+(i++)+'">')}
  function render(k){var x=DET[k];if(!x)return false;i=0;var L=[],R=[];
    L.push(P('<div class="pk">'+E(x.k)+'</div>'),P('<h3 id="pop-t">'+E(x.t)+'</h3>'));
    if(x.sub)L.push(P('<p class="psub">'+E(x.sub)+'</p>'));
    if(x.role)L.push(P('<div class="prole"><b>Role and contribution</b><p>'+E(x.role)+'</p></div>'));
    var two=!!x.flow&&x.flow.length>3;
    var flow=x.flow?P('<ol class="pflow">'+x.flow.map(function(s,n){return '<li><span class="n">'+(n+1)+'</span><div><h4>'+E(s[0])+'</h4><p>'+E(s[1])+'</p>'+(s[2]?'<span class="o">'+E(s[2])+'</span>':'')+'</div></li>'}).join('')+'</ol>'):'';
    var pts=x.pts?P('<ul class="plist">'+x.pts.map(function(t){return '<li>'+E(t)+'</li>'}).join('')+'</ul>'):'';
    var chips=x.chips?P('<div class="pchips">'+x.chips.map(function(t){return '<span>'+E(t)+'</span>'}).join('')+'</div>'):'';
    var facts=x.facts?P('<div class="pfacts">'+x.facts.map(function(f){return '<div><small>'+E(f[0])+'</small><span>'+E(f[1])+'</span></div>'}).join('')+'</div>'):'';
    var docs=(x.links||x.docs)?P('<div class="pdocs"><small>Documents</small>'+(x.links||[]).map(function(l){return '<a class="pdoc go" href="'+E(l[1])+'" target="_blank" rel="noopener">'+E(l[0])+'</a>'}).join('')+(x.docs||[]).map(function(o){var f=/^docs\//.test(o[2]||'')?o[2]:'';return '<button class="pdoc" data-t="'+E(o[0])+'" data-m="'+E(o[1])+'" data-f="'+E(f)+'" data-s="'+(f?'v':(o[2]||'p'))+'">View document <em>'+E(o[0])+'</em></button>'}).join('')+'</div>'):'';
    if(two){L.push(facts,docs);R.push(flow,pts);inn.className='pop-in two';inn.innerHTML='<div class="col">'+L.join('')+'</div><div class="col">'+R.join('')+'</div>'}
    else{L.push(flow,pts,chips,facts,docs);inn.className='pop-in';inn.innerHTML=L.join('')}
    card.classList.toggle('wide',two);return true}
  function show(el){var k=el.dataset.d;if(!render(k))return;last=el;open=true;
    var cs=getComputedStyle(el).getPropertyValue('--ac').trim()||getComputedStyle(el.closest('section')).getPropertyValue('--ac').trim()||'#F3C98B';
    pop.style.setProperty('--pc',cs);card.scrollTop=0;
    var r=el.getBoundingClientRect();pop.style.setProperty('--ox',(r.left+r.width/2)+'px');pop.style.setProperty('--oy',(r.top+r.height/2)+'px');
    d.documentElement.classList.add('pop-open');pop.classList.add('on');pop.setAttribute('aria-hidden','false');
    if(!reduce&&card.animate){var c=card.getBoundingClientRect(),t=Math.max(0,r.top-c.top),l=Math.max(0,r.left-c.left),b=Math.max(0,c.bottom-r.bottom),rr=Math.max(0,c.right-r.right);
      card.animate([{clipPath:'inset('+t+'px '+rr+'px '+b+'px '+l+'px round 18px)',opacity:.2,transform:'scale(.985)'},{clipPath:'inset(0px 0px 0px 0px round 26px)',opacity:1,transform:'none'}],{duration:720,easing:'cubic-bezier(.2,.85,.15,1)'})}
    setTimeout(function(){var x=d.getElementById('pop-x');x&&x.focus({preventScroll:true})},60)}
  function hide(){if(!open)return;open=false;
    var fin=function(){pop.classList.remove('on');pop.setAttribute('aria-hidden','true');d.documentElement.classList.remove('pop-open');if(last)last.focus({preventScroll:true})};
    if(!reduce&&card.animate&&last){var r=last.getBoundingClientRect(),c=card.getBoundingClientRect(),t=Math.max(0,r.top-c.top),l=Math.max(0,r.left-c.left),b=Math.max(0,c.bottom-r.bottom),rr=Math.max(0,c.right-r.right);
      card.animate([{clipPath:'inset(0 0 0 0 round 26px)',opacity:1},{clipPath:'inset('+t+'px '+rr+'px '+b+'px '+l+'px round 18px)',opacity:0}],{duration:420,easing:'cubic-bezier(.5,0,.8,.4)'}).onfinish=fin}else fin()}
  d.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('[data-d]');
    if(t&&!pop.contains(e.target)){var inner=e.target.closest('a,button');if(inner&&t.contains(inner)&&inner!==t)return;show(t);return}
    if(open&&(e.target.classList.contains('pop-bg')||e.target.closest('#pop-x')))hide();
    var db=e.target.closest&&e.target.closest('.pdoc[data-t]');if(db&&window.__openDoc)window.__openDoc(db.dataset.t,db.dataset.m,db.dataset.f||'',db.dataset.s)});
  d.addEventListener('keydown',function(e){
    if(open&&e.key==='Escape'&&!d.getElementById('viewer').open){e.preventDefault();hide()}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-d]')){e.preventDefault();show(e.target)}});
})();

;(function(){var t=0;document.addEventListener('pointermove',function(e){var el=e.target.closest&&e.target.closest('.card,.vc,.s .t,.r.f,.pfacts div');if(!el||t)return;t=1;requestAnimationFrame(function(){t=0;var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})},{passive:true})})();
;(function(){
  var d=document,de=d.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var sun=d.getElementById('sun'),glow=d.getElementById('glow'),pr=d.getElementById('prog');
  /* scroll progress */
  var tk=0;function sp(){tk=0;var m=de.scrollHeight-innerHeight;de.style.setProperty('--sp',m>0?Math.min(1,scrollY/m):0)}
  addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(sp)}},{passive:true});sp();
  /* sun takes each chapter's colour */
  if(sun){var secs=[].slice.call(d.querySelectorAll('section.ch'));
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var c=getComputedStyle(e.target).getPropertyValue('--ac').trim();if(c)sun.style.setProperty('--sunc',c)}})},{threshold:.5});
    secs.forEach(function(s){so.observe(s)})}
  if(reduce||!fine)return;
  /* pointer: sun parallax + ambient light + card tilt + magnetic buttons */
  var px=0,py=0,gx=0,gy=0,fr=0,tgt=null;
  addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;tgt=e.target;if(!fr){fr=1;requestAnimationFrame(tick)}},{passive:true});
  d.addEventListener('pointerleave',function(){if(glow)glow.classList.remove('on')});
  function tick(){fr=0;
    de.style.setProperty('--px',(px/innerWidth-.5).toFixed(3));de.style.setProperty('--py',(py/innerHeight-.5).toFixed(3));
    if(glow){glow.classList.add('on');glow.style.setProperty('--gx',px+'px');glow.style.setProperty('--gy',py+'px')}
    var t=tgt&&tgt.closest?tgt.closest('.card[data-d],.vc,.s .t,.r.f'):null;
    if(t&&!t.closest('#pop')){var r=t.getBoundingClientRect(),x=(px-r.left)/r.width-.5,y=(py-r.top)/r.height-.5;
      t.style.setProperty('--ry',(x*7).toFixed(2)+'deg');t.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')}
    var b=tgt&&tgt.closest?tgt.closest('.btn'):null;
    if(b){var q=b.getBoundingClientRect();b.style.transform='translate('+((px-q.left-q.width/2)*.18).toFixed(1)+'px,'+((py-q.top-q.height/2)*.28).toFixed(1)+'px)'}
  }
  d.addEventListener('pointerout',function(e){var t=e.target.closest&&e.target.closest('.card[data-d],.vc,.s .t,.r.f');if(t&&!t.contains(e.relatedTarget)){t.style.removeProperty('--rx');t.style.removeProperty('--ry')}
    var b=e.target.closest&&e.target.closest('.btn');if(b&&!b.contains(e.relatedTarget))b.style.transform=''});
})();
;(function(){
  var d=document,kp,inp,list,items=[],sel=0,open=false,last=null;
  function txt(e){var h=e.querySelector('h3,h4,.nm');return (h?h.textContent:e.textContent).replace(/\s+/g,' ').trim()}
  function collect(){var out=[];
    [].forEach.call(d.querySelectorAll('.rail a[data-ch]'),function(a){out.push({t:a.textContent.replace(/^\d+/,'').trim(),k:'Chapter',go:function(){location.hash=a.getAttribute('href')}})});
    [].forEach.call(d.querySelectorAll('[data-d]'),function(e){var s=e.closest('section.ch'),c=s?s.id:'';out.push({t:txt(e),k:c,go:function(){e.scrollIntoView({block:'center'});setTimeout(function(){e.click()},350)}})});
    [].forEach.call(d.querySelectorAll('.vc'),function(e){out.push({t:e.dataset.title,k:'Document',go:function(){if(window.__openDoc)window.__openDoc(e.dataset.title,e.dataset.meta,e.dataset.file,'v')}})});
    return out}
  function render(q){q=(q||'').toLowerCase().trim();var all=items;var r=q?all.filter(function(i){return (i.t+' '+i.k).toLowerCase().indexOf(q)>-1}):all.filter(function(i){return i.k==='Chapter'});
    r=r.slice(0,8);sel=0;list.innerHTML=r.map(function(i,n){return '<li data-n="'+n+'"'+(n?'':' class="on"')+'><b>'+i.t.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</b><span>'+i.k+'</span></li>'}).join('')||'<li class="none">No match</li>';list._r=r}
  function mark(){[].forEach.call(list.children,function(li,n){li.classList.toggle('on',n===sel)});var on=list.children[sel];if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest'})}
  function run(n){var i=list._r&&list._r[n];if(!i)return;close();setTimeout(i.go,60)}
  function build(){kp=d.createElement('div');kp.id='kp';kp.setAttribute('role','dialog');kp.setAttribute('aria-label','Search the portfolio');kp.hidden=true;
    kp.innerHTML='<div class="kp-card"><input id="kp-in" type="text" placeholder="Jump to a chapter, paper, role, skill or document" autocomplete="off" spellcheck="false" aria-label="Search"><ul id="kp-l"></ul><div class="kp-h"><span>↑↓ move</span><span>↵ open</span><span>esc close</span></div></div>';d.body.appendChild(kp);
    inp=d.getElementById('kp-in');list=d.getElementById('kp-l');
    inp.addEventListener('input',function(){render(inp.value)});
    inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,(list._r||[]).length-1);mark()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);mark()}else if(e.key==='Enter'){e.preventDefault();run(sel)}});
    list.addEventListener('click',function(e){var li=e.target.closest('li[data-n]');if(li)run(+li.dataset.n)});
    kp.addEventListener('mousedown',function(e){if(e.target===kp)close()})}
  function show(){if(open)return;if(!kp)build();items=collect();last=d.activeElement;kp.hidden=false;open=true;inp.value='';render('');requestAnimationFrame(function(){kp.classList.add('on');inp.focus()})}
  function close(){if(!open)return;open=false;kp.classList.remove('on');setTimeout(function(){kp.hidden=true},200);if(last&&last.focus)try{last.focus()}catch(e){}}
  d.addEventListener('keydown',function(e){var typing=/^(input|textarea|select)$/i.test((e.target.tagName||''));
    if((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)){e.preventDefault();open?close():show()}
    else if(e.key==='/'&&!typing&&!open&&!d.getElementById('pop').classList.contains('on')){e.preventDefault();show()}
    else if(e.key==='Escape'&&open){e.preventDefault();close()}});
  var b=d.createElement('button');b.id='kp-b';b.type='button';b.innerHTML='Search <kbd>/</kbd>';b.setAttribute('aria-label','Search the portfolio');b.addEventListener('click',show);d.body.appendChild(b);
})();
