lucide.createIcons();

  // ---------- Sample feedback dataset ----------
  const SAMPLE_FEEDBACK = [
    { id:1, text:"The new checkout flow is so fast, I love it. Ordered in under a minute!", source:"Review", sentiment:"positive", topic:"checkout", date:"2025-04-12T10:24:00Z" },
    { id:2, text:"My package arrived 6 days late and no one responded to my emails for a week. Frustrating.", source:"Email", sentiment:"negative", topic:"shipping", date:"2025-04-11T08:15:00Z" },
    { id:3, text:"App keeps crashing when I try to log in on my Android phone. Please fix.", source:"App Review", sentiment:"negative", topic:"app", date:"2025-04-10T19:42:00Z" },
    { id:4, text:"Love the dark, clean UI. Feels premium. Would pay for a Pro tier if reasonably priced.", source:"Review", sentiment:"positive", topic:"app", date:"2025-04-09T14:01:00Z" },
    { id:5, text:"Pricing is confusing. Pro vs Team overlap is unclear. Had to ask support to decide.", source:"Survey", sentiment:"neutral", topic:"pricing", date:"2025-04-09T09:33:00Z" },
    { id:6, text:"Support agent Maria was incredibly helpful and resolved my refund in minutes. Thank you!", source:"Email", sentiment:"positive", topic:"support", date:"2025-04-08T16:20:00Z" },
    { id:7, text:"Would love Apple Pay at checkout. I always abandon carts without it.", source:"Review", sentiment:"neutral", topic:"checkout", date:"2025-04-08T11:05:00Z" },
    { id:8, text:"Shipping was fast this time, arrived 2 days early. Great improvement!", source:"Review", sentiment:"positive", topic:"shipping", date:"2025-04-07T13:48:00Z" },
    { id:9, text:"The mobile app logged me out twice today and reset my cart. Annoying.", source:"App Review", sentiment:"negative", topic:"app", date:"2025-04-07T07:12:00Z" },
    { id:10, text:"Decent product overall. Nothing standout but does the job. Would recommend cautiously.", source:"Survey", sentiment:"neutral", topic:"app", date:"2025-04-06T20:55:00Z" },
    { id:11, text:"Team plan is too expensive for small startups. Please add a cheaper middle tier.", source:"Survey", sentiment:"negative", topic:"pricing", date:"2025-04-06T15:30:00Z" },
    { id:12, text:"Checkout remembered my address and card. So smooth. Five stars.", source:"Review", sentiment:"positive", topic:"checkout", date:"2025-04-05T18:11:00Z" },
    { id:13, text:"Took 5 days for support to reply. By then I'd already disputed the charge.", source:"Email", sentiment:"negative", topic:"support", date:"2025-04-05T09:22:00Z" },
    { id:14, text:"Please add Google Pay. I never type card numbers anymore.", source:"Review", sentiment:"neutral", topic:"checkout", date:"2025-04-04T22:40:00Z" },
    { id:15, text:"Product quality is excellent. Holding up after 6 months of daily use.", source:"Review", sentiment:"positive", topic:"shipping", date:"2025-04-04T10:18:00Z" }
  ];

  // ---------- Toast ----------
  const toastEl = document.getElementById('toast');
  function toast(msg){
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translate(-50%, -8px)';
    setTimeout(()=>{ toastEl.style.opacity='0'; toastEl.style.transform='translate(-50%, 0)'; }, 2400);
  }

  // ---------- Counters ----------
  function animateCounters(){
    document.querySelectorAll('.counter').forEach(el=>{
      if(el.dataset.done) return;
      const target = parseFloat(el.dataset.target);
      const isFloat = target % 1 !== 0;
      const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
      let cur = 0;
      const steps = 40;
      const inc = target/steps;
      const tick = ()=>{
        cur += inc;
        if(cur >= target){ cur = target; el.dataset.done='1'; }
        const val = isFloat ? cur.toFixed(1) : Math.round(cur).toLocaleString();
        el.innerHTML = val + suffix;
        if(cur < target) requestAnimationFrame(tick);
      };
      tick();
    });
  }

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); if(e.target.querySelector('.counter')) animateCounters(); } });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // ---------- Charts (Recharts UMD) ----------
  const { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = Recharts;

  const COLORS = { pos:'#2E7D32', neg:'#C0392B', neu:'#6B6E7A', lime:'#C7F36B', cobalt:'#5267F2', ink:'#171923' };

  // Donut
  const donutData = [
    { name:'Positive', value:58, color:COLORS.pos },
    { name:'Negative', value:24, color:COLORS.neg },
    { name:'Neutral', value:18, color:COLORS.neu }
  ];
  function renderDonut(){
    ReactDOM.render(
      React.createElement(ResponsiveContainer, {width:'100%',height:'100%'},
        React.createElement(PieChart,null,
          React.createElement(Pie,{data:donutData,dataKey:'value',nameKey:'name',cx:'50%',cy:'50%',innerRadius:60,outerRadius:90,paddingAngle:3},
            donutData.map((d,i)=>React.createElement(Cell,{key:i,fill:d.color}))
          ),
          React.createElement(Tooltip,{contentStyle:{borderRadius:12,border:'1px solid #E5E3DA',fontFamily:'DM Sans'}}),
          React.createElement(Legend,{iconType:'circle',wrapperStyle:{fontFamily:'DM Sans',fontSize:12}})
        )
      ), document.getElementById('donut-chart'));
  }

  // Trend
  const trendData = [
    {d:'Mar 13',positive:320,negative:140,neutral:90},
    {d:'Mar 20',positive:410,negative:170,neutral:110},
    {d:'Mar 27',positive:390,negative:160,neutral:120},
    {d:'Apr 03',positive:520,negative:190,neutral:130},
    {d:'Apr 10',positive:610,negative:210,neutral:140}
  ];
  function renderTrend(){
    ReactDOM.render(
      React.createElement(ResponsiveContainer,{width:'100%',height:'100%'},
        React.createElement(LineChart,{data:trendData,margin:{top:10,right:10,left:-20,bottom:0}},
          React.createElement(CartesianGrid,{strokeDasharray:'3 3',stroke:'#EEEDE6',vertical:false}),
          React.createElement(XAxis,{dataKey:'d',tick:{fontFamily:'JetBrains Mono',fontSize:11,fill:'#6B6E7A'},axisLine:{stroke:'#E5E3DA'}}),
          React.createElement(YAxis,{tick:{fontFamily:'JetBrains Mono',fontSize:11,fill:'#6B6E7A'},axisLine:false,tickLine:false}),
          React.createElement(Tooltip,{contentStyle:{borderRadius:12,border:'1px solid #E5E3DA',fontFamily:'DM Sans'}}),
          React.createElement(Line,{type:'monotone',dataKey:'positive',stroke:COLORS.pos,strokeWidth:2.5,dot:false}),
          React.createElement(Line,{type:'monotone',dataKey:'negative',stroke:COLORS.neg,strokeWidth:2.5,dot:false}),
          React.createElement(Line,{type:'monotone',dataKey:'neutral',stroke:COLORS.neu,strokeWidth:2.5,dot:false})
        )
      ), document.getElementById('trend-chart'));
  }

  // Topics bar
  const topicData = [
    {topic:'Shipping',mentions:412},
    {topic:'App',mentions:389},
    {topic:'Checkout',mentions:318},
    {topic:'Pricing',mentions:247},
    {topic:'Support',mentions:189},
    {topic:'Quality',mentions:152}
  ];
  function renderTopics(){
    ReactDOM.render(
      React.createElement(ResponsiveContainer,{width:'100%',height:'100%'},
        React.createElement(BarChart,{data:topicData,layout:'vertical',margin:{top:5,right:20,left:10,bottom:5}},
          React.createElement(CartesianGrid,{strokeDasharray:'3 3',stroke:'#EEEDE6',horizontal:false}),
          React.createElement(XAxis,{type:'number',tick:{fontFamily:'JetBrains Mono',fontSize:11,fill:'#6B6E7A'},axisLine:false,tickLine:false}),
          React.createElement(YAxis,{type:'category',dataKey:'topic',tick:{fontFamily:'DM Sans',fontSize:12,fill:'#171923'},axisLine:false,tickLine:false,width:80}),
          React.createElement(Tooltip,{contentStyle:{borderRadius:12,border:'1px solid #E5E3DA',fontFamily:'DM Sans'},cursor:{fill:'#F7F6F2'}}),
          React.createElement(Bar,{dataKey:'mentions',fill:COLORS.cobalt,radius:[0,6,6,0],barSize:18})
        )
      ), document.getElementById('topic-chart'));
  }

  // Aspect radar
  const aspectData = [
    {aspect:'Quality',positive:78,negative:12},
    {aspect:'Pricing',positive:32,negative:58},
    {aspect:'Delivery',positive:41,negative:67},
    {aspect:'Service',positive:64,negative:28},
    {aspect:'Usability',positive:85,negative:10}
  ];
  function renderAspect(){
    ReactDOM.render(
      React.createElement(ResponsiveContainer,{width:'100%',height:'100%'},
        React.createElement(RadarChart,{data:aspectData,outerRadius:'70%'},
          React.createElement(PolarGrid,{stroke:'#E5E3DA'}),
          React.createElement(PolarAngleAxis,{dataKey:'aspect',tick:{fontFamily:'DM Sans',fontSize:12,fill:'#171923'}}),
          React.createElement(PolarRadiusAxis,{tick:{fontFamily:'JetBrains Mono',fontSize:10,fill:'#6B6E7A'},angle:30}),
          React.createElement(Radar,{name:'Positive',dataKey:'positive',stroke:COLORS.pos,fill:COLORS.pos,fillOpacity:.4}),
          React.createElement(Radar,{name:'Negative',dataKey:'negative',stroke:COLORS.neg,fill:COLORS.neg,fillOpacity:.3}),
          React.createElement(Legend,{iconType:'circle',wrapperStyle:{fontFamily:'DM Sans',fontSize:12}})
        )
      ), document.getElementById('aspect-chart'));
  }

  // Defer chart render until visible
  const chartIo = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        if(e.target.id==='donut-chart') renderDonut();
        if(e.target.id==='trend-chart') renderTrend();
        if(e.target.id==='topic-chart') renderTopics();
        if(e.target.id==='aspect-chart') renderAspect();
        chartIo.unobserve(e.target);
      }
    });
  },{threshold:.2});
  ['donut-chart','trend-chart','topic-chart','aspect-chart'].forEach(id=>chartIo.observe(document.getElementById(id)));

  // ---------- Analyzer tabs ----------
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.add('hidden'));
      document.getElementById('panel-'+btn.dataset.tab).classList.remove('hidden');
    });
  });

  // ---------- Text analyzer ----------
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  textInput.addEventListener('input',()=>{
    charCount.textContent = textInput.value.length;
    wordCount.textContent = textInput.value.trim() ? textInput.value.trim().split(/\s+/).length : 0;
  });

  document.getElementById('load-sample-text').addEventListener('click',()=>{
    textInput.value = SAMPLE_FEEDBACK[1].text + " " + SAMPLE_FEEDBACK[3].text;
    textInput.dispatchEvent(new Event('input'));
    toast('Sample feedback loaded');
  });

  // Lightweight demo sentiment / topic detection
  const NEG_WORDS = ['late','slow','crash','frustrating','annoying','expensive','confusing','broken','bad','worst','terrible','never','refund','disappointed','fails'];
  const POS_WORDS = ['love','great','fast','excellent','smooth','helpful','premium','recommend','perfect','amazing','wonderful','quality','best','easy'];
  const TOPIC_WORDS = {
    shipping:['shipping','package','delivery','arrived','courier'],
    app:['app','crash','login','logout','mobile','ui','dark mode'],
    pricing:['pricing','price','expensive','cheap','tier','plan','cost'],
    support:['support','agent','reply','response','help','refund'],
    checkout:['checkout','cart','pay','apple pay','google pay','order']
  };

  function analyzeText(text){
    const lower = text.toLowerCase();
    let pos=0,neg=0;
    POS_WORDS.forEach(w=>{ if(lower.includes(w)) pos++; });
    NEG_WORDS.forEach(w=>{ if(lower.includes(w)) neg++; });
    let sentiment = pos>neg?'positive':neg>pos?'negative':'neutral';
    let score = Math.round(((pos-neg)/Math.max(1,pos+neg))*100);
    const topics = [];
    Object.entries(TOPIC_WORDS).forEach(([t,words])=>{ if(words.some(w=>lower.includes(w))) topics.push(t); });
    const keywords = lower.split(/[^a-z']+/).filter(w=>w.length>4).filter((v,i,a)=>a.indexOf(v)===i).slice(0,6);
    return {sentiment,score,topics,keywords};
  }

  function sentimentChip(s){
    const map={positive:'sent-pos',negative:'sent-neg',neutral:'sent-neu'};
    return `<span class="chip ${map[s]}">${s}</span>`;
  }

  document.getElementById('analyze-text').addEventListener('click',()=>{
    const text = textInput.value.trim();
    if(!text){ toast('Please paste some feedback first'); return; }
    const a = analyzeText(text);
    const res = document.getElementById('text-result');
    res.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <span class="chip bg-white/10 text-[#C7F36B]"><span class="pill-dot bg-[#C7F36B]"></span> Demo Analysis</span>
        ${sentimentChip(a.sentiment)}
      </div>
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Sentiment Score</div><div class="font-display font-700 text-2xl ${a.sentiment==='positive'?'text-[#C7F36B]':a.sentiment==='negative'?'text-[#FF6B6B]':'text-white'}">${a.score>0?'+':''}${a.score}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Topics</div><div class="font-display font-700 text-2xl text-white">${a.topics.length||0}</div></div>
      </div>
      <div class="mb-4">
        <div class="mono text-[10px] uppercase text-[#9a9ca6] mb-2">Detected Topics</div>
        <div class="flex flex-wrap gap-2">${a.topics.length?a.topics.map(t=>`<span class="chip bg-[#5267F2]/20 text-[#9DB0FF]">#${t}</span>`).join(''):'<span class="text-[#9a9ca6] text-sm">None detected</span>'}</div>
      </div>
      <div class="mb-4">
        <div class="mono text-[10px] uppercase text-[#9a9ca6] mb-2">Keywords</div>
        <div class="flex flex-wrap gap-2">${a.keywords.map(k=>`<span class="chip bg-white/5 text-white border border-white/10">${k}</span>`).join('')}</div>
      </div>
      <div>
        <div class="mono text-[10px] uppercase text-[#9a9ca6] mb-2">Original Feedback</div>
        <p class="editorial text-[15px] text-white leading-snug border-l-2 border-[#C7F36B] pl-3">"${text.slice(0,180)}${text.length>180?'…':''}"</p>
      </div>
    `;
    saveSession({type:'Text',records:1,summary:`${a.sentiment} sentiment · ${a.topics.length} topics`});
  });

  // ---------- Voice analyzer ----------
  let mediaRecorder=null, audioChunks=[], recording=false;
  const recordBtn = document.getElementById('record-btn');
  const recStatus = document.getElementById('rec-status');
  const audioPlayer = document.getElementById('audio-player');
  const voiceWave = document.getElementById('voice-wave');

  function animateWave(on){
    voiceWave.querySelectorAll('div').forEach((b,i)=>{
      b.className = on?`wave-bar w-1 bg-[#C7F36B] h-full`:`w-1 bg-[#C7F36B]`;
      b.style.animationDelay = (i*0.06)+'s';
      if(!on) b.style.height = (4+Math.random()*40)+'px';
    });
    voiceWave.classList.toggle('opacity-40',!on);
    voiceWave.classList.toggle('opacity-100',on);
  }
  animateWave(false);

  recordBtn.addEventListener('click', async ()=>{
    if(recording){
      mediaRecorder.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = e=>audioChunks.push(e.data);
      mediaRecorder.onstop = ()=>{
        const blob = new Blob(audioChunks,{type:'audio/webm'});
        audioPlayer.src = URL.createObjectURL(blob);
        audioPlayer.classList.remove('hidden');
        recording=false;
        recordBtn.innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i> <span>Start Recording</span>';
        lucide.createIcons();
        recStatus.textContent = 'Recording complete · Demo transcript ready';
        recStatus.classList.remove('text-[#FF6B6B]');
        recStatus.classList.add('text-[#C7F36B]');
        animateWave(false);
        showVoiceDemoResult();
        stream.getTracks().forEach(t=>t.stop());
      };
      mediaRecorder.start();
      recording=true;
      recordBtn.innerHTML = '<i data-lucide="square" class="w-4 h-4"></i> <span>Stop</span>';
      lucide.createIcons();
      recStatus.textContent = 'Recording… · Permission granted';
      recStatus.classList.remove('text-[#9a9ca6]');
      recStatus.classList.add('text-[#FF6B6B]');
      animateWave(true);
    } catch(err){
      toast('Microphone access denied — demo transcript used instead');
      recStatus.textContent = 'Mic denied · Demo transcript available';
      showVoiceDemoResult();
    }
  });

  document.getElementById('audio-upload').addEventListener('change',(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('audio/')){ toast('Unsupported audio format'); return; }
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.classList.remove('hidden');
    recStatus.textContent = `Loaded: ${file.name} · Demo transcript`;
    showVoiceDemoResult();
  });

  function showVoiceDemoResult(){
    const transcript = "I really like the new checkout flow, it's much faster than before. But my last order arrived six days late and I had to email support twice before anyone responded. Honestly the product is good but the shipping experience really lets it down.";
    const a = analyzeText(transcript);
    const res = document.getElementById('voice-result');
    res.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <span class="chip bg-white/10 text-[#C7F36B]"><span class="pill-dot bg-[#C7F36B]"></span> Demo Transcript</span>
        ${sentimentChip('neutral')}
      </div>
      <div class="p-3 rounded-lg bg-[#5267F2]/10 border border-[#5267F2]/30 text-[11px] text-[#B6B8C2] flex gap-2 mb-4">
        <i data-lucide="info" class="w-4 h-4 text-[#5267F2] flex-shrink-0"></i>
        Sentiment is derived from the <strong class="text-white">text transcript</strong>. Acoustic emotion recognition (tone/pitch) requires a separate model — not run in demo mode.
      </div>
      <div class="mb-4">
        <div class="mono text-[10px] uppercase text-[#9a9ca6] mb-2">Transcript</div>
        <p class="editorial text-[15px] text-white leading-snug">"${transcript}"</p>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Score</div><div class="font-display font-700 text-xl text-white">${a.score>0?'+':''}${a.score}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Topics</div><div class="font-display font-700 text-xl text-[#C7F36B]">${a.topics.length}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Words</div><div class="font-display font-700 text-xl text-[#5267F2]">${transcript.split(' ').length}</div></div>
      </div>
      <div>
        <div class="mono text-[10px] uppercase text-[#9a9ca6] mb-2">Detected Topics</div>
        <div class="flex flex-wrap gap-2">${a.topics.map(t=>`<span class="chip bg-[#5267F2]/20 text-[#9DB0FF]">#${t}</span>`).join('')}</div>
      </div>
    `;
    lucide.createIcons();
    saveSession({type:'Voice',records:1,summary:`Transcript analyzed · ${a.topics.length} topics`});
  }

  // ---------- CSV batch ----------
  document.getElementById('csv-upload').addEventListener('change',(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const val = document.getElementById('csv-validation');
    if(file.size > 5*1024*1024){ val.innerHTML = '<span class="text-[#FF6B6B]">✕ File exceeds 5MB limit</span>'; return; }
    if(!file.name.endsWith('.csv')){ val.innerHTML = '<span class="text-[#FF6B6B]">✕ Only .csv files supported</span>'; return; }
    const reader = new FileReader();
    reader.onload = ev=>{
      const text = ev.target.result;
      const lines = text.split(/\r?\n/).filter(l=>l.trim());
      if(!lines.length){ val.innerHTML='<span class="text-[#FF6B6B]">✕ Empty file</span>'; return; }
      const headers = lines[0].split(',').map(h=>h.trim().toLowerCase());
      const required = ['feedback','source','date'];
      const missing = required.filter(r=>!headers.includes(r));
      if(missing.length){ val.innerHTML = `<span class="text-[#FF6B6B]">✕ Missing columns: ${missing.join(', ')}</span>`; return; }
      val.innerHTML = `<span class="text-[#C7F36B]">✓ Valid · ${lines.length-1} rows detected</span>`;
      window._csvData = lines.slice(1).map(l=>{ const p=l.split(','); return {feedback:p[0],source:p[1],date:p[2]}; });
    };
    reader.readAsText(file);
  });

  document.getElementById('load-sample-csv').addEventListener('click',()=>{
    const val = document.getElementById('csv-validation');
    val.innerHTML = `<span class="text-[#C7F36B]">✓ Sample loaded · ${SAMPLE_FEEDBACK.length} rows</span>`;
    window._csvData = SAMPLE_FEEDBACK.map(f=>({feedback:f.text,source:f.source,date:f.date}));
  });

  document.getElementById('analyze-batch').addEventListener('click',()=>{
    const data = window._csvData;
    if(!data || !data.length){ toast('Load a valid CSV first'); return; }
    const results = data.map(d=>({...d, ...analyzeText(d.feedback)}));
    const pos = results.filter(r=>r.sentiment==='positive').length;
    const neg = results.filter(r=>r.sentiment==='negative').length;
    const neu = results.filter(r=>r.sentiment==='neutral').length;
    document.getElementById('batch-result').innerHTML = `
      <div class="grid grid-cols-4 gap-3 mb-5">
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Total</div><div class="font-display font-700 text-2xl text-white">${results.length}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Positive</div><div class="font-display font-700 text-2xl text-[#C7F36B]">${pos}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Negative</div><div class="font-display font-700 text-2xl text-[#FF6B6B]">${neg}</div></div>
        <div class="bg-[#171923] rounded-lg p-3"><div class="mono text-[10px] uppercase text-[#9a9ca6]">Neutral</div><div class="font-display font-700 text-2xl text-white">${neu}</div></div>
      </div>
      <div class="space-y-2 max-h-[300px] overflow-y-auto">
        ${results.slice(0,8).map(r=>`
          <div class="flex items-start gap-3 p-3 rounded-lg bg-[#171923] border border-white/5">
            ${sentimentChip(r.sentiment)}
            <span class="text-sm text-white flex-1">${r.feedback.slice(0,90)}${r.feedback.length>90?'…':''}</span>
            <span class="mono text-[10px] text-[#9a9ca6]">${r.topics.join(', ')||'—'}</span>
          </div>`).join('')}
      </div>`;
    saveSession({type:'CSV Batch',records:results.length,summary:`${pos}+ / ${neg}- / ${neu} neutral`});
  });

  // ---------- Explorer ----------
  const listEl = document.getElementById('feedback-list');
  const resultCount = document.getElementById('result-count');

  function renderList(){
    const q = document.getElementById('filter-search').value.toLowerCase();
    const s = document.getElementById('filter-sentiment').value;
    const t = document.getElementById('filter-topic').value;
    const sort = document.getElementById('sort-by').value;
    let items = SAMPLE_FEEDBACK.filter(f=>{
      if(q && !f.text.toLowerCase().includes(q)) return false;
      if(s!=='all' && f.sentiment!==s) return false;
      if(t!=='all' && f.topic!==t) return false;
      return true;
    });
    if(sort==='newest') items.sort((a,b)=>new Date(b.date)-new Date(a.date));
    if(sort==='oldest') items.sort((a,b)=>new Date(a.date)-new Date(b.date));
    if(sort==='sentiment') items.sort((a,b)=>{const o={positive:1,neutral:2,negative:3};return o[a.sentiment]-o[b.sentiment];});
    resultCount.textContent = items.length;
    listEl.innerHTML = items.length ? items.map(f=>`
      <div class="border border-[#E5E3DA] rounded-xl p-4 hover:border-[#171923] transition group">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex items-center gap-2 flex-wrap">
            ${sentimentChip(f.sentiment)}
            <span class="chip bg-white border border-[#E5E3DA] text-[#6B6E7A]">#${f.topic}</span>
            <span class="mono text-[11px] text-[#6B6E7A]">${f.source}</span>
          </div>
          <span class="mono text-[11px] text-[#6B6E7A]">${new Date(f.date).toLocaleDateString()}</span>
        </div>
        <p class="text-sm text-[#171923] leading-relaxed">${f.text}</p>
      </div>`).join('') : `<div class="text-center text-sm text-[#6B6E7A] py-10">No feedback matches your filters.</div>`;
  }
  ['filter-search','filter-sentiment','filter-topic','sort-by'].forEach(id=>document.getElementById(id).addEventListener('input',renderList));
  renderList();

  document.getElementById('export-csv').addEventListener('click',()=>{
    const q = document.getElementById('filter-search').value.toLowerCase();
    const s = document.getElementById('filter-sentiment').value;
    const t = document.getElementById('filter-topic').value;
    const rows = SAMPLE_FEEDBACK.filter(f=>{
      if(q && !f.text.toLowerCase().includes(q)) return false;
      if(s!=='all' && f.sentiment!==s) return false;
      if(t!=='all' && f.topic!==t) return false;
      return true;
    });
    if(!rows.length){ toast('Nothing to export'); return; }
    const csv = ['id,feedback,source,sentiment,topic,date', ...rows.map(r=>`${r.id},"${r.text.replace(/"/g,'""')}",${r.source},${r.sentiment},${r.topic},${r.date}`)].join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'feedback_export.csv';
    a.click();
    toast('CSV exported');
  });

  // ---------- History (localStorage) ----------
  const HISTORY_KEY = 'feedbackfusion_history';
  function getHistory(){ try { return JSON.parse(localStorage.getItem(HISTORY_KEY))||[]; } catch { return []; } }
  function saveSession(s){
    const h = getHistory();
    h.unshift({id:Date.now(),date:new Date().toISOString(),...s});
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0,20)));
    renderHistory();
  }
  function renderHistory(){
    const h = getHistory();
    const el = document.getElementById('history-list');
    if(!h.length){
      el.innerHTML = `<div class="text-[#9a9ca6] text-sm text-center py-12 border border-dashed border-white/10 rounded-2xl">No analysis sessions yet. Run an analyzer above to create one.</div>`;
      return;
    }
    el.innerHTML = h.map(s=>`
      <div class="bg-[#1F2230] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-[#171923] flex items-center justify-center"><i data-lucide="${s.type==='Voice'?'mic':s.type==='CSV Batch'?'file-csv':'message-square-text'}" class="w-5 h-5 text-[#C7F36B]"></i></div>
          <div>
            <div class="font-display font-600">${s.type} Analysis</div>
            <div class="mono text-[11px] text-[#9a9ca6]">${new Date(s.date).toLocaleString()} · ${s.records} record(s)</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="mono text-[11px] text-[#B6B8C2] hidden sm:inline">${s.summary}</span>
          <button class="text-[#9a9ca6] hover:text-white" onclick="reopenSession(${s.id})"><i data-lucide="external-link" class="w-4 h-4"></i></button>
          <button class="text-[#9a9ca6] hover:text-[#FF6B6B]" onclick="deleteSession(${s.id})"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>`).join('');
    lucide.createIcons();
  }
  window.reopenSession = (id)=>{ toast('Session loaded (demo)'); document.getElementById('analyzer').scrollIntoView({behavior:'smooth'}); };
  window.deleteSession = (id)=>{
    const h = getHistory().filter(s=>s.id!==id);
    localStorage.setItem(HISTORY_KEY,JSON.stringify(h));
    renderHistory();
    toast('Session deleted');
  };
  document.getElementById('clear-history').addEventListener('click',()=>{
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    toast('History cleared');
  });
  renderHistory();

  // ---------- Smooth anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id = a.getAttribute('href');
      if(id.length>1){ const t=document.querySelector(id); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); } }
    });
  });
