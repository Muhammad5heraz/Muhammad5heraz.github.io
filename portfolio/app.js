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
  function fitPop(){inn.style.zoom='';if(!matchMedia('(min-width:701px)').matches)return;
    var av=innerHeight*.94,z=1;for(var i=0;i<3;i++){var need=card.scrollHeight;if(need<=av+1)break;z=Math.max(.66,z*av/need);inn.style.zoom=z.toFixed(3)}}
  addEventListener('resize',function(){if(open)fitPop()});
  function show(el){var k=el.dataset.d;if(!render(k))return;last=el;open=true;
    var cs=getComputedStyle(el).getPropertyValue('--ac').trim()||getComputedStyle(el.closest('section')).getPropertyValue('--ac').trim()||'#F3C98B';
    pop.style.setProperty('--pc',cs);card.scrollTop=0;
    var r=el.getBoundingClientRect();pop.style.setProperty('--ox',(r.left+r.width/2)+'px');pop.style.setProperty('--oy',(r.top+r.height/2)+'px');
    d.documentElement.classList.add('pop-open');pop.classList.add('on');pop.setAttribute('aria-hidden','false');fitPop();
    if(!reduce&&card.animate){var c=card.getBoundingClientRect(),t=Math.max(0,r.top-c.top),l=Math.max(0,r.left-c.left),b=Math.max(0,c.bottom-r.bottom),rr=Math.max(0,c.right-r.right);
      card.animate([{clipPath:'inset('+t+'px '+rr+'px '+b+'px '+l+'px round 18px)',opacity:.2,transform:'scale(.985)'},{clipPath:'inset(0px 0px 0px 0px round 26px)',opacity:1,transform:'none'}],{duration:560,easing:'cubic-bezier(.22,1,.36,1)'})}
    setTimeout(function(){var x=d.getElementById('pop-x');x&&x.focus({preventScroll:true})},60)}
  function hide(){if(!open)return;open=false;
    var fin=function(){pop.classList.remove('on');pop.setAttribute('aria-hidden','true');d.documentElement.classList.remove('pop-open');if(last)last.focus({preventScroll:true})};
    if(!reduce&&card.animate&&last){var r=last.getBoundingClientRect(),c=card.getBoundingClientRect(),t=Math.max(0,r.top-c.top),l=Math.max(0,r.left-c.left),b=Math.max(0,c.bottom-r.bottom),rr=Math.max(0,c.right-r.right);
      card.animate([{clipPath:'inset(0 0 0 0 round 26px)',opacity:1},{clipPath:'inset('+t+'px '+rr+'px '+b+'px '+l+'px round 18px)',opacity:0}],{duration:320,easing:'cubic-bezier(.5,0,.8,.4)'}).onfinish=fin}else fin()}
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
;(function(){
  var d=document,mq=matchMedia('(max-width:860px)');
  var SEL=['#research .body','#publications .body','#education .body','#experience .body','#skills .body','#skills .row4','#awards .body','#certificates .body','#beyond .body','#vault .vg','#references .body'],STK=[];
  function dots(t){var n=t.children.length,vis=[];[].forEach.call(t.children,function(c){if(c.hidden)return;if(/(^| )(roles|awl)( |$)/.test(c.className))[].forEach.call(c.children,function(x){vis.push(x)});else vis.push(c)});
    var w=d.createElement('div');w.className='sdots';
    if(t.matches('#vault .vg')){t.after(w);return}
    for(var i=0;i<vis.length;i++)w.appendChild(d.createElement('i'));
    t.after(w);
    function upd(){var c=t.scrollLeft+t.clientWidth/2,best=0,bd=1e9;vis.forEach(function(el,i){var m=el.offsetLeft+el.offsetWidth/2,dd=Math.abs(m-c);if(dd<bd){bd=dd;best=i}});[].forEach.call(w.children,function(x,i){x.classList.toggle('on',i===best)})}
    t.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});upd()}
  var SECS=[],ALWAYS=['#research .body','#publications .body','#education .body','#experience .body','#skills .body','#skills .row4','#awards .body','#certificates .body','#beyond .body','#vault .vg','#references .body'];
  function reset(t){t.classList.remove('swipe','stkn','two','meas','dn');var n=t.nextElementSibling;if(n&&n.classList.contains('sdots'))n.remove()}
  function kids(t){var c=0;[].forEach.call(t.children,function(x){if(/(^| )(roles|awl)( |$)/.test(x.className))c+=x.children.length;else if(!x.hidden)c++});return c}
  function ok(ts){return ts.every(function(t){return t.scrollHeight<=t.clientHeight+2})}
  var GROUPS={'#publications .body':[[0,1],[2,3]],'#education .body':[[0],[1,2,3]],'#experience .body':[[0,1],[2,3,4]],'#skills .row4':[[0,1,2],[3,4,5],[6,7,8],[9]],'#awards .body':[[0,1],[2,3,4],[5,6]],'#beyond .body':[[0,1],[2,3],[4,5]],'#references .body':[[0,1],[2,3],[4]]};
  function group(t,spec){
    if(t.dataset.grp)return;
    var items=[];[].forEach.call(t.children,function(c){if(/(^| )(roles|awl)( |$)/.test(c.className)){[].forEach.call(c.children,function(x){x.classList.add('mv');items.push(x)})}else if(c.classList.contains('rnote')){}else items.push(c)});
    var rn=t.querySelector(':scope>.rnote');
    var frag=d.createDocumentFragment();
    spec.forEach(function(g){var w=d.createElement('div');w.className='slide'+(g.length>1?' dn':'');g.forEach(function(i){if(items[i])w.appendChild(items[i])});frag.appendChild(w)});
    [].slice.call(t.querySelectorAll(':scope>.roles,:scope>.awl')).forEach(function(e){e.remove()});
    t.appendChild(frag);if(rn)t.after(rn);
    t.dataset.grp=1;
  }
  function setup(){
    if(!mq.matches){return}
    ALWAYS.forEach(function(s){var t=d.querySelector(s);if(t){if(GROUPS[s])group(t,GROUPS[s]);reset(t);t.classList.add('swipe');dots(t)}});
    SECS.forEach(function(sec){
      var ts=sec.map(function(s){return d.querySelector(s)}).filter(Boolean);if(!ts.length)return;
      ts.forEach(reset);
      function tryMode(two,dn){ts.forEach(function(t){t.classList.remove('stkn','two','dn');t.classList.add('stkn','meas');if(dn)t.classList.add('dn');if(two&&kids(t)>=4)t.classList.add('two')});var r=ok(ts);ts.forEach(function(t){t.classList.remove('meas')});return r}
      if(tryMode(false))return;
      if(tryMode(true))return;
      if(tryMode(false,true))return;
      if(tryMode(true,true))return;
      ts.forEach(function(t){t.classList.remove('stkn','two','dn');t.classList.add('swipe');dots(t)});
    });
  }
  var rt;function rs(){clearTimeout(rt);rt=setTimeout(setup,120)}
  addEventListener('resize',rs);addEventListener('load',function(){setup();setTimeout(setup,900)});
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(setup);
  setup();mq.addEventListener&&mq.addEventListener('change',setup);
  var h=d.getElementById('profile');
  function hs(){d.documentElement.classList.toggle('hero',mq.matches&&scrollY<innerHeight*.5)}
  addEventListener('scroll',hs,{passive:true});hs();
  var tb=d.querySelector('.top b');if(tb)tb.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
})();
;(function(){
  var d=document,mq=matchMedia('(max-width:860px)');
  function lay(){
    var s=d.getElementById('profile'),f=d.querySelector('.fan'),bio=d.querySelector('#profile .bio'),cta=d.querySelector('#profile .cta');
    if(!s||!f||!bio||!cta)return;
    var tabs=[].slice.call(f.children);
    if(!mq.matches){f.removeAttribute('style');tabs.forEach(function(a){a.removeAttribute('style')});return}
    s.classList.remove('tight');
    function box(){var sr=s.getBoundingClientRect(),top=bio.getBoundingClientRect().bottom+14,bot=cta.getBoundingClientRect().top-12;return {sr:sr,top:top,bot:bot,ry:(bot-top-28)/2}}
    var b=box();
    if(b.ry<148){s.classList.add('tight');b=box()}
    var Ry=Math.min(200,Math.max(96,b.ry)),Rx=Math.min(innerWidth*.36,142),n=tabs.length,cy=(b.top+b.bot)/2-b.sr.top;
    f.style.top=cy.toFixed(1)+'px';f.style.setProperty('--Rx',Rx.toFixed(1)+'px');f.style.setProperty('--Ry',Ry.toFixed(1)+'px');
    tabs.forEach(function(a,k){var t=-.92+1.84*k/(n-1),x=Rx*Math.sqrt(1-t*t),y=Ry*t;a.style.setProperty('--x',x.toFixed(1)+'px');a.style.setProperty('--y',y.toFixed(1)+'px')});
  }
  var t;function q(){clearTimeout(t);t=setTimeout(lay,60)}
  addEventListener('resize',q);addEventListener('load',function(){lay();setTimeout(lay,1200)});
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(lay);
  lay();
})();

