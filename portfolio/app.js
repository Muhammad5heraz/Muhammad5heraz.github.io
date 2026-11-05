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
  cards.forEach(function(c){c.addEventListener('click',function(){
    d.getElementById('vt').textContent=c.dataset.title;d.getElementById('vs').textContent=c.dataset.meta;var body=d.getElementById('vb'),f=c.dataset.file;
    if(f){body.innerHTML=/\.pdf$/i.test(f)?'<iframe src="'+f+'" title="'+c.dataset.title+'"></iframe>':'<img src="'+f+'" alt="'+c.dataset.title+'">'}
    else{var s=c.dataset.state==='r';body.innerHTML='<div class="pend"><div><h5>'+(s?'Available on request':'Document being added')+'</h5><p>'+(s?'This document contains personal identifiers, so it is released directly on request.':'The viewing copy of this document will be published here shortly.')+'</p><a href="#" data-mail="'+(s?'Document request: ':'Document request: ')+c.dataset.title.replace(/"/g,'')+'">Request it by email</a></div></div>';
      var a=body.querySelector('[data-mail]');a.href='mailto:'+addr+'?subject='+encodeURIComponent(a.dataset.mail)}
    dlg.showModal()})});
  d.getElementById('vx').addEventListener('click',function(){dlg.close()});dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  /* dust in the hero beam */
  var cv=d.getElementById('dust');if(cv&&!reduce){var h=d.getElementById('profile'),x=cv.getContext('2d'),W,H,dpr=Math.min(devicePixelRatio||1,2),M=[],vis=true;
    function size(){W=cv.width=h.clientWidth*dpr;H=cv.height=h.clientHeight*dpr}size();addEventListener('resize',size);
    for(var k=0;k<44;k++)M.push({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.4,s:Math.random()*.00006+.00002,p:Math.random()*6.28});
    new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(h);
    (function loop(t){if(vis){x.clearRect(0,0,W,H);M.forEach(function(m){m.y-=m.s*16;m.x+=Math.sin(t/3000+m.p)*.00006;if(m.y<-.02){m.y=1.02;m.x=Math.random()}var a=(.25+.35*Math.sin(t/900+m.p))*Math.min(1,m.x*1.6);x.fillStyle='rgba(243,201,139,'+Math.max(0,a)+')';x.beginPath();x.arc(m.x*W,m.y*H,m.r*dpr,0,6.28);x.fill()})}requestAnimationFrame(loop)})(0)}
})();