/* warm the document images when a popup opens, so "View document" is instant */
;(function(){var D=null,done={};function det(){if(D)return D;try{D=JSON.parse(document.getElementById('det').textContent)}catch(e){D={}}return D}
 document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-d]');if(!t)return;var k=t.dataset.d;if(done[k])return;done[k]=1;
  var go=function(){var o=det()[k],a=o&&o.docs;if(!a)return;a.forEach(function(x){var f=x[2]||x.f;if(f){var i=new Image();i.decoding='async';i.src=f}})};
  (window.requestIdleCallback||function(f){setTimeout(f,350)})(go)},true)})();

/* ===== build 37 · flip cards: heading on the front, details on the back, full story in the popup ===== */
;(function(){
 var d=document,SEL='#beyond .card[data-d],#awards .card[data-d],#education .card.e:not(.b)[data-d],#experience .ro[data-d],#skills .card[data-d],#references .card.rf[data-d],#publications .r[data-d]',
  DETAIL='p,.badges,.rtag,.v,.m,.tgz',AX=.38,PER=1100,
  reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,
  DET={};try{DET=JSON.parse(d.getElementById('det').textContent)}catch(e){}
 var cards=[].slice.call(d.querySelectorAll(SEL)),S=new Map();
 if(!cards.length||!Element.prototype.animate)return;
 function T(r,l,s,rx,rz){return 'perspective('+PER+'px) translateY('+l+'px) rotateX('+rx+'deg) rotateY('+r+'deg) rotateZ('+rz+'deg) scale('+s+')'}
 var KF=[{transform:T(0,0,1,0,0),offset:0},{transform:T(90,-10,.93,-9,-3.5),offset:.5},{transform:T(180,0,1,0,0),offset:1}];
 function esc(s){return String(s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
 function trunc(s,n){s=(s||'').replace(/\s+/g,' ').trim();if(s.length<=n)return s;s=s.slice(0,n);return s.slice(0,s.lastIndexOf(' '))+'…'}
 function build(c){
  var h=c.querySelector('h3'),lab=c.querySelector('.small'),title=(h||lab||{}).textContent||'';
  var all=[].slice.call(c.querySelectorAll(DETAIL)).filter(function(el,i,a){return !a.some(function(o){return o!==el&&o.contains(el)})});
  var fb=d.createElement('div');fb.className='fb';fb.setAttribute('aria-hidden','true');
  var k=d.createElement('div');k.className='fbk';k.textContent=title.replace(/\s+/g,' ').trim();if(k.textContent.length>46)k.classList.add('lg');fb.appendChild(k);
  var body=d.createElement('div');body.className='fbd';
  if(all.length){all.forEach(function(el){var cl=el.cloneNode(true);cl.classList.add('fbx');body.appendChild(cl);el.classList.add('fd')});c.classList.add('col')}
  else{var o=DET[c.dataset.d]||{},t=trunc(o.role||o.sub||'',170);if(t){var p=d.createElement('p');p.textContent=t;body.appendChild(p)}}
  fb.appendChild(body);
  var hint=d.createElement('div');hint.className='fbh';hint.innerHTML='<span class="hd">Full story</span><span class="ht">Tap again</span><i>↗</i>';fb.appendChild(hint);
  var gl=d.createElement('span');gl.className='gl';gl.setAttribute('aria-hidden','true');
  c.classList.add('fc');c.appendChild(fb);c.appendChild(gl);
  var disp=getComputedStyle(c).display;if(disp==='block')c.classList.add('fcb');
  if(c.matches('#skills .card'))c.classList.add('tile');
  S.set(c,{on:false,a:null,r:null,fb:fb,gl:gl});
 }
 function lock(){var had=[];cards.forEach(function(c){var s=S.get(c);if(!s)return;had.push(c.classList.contains('col'));c.classList.remove('col');c.style.minHeight=''});
  var hs=cards.map(function(c){var r=c.getBoundingClientRect(),z=c.offsetWidth?r.width/c.offsetWidth:1;return z>0?r.height/z:r.height});
  cards.forEach(function(c,i){var s=S.get(c);if(!s)return;
   if(had[i]){if(hs[i])c.style.minHeight=hs[i]+'px';c.classList.add('col')}
   var cs=getComputedStyle(c);s.fb.style.padding=cs.paddingTop+' '+cs.paddingRight+' '+cs.paddingBottom+' '+cs.paddingLeft;s.fb.style.borderRadius=cs.borderRadius;s.fb.classList.toggle('sm',hs[i]<150)})}
 function persp(c){var p=c.parentElement;if(p)p.classList.add('pv')}
 function set(c,v,fast){var s=S.get(c);if(!s||s.on===v)return;s.on=v;
  if(v){s.r=c.getBoundingClientRect();persp(c)}
  c.classList.toggle('on',v);
  if(!s.a){s.a=c.animate(KF,{duration:reduce?1:1000,easing:'cubic-bezier(.3,1.25,.45,1)',fill:'both'});s.a.pause();s.a.currentTime=0}
  var a=s.a;a.playbackRate=v?1:(fast?-2.4:-1.35);a.onfinish=null;a.play();
  a.onfinish=function(){if(!s.on){a.cancel();if(s.a===a)s.a=null}};
  if(v&&!reduce&&s.gl.animate)s.gl.animate([{transform:'translateX(-130%) skewX(-18deg)',opacity:0},{opacity:1,offset:.35},{transform:'translateX(130%) skewX(-18deg)',opacity:0}],{duration:900,easing:'cubic-bezier(.4,0,.2,1)'})}
 function clearAll(except,fast){cards.forEach(function(c){if(c!==except)set(c,false,fast)})}
 cards.forEach(build);lock();
 if(window.__FCTEST)window.__fc=function(v){cards.forEach(function(c){set(c,v,true)})};
 if(d.fonts&&d.fonts.ready)d.fonts.ready.then(lock);
 var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(lock,220)});addEventListener('load',function(){setTimeout(lock,1300)});
 function isTouch(e){return e.pointerType==='touch'||(!e.pointerType&&matchMedia('(hover:none)').matches)}
 d.addEventListener('click',function(e){
  var t=e.target,c=t.closest&&t.closest('.fc');
  if(t.closest&&t.closest('#pop,#viewer,.pop'))return;
  var touch=isTouch(e);
  if(!c){if(touch)clearAll();return}
  var inner=t.closest('a,button');if(inner&&inner!==c)return;
  var s=S.get(c);if(!s)return;
  if(touch){if(!s.on){e.preventDefault();e.stopPropagation();clearAll(c);set(c,true);return}set(c,false,true)}
  else set(c,false,true)
 },true);
 /* desktop: hover turns the card over; leaving turns it back */
 var mx=0,my=0,raf=0,dwell=null,want=null;
 function inside(r,x,y,m){return r&&x>=r.left-m&&x<=r.right+m&&y>=r.top-m&&y<=r.bottom+m}
 function track(){raf=0;if(d.documentElement.classList.contains('pop-open'))return;
  var cur=cards.filter(function(c){return S.get(c).on})[0];
  if(cur&&inside(S.get(cur).r,mx,my,6))return;
  var hit=null,el=d.elementFromPoint(mx,my),sec=el&&el.closest('section');
  if(sec)sec.querySelectorAll('.fc').forEach(function(c){var s=S.get(c),r=s.a?s.r:c.getBoundingClientRect();if(!hit&&inside(r,mx,my,0)&&!c.closest('.swipe'))hit=c});
  if(cur&&hit!==cur)set(cur,false);
  if(hit&&hit!==cur){if(want!==hit){want=hit;clearTimeout(dwell);dwell=setTimeout(function(){if(want===hit&&!d.documentElement.classList.contains('pop-open')){clearAll(hit);set(hit,true)}},80)}}
  else{want=null;clearTimeout(dwell)}}
 addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(track)},{passive:true});
 d.addEventListener('mouseleave',function(){want=null;clearAll()});
 addEventListener('scroll',function(){clearAll(null,true)},{passive:true,capture:true});
 /* keyboard: focusing a card shows its back, Enter still opens the popup */
 var quiet=0;d.addEventListener('keydown',function(e){if(e.key==='Escape')quiet=Date.now()},true);
 d.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#pop'))quiet=Date.now()},true);
 d.addEventListener('focusin',function(e){var c=e.target.closest&&e.target.closest('.fc');if(c&&e.target===c&&Date.now()-quiet>1100&&!d.documentElement.classList.contains('pop-open')&&c.matches(':focus-visible'))set(c,true)});
 d.addEventListener('focusout',function(e){var c=e.target.closest&&e.target.closest('.fc');if(c&&e.target===c)set(c,false)});
})();
