/* Matthew Drag Sports Massage Therapy — site behaviour. Facts/prices come from data.js (built from _src/site.mjs). */
(function () {
  'use strict';

  // Instagram: create a free JSON feed at behold.so connected to @matthewdrag_rmt and paste its feed ID here.
  // Until then (or if the feed can't be reached) the six saved posts in the page show.
  var BEHOLD_FEED_ID = '';
  var IG_COUNT = 6;          // free Behold plan = 6 posts
  var IG_HIDE = [];          // post ids or permalinks to hide, e.g. 'DdxK6xKm6ZD'
  // Contact form: leave empty to open the visitor's email app; or paste a Formspree/Web3Forms style endpoint.
  var FORM_ENDPOINT = '';

  var MD = window.MD || {};
  var P = MD.prices || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };
  document.documentElement.classList.add('js');

  /* ---------- Jane links ---------- */
  var visit = store.get('md-visit') === 'back' ? 'back' : 'first';
  function link(group, min, mode) {
    var g = P[group]; if (!g) return MD.staff;
    var row = g.rows.filter(function (r) { return r.min === min; })[0]; if (!row) return MD.staff;
    var pair = row[(mode || visit) === 'back' ? 'back' : 'first'];
    return MD.jane + '#/discipline/' + pair[0] + '/treatment/' + pair[1];
  }
  function priceOf(group, min) { var r = (P[group] || { rows: [] }).rows.filter(function (x) { return x.min === min; })[0]; return r ? r.price : 0; }

  /* ---------- header + drawer ---------- */
  var header = $('[data-header]');
  var menuBtn = $('[data-menu]'), drawer = $('[data-drawer]');
  if (menuBtn && drawer) {
    var setMenu = function (open) {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', function () { setMenu(drawer.hidden); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) { setMenu(false); menuBtn.focus(); } });
  }

  /* ---------- open now (Toronto time) ---------- */
  function torontoNow() {
    var parts = {};
    try {
      new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[parts.weekday], mins: (+parts.hour % 24) * 60 + (+parts.minute) };
  }
  function toMin(t) { var a = t.split(':'); return +a[0] * 60 + +a[1]; }
  function fmt(t) { var m = toMin(t), h = Math.floor(m / 60), mm = m % 60; return (h % 12 || 12) + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + (h < 12 ? ' AM' : ' PM'); }
  function hoursFor(day) { return (MD.hours || []).filter(function (h) { return h.days.indexOf(day) > -1; })[0]; }
  (function openStatus() {
    if (!MD.hours) return;
    var now = torontoNow(), today = hoursFor(now.day), label, open = false;
    var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (today && today.open && now.mins >= toMin(today.open) && now.mins < toMin(today.close)) {
      open = true; label = 'Open today · until ' + fmt(today.close);
    } else if (today && !today.open) {
      label = 'Sunday · call or text to ask';
    } else {
      for (var i = 0; i < 8; i++) {
        var d = (now.day + i) % 7, h = hoursFor(d);
        if (!h || !h.open) continue;
        if (i === 0 && now.mins >= toMin(h.open)) continue;
        label = 'Closed · opens ' + (i === 0 ? 'today' : i === 1 ? 'tomorrow' : names[d]) + ' ' + fmt(h.open);
        break;
      }
    }
    var chip = $('[data-open-chip]');
    if (chip && label) { chip.textContent = label; chip.hidden = false; chip.classList.toggle('is-open', open); }
    var line = $('[data-open-line]');
    if (line && label) line.textContent = open ? label + '. Call or text to check today\'s openings.' : label + '. Book online any time.';
    $$('.hours-lg li').forEach(function (li) { if ((li.getAttribute('data-days') || '').split(',').indexOf(String(now.day)) > -1) li.classList.add('today'); });
  })();

  /* ---------- first visit / returning ---------- */
  function applyVisit() {
    $$('[data-first]').forEach(function (a) { a.href = a.getAttribute(visit === 'back' ? 'data-back' : 'data-first'); });
    $$('[data-visit]').forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-visit') === visit ? 'true' : 'false'); });
    var hint = $('[data-visit-hint]');
    if (hint) hint.textContent = visit === 'back' ? 'Welcome back. These links book a follow-up visit.' : 'First time? These links book a first visit, which leaves time for your health history.';
    $$('[data-zone-book]').forEach(function (a) { a.href = link(a.getAttribute('data-group'), +a.getAttribute('data-min')); });
    $$('[data-visit-note]').forEach(function (n) { n.textContent = visit === 'back' ? 'returning client' : 'first visit'; });
    var ci = $('[data-cov]'); if (ci) ci.dispatchEvent(new Event('input'));
    var rt = $('[data-race-type]'); if (rt) rt.dispatchEvent(new Event('change'));
  }
  $$('[data-visit]').forEach(function (b) {
    b.addEventListener('click', function () { visit = b.getAttribute('data-visit'); store.set('md-visit', visit); applyVisit(); });
  });
  applyVisit();

  /* ---------- price tabs ---------- */
  var tabs = $$('[role="tab"]');
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      var p = document.getElementById(x.getAttribute('aria-controls')); if (p) p.hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (n) { e.preventDefault(); selectTab(tabs[(i + n + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------- body map ---------- */
  var ZONES = {
    neck: { t: 'Neck & shoulders', why: 'Desk days, driving, overhead sports and heavy lifting all pile up here.', start: 'Deep tissue massage', g: 'massage', min: 60, add: 'Hyperice X shoulder, hot & cold contrast', addG: 'recovery', addMin: 15 },
    upper: { t: 'Upper back', why: 'The knot between your shoulder blades from screens, driving and pulling sessions.', start: 'Deep tissue massage + cupping', g: 'massage', min: 60, add: 'Cupping, worked into your massage. Just ask.' },
    lower: { t: 'Lower back', why: 'It often starts in tight hips and hamstrings, so Matthew checks those too.', start: 'Massage or fascial stretch', g: 'massage', min: 60, alt: ['fst', 60, 'Or book fascial stretch'], add: 'NormaTec hip attachment (ask Matthew)', care: 'Numbness, tingling down a leg, or pain after a fall? See your doctor first.' },
    hips: { t: 'Hips & glutes', why: 'Runners, skaters and anyone who sits a lot: tight hip flexors and glutes pull on everything around them.', start: 'Fascial stretch therapy', g: 'fst', min: 45, alt: ['massage', 60, 'Or book a 60 min massage'], add: 'NormaTec hip attachment (ask Matthew)' },
    thighs: { t: 'Quads & hamstrings', why: 'The big engines that take the beating from sprints, squats and hills.', start: 'Sports massage', g: 'massage', min: 60, add: 'NormaTec leg compression, 30 min', addG: 'recovery', addMin: 30 },
    knees: { t: 'Knees', why: 'Knee pain often comes from tight quads, IT bands or calves pulling on the joint.', start: 'Sports massage around the knee', g: 'massage', min: 45, add: 'Hyperice X knee contrast therapy (ask Matthew)', care: 'Swelling, locking or giving way after a twist? See a doctor or physio first.' },
    calves: { t: 'Calves & shins', why: 'The runner\'s classic: tight calves, sore shins, a cranky Achilles.', start: 'Sports massage', g: 'massage', min: 45, add: 'NormaTec leg compression, 30 min', addG: 'recovery', addMin: 30 },
    feet: { t: 'Feet & ankles', why: 'Sore arches and stiff ankles usually travel with tight calves.', start: 'Massage for feet and calves', g: 'massage', min: 30, add: 'Medistik cream to use at home' },
    race: { t: 'Everything. I just raced.', why: 'Nice work. Give it a day or two, then flush it all out.', start: 'Full-body recovery massage', g: 'massage', min: 90, add: 'NormaTec legs, 30 min', addG: 'recovery', addMin: 30 }
  };
  var card = $('[data-zone-card]');
  function pickZone(k, scroll) {
    var z = ZONES[k]; if (!z || !card) return;
    $$('[data-zone]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-zone') === k ? 'true' : 'false'); });
    $$('[data-spot]').forEach(function (s) { s.classList.toggle('on', s.getAttribute('data-spot') === k || k === 'race'); });
    var price = priceOf(z.g, z.min);
    var h = '<div class="zone-fade"><h3>' + esc(z.t) + '</h3><p class="why">' + esc(z.why) + '</p>' +
      '<dl class="zone-rows"><div><dt>Start with</dt><dd>' + esc(z.start) + '</dd></div>' +
      '<div><dt>Length</dt><dd>' + z.min + ' min · $' + price + '</dd></div>' +
      '<div><dt>Add-on</dt><dd>' + esc(z.add) + '</dd></div></dl>' +
      (z.care ? '<p class="care">' + esc(z.care) + '</p>' : '') +
      '<div class="zone-actions"><a class="btn btn-ink" target="_blank" rel="noopener" data-zone-book data-group="' + z.g + '" data-min="' + z.min + '" href="' + link(z.g, z.min) + '">Book ' + z.min + ' min</a>' +
      (z.alt ? '<a class="btn btn-ink-line" target="_blank" rel="noopener" data-zone-book data-group="' + z.alt[0] + '" data-min="' + z.alt[1] + '" href="' + link(z.alt[0], z.alt[1]) + '">' + esc(z.alt[2]) + '</a>' : '') +
      (z.addG ? '<a class="btn btn-ink-line" target="_blank" rel="noopener" href="' + link(z.addG, z.addMin) + '">Add ' + z.addMin + ' min recovery · $' + priceOf(z.addG, z.addMin) + '</a>' : '') +
      '</div><p class="fine-print">Booking as a <b data-visit-note>' + (visit === 'back' ? 'returning client' : 'first visit') + '</b>. <a href="#prices">Change</a></p></div>';
    card.innerHTML = h;
    if (scroll && window.innerWidth < 861) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  $$('[data-zone]').forEach(function (b) { b.addEventListener('click', function () { pickZone(b.getAttribute('data-zone'), true); }); });
  if (card) pickZone('calves', false); // show how it works straight away
  $$('[data-spot]').forEach(function (s) {
    s.addEventListener('click', function () { pickZone(s.getAttribute('data-spot'), true); });
  });

  /* ---------- benefits countdown + calculator ---------- */
  (function benefits() {
    var cd = $('[data-countdown]');
    if (cd) {
      var now = new Date(), end = new Date(now.getFullYear() + 1, 0, 1);
      var days = Math.ceil((end - now) / 864e5), weeks = Math.floor(days / 7);
      cd.innerHTML = 'If your plan resets on January 1, you have <mark>' + days + ' days</mark> ' +
        (days <= 75 ? '(about ' + weeks + ' weeks) to use this year\'s massage coverage, and December fills up fast.' : 'to use this year\'s coverage. Unused massage dollars don\'t roll over.');
    }
    var input = $('[data-cov]'), out = $('[data-calc-out]');
    if (!input || !out || !P.massage) return;
    var rows = P.massage.rows;
    function best(budget) {
      // most minutes on the table for the money (unbounded knapsack, $5 units), fewest dollars left as tie-break
      var B = Math.floor(budget / 5), dp = [], sp = [], pick = [];
      for (var b = 0; b <= B; b++) {
        dp[b] = 0; sp[b] = 0; pick[b] = -1;
        if (b > 0) { dp[b] = dp[b - 1]; sp[b] = sp[b - 1]; pick[b] = -2; }
        for (var i = 0; i < rows.length; i++) {
          var c = rows[i].price / 5;
          if (c > b) continue;
          var m2 = dp[b - c] + rows[i].min, s2 = sp[b - c] + rows[i].price;
          if (m2 > dp[b] || (m2 === dp[b] && s2 > sp[b])) { dp[b] = m2; sp[b] = s2; pick[b] = i; }
        }
      }
      var counts = {}, b2 = B, spent = 0;
      while (b2 > 0 && pick[b2] !== -1) {
        if (pick[b2] === -2) { b2--; continue; }
        var r = rows[pick[b2]]; counts[r.min] = (counts[r.min] || 0) + 1; spent += r.price; b2 -= r.price / 5;
      }
      return { counts: counts, mins: dp[B], spent: spent };
    }
    function describe(counts) {
      return Object.keys(counts).sort(function (a, b) { return b - a; }).map(function (m) { return counts[m] + ' × ' + m + ' min'; }).join(' + ');
    }
    function run() {
      var v = Math.max(0, Math.min(5000, Math.round(+input.value || 0)));
      $$('[data-cov-set]').forEach(function (b) { b.classList.toggle('on', +b.getAttribute('data-cov-set') === v); });
      if (v < 80) {
        out.innerHTML = '<div class="plan"><b>Not quite a 30 min session</b><span>A 30 minute massage is $80, so you\'d pay $' + (80 - v) + ' yourself. Still worth it.</span><a target="_blank" rel="noopener" href="' + link('massage', 30) + '">Book 30</a></div>';
        return;
      }
      var a = best(v), h = '';
      var mostLen = +Object.keys(a.counts).sort(function (x, y) { return a.counts[y] - a.counts[x]; })[0];
      h += '<div class="plan"><b>' + describe(a.counts) + '</b><span>Most time on the table: ' + a.mins + ' minutes for $' + a.spent + (v - a.spent ? ', $' + (v - a.spent) + ' left' : ', nothing left over') + '.</span><a target="_blank" rel="noopener" href="' + link('massage', mostLen) + '">Book ' + mostLen + '</a></div>';
      var n60 = Math.floor(v / 130), left = v - n60 * 130;
      if (n60 >= 1 && describe(a.counts) !== n60 + ' × 60 min') {
        var extra = left >= 80 ? ' + 1 × 30 min' : '';
        h += '<div class="plan"><b>' + n60 + ' × 60 min' + extra + '</b><span>The classic: a regular 60 min tune-up. $' + (left - (extra ? 80 : 0)) + ' left.</span><a target="_blank" rel="noopener" href="' + link('massage', 60) + '">Book 60</a></div>';
      }
      out.innerHTML = h;
    }
    input.addEventListener('input', run);
    $$('[data-cov-set]').forEach(function (b) { b.addEventListener('click', function () { input.value = b.getAttribute('data-cov-set'); run(); }); });
    run();
  })();

  /* ---------- race-week planner ---------- */
  (function race() {
    var dateIn = $('[data-race-date]'), typeIn = $('[data-race-type]'), list = $('[data-race-plan]');
    if (!dateIn || !list) return;
    var OFF = { short: [-4, -2, 1, 3], half: [-6, -2, 1, 3], full: [-9, -3, 2, 4], hyrox: [-5, -2, 1, 3], game: [-4, -1, 1, 2] };
    var NAME = { short: 'Race day', half: 'Race day', full: 'Race day', hyrox: 'HYROX day', game: 'Game day' };
    var iso = function (d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
    var def = new Date(); def.setDate(def.getDate() + 21);
    var saved = store.get('md-race');
    dateIn.value = saved && saved >= iso(new Date()) ? saved : iso(def);
    dateIn.min = iso(new Date());
    if (store.get('md-race-type')) typeIn.value = store.get('md-race-type');
    function draw() {
      var v = dateIn.value; if (!v) { list.innerHTML = '<li class="race-empty">Pick your event date to see the plan.</li>'; return; }
      store.set('md-race', v); store.set('md-race-type', typeIn.value);
      var p = v.split('-'), ev = new Date(+p[0], +p[1] - 1, +p[2]), off = OFF[typeIn.value] || OFF.half;
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var day = function (n) { var d = new Date(ev); d.setDate(d.getDate() + n); if (n !== 0 && d.getDay() === 0) d.setDate(d.getDate() + (n < 0 ? -1 : 1)); return d; }; // Sundays: by request only
      var nice = function (d) { return d.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' }); };
      var rel = function (n) { return n < 0 ? Math.abs(n) + ' days before' : n + ' day' + (n > 1 ? 's' : '') + ' after'; };
      var steps = [
        { n: off[0], t: 'Last deep session', d: 'Deep tissue or sports massage, 60 min. Enough time for any soreness to settle before the start.', g: 'massage', m: 60 },
        { n: off[1], t: 'Loosen up', d: 'Fascial stretch therapy, 30 to 45 min. Light work, no deep pressure.', g: 'fst', m: 45 },
        { n: 0, t: NAME[typeIn.value] || 'Race day', d: 'You\'ve got this. And yes: stretch before that 6 mile run.', race: true },
        { n: off[2], t: 'Flush it out', d: 'NormaTec compression, 30 min, to get your legs moving again.', g: 'recovery', m: 30 },
        { n: off[3], t: 'Recovery massage', d: 'A lighter sports massage, 60 min, once the worst soreness fades.', g: 'massage', m: 60 }
      ];
      list.innerHTML = steps.map(function (s) {
        var d = day(s.n), past = d < today;
        return '<li class="' + (s.race ? 'race-day' : '') + (past ? ' past' : '') + '"><span class="when">' + nice(d) + (s.race ? '' : ' · ' + rel(Math.round((d - ev) / 864e5))) + '</span><h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p>' +
          (s.race ? '' : past ? '<span class="when">Already passed</span>' : '<a target="_blank" rel="noopener" href="' + link(s.g, s.m) + '">Book this · $' + priceOf(s.g, s.m) + '</a>') + '</li>';
      }).join('');
    }
    dateIn.addEventListener('change', draw); typeIn.addEventListener('change', draw);
    draw();
  })();

  /* ---------- mile tracker (the page is a 6 mile run) ---------- */
  (function miles() {
    var secs = $$('[data-mile]'); if (!secs.length) return;
    var fill = $('[data-mile-fill]'), label = $('[data-mile-label]'), bar = $('.mile-bar');
    var rail = $('[data-mile-rail]'), rfill = $('[data-rail-fill]'), runner = $('[data-rail-runner]');
    var marks = rail ? $$('li', rail) : [];
    var anchors = [], ticking = false;
    function measure() {
      anchors = secs.map(function (s) { return { y: s.getBoundingClientRect().top + window.scrollY, m: parseFloat(s.getAttribute('data-mile')) || 0 }; });
      anchors.push({ y: document.documentElement.scrollHeight - window.innerHeight * 0.55, m: 6 });
      anchors.sort(function (a, b) { return a.y - b.y; });
    }
    function update() {
      ticking = false;
      var y = window.scrollY + window.innerHeight * 0.45, m = 0;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) m = 6;
      else for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i], b = anchors[i + 1];
        if (y < anchors[0].y) { m = 0; break; }
        if (!b) { m = a.m; break; }
        if (y >= a.y && y < b.y) { m = a.m + (b.m - a.m) * ((y - a.y) / Math.max(1, b.y - a.y)); break; }
      }
      m = Math.max(0, Math.min(6, m));
      var pct = (m / 6 * 100).toFixed(2) + '%';
      if (fill) fill.style.width = pct;
      if (label) label.textContent = m.toFixed(1) + ' mi';
      if (bar) bar.classList.toggle('show', window.scrollY > 200);
      if (rfill) rfill.style.height = pct;
      if (runner) runner.style.top = pct;
      marks.forEach(function (li, i) { li.classList.toggle('passed', m >= i - 0.02); });
      if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    }
    function onScroll() { if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(update); } }
    measure(); update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); update(); });
    window.addEventListener('load', function () { measure(); update(); });
  })();

  /* ---------- gentle reveal ---------- */
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = $$('.sec-head, .svc, .bibs, .quotes blockquote, .gear-grid article, .about-photo, .calc, .race-plan, .contact-form, .zone-card, .team-photos');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return; // already on screen: leave visible
      el.classList.add('reveal'); io.observe(el);
    });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 6000); // never leave anything hidden
  }

  /* ---------- Instagram (Behold) ---------- */
  var ig = $('[data-ig]');
  if (ig && BEHOLD_FEED_ID) {
    fetch('https://feeds.behold.so/' + encodeURIComponent(BEHOLD_FEED_ID.replace(/^https?:\/\/feeds\.behold\.so\//, '')), { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw r.status; return r.json(); })
      .then(function (d) {
        var posts = (Array.isArray(d) ? d : (d && d.posts) || []).filter(function (p) {
          return p.permalink && !IG_HIDE.some(function (h) { return p.permalink.indexOf(h) > -1 || p.id === h; });
        }).slice(0, IG_COUNT);
        if (!posts.length) return;
        ig.innerHTML = posts.map(function (p) {
          var s = p.sizes || {};
          var src = (s.medium && s.medium.mediaUrl) || (s.small && s.small.mediaUrl) || p.thumbnailUrl || p.mediaUrl;
          var cap = (p.prunedCaption || p.caption || '').replace(/\s+/g, ' ').trim();
          var vid = /video|reel/i.test(p.mediaType || '');
          return '<li><a class="ig-tile" href="' + esc(p.permalink) + '" target="_blank" rel="noopener"><img src="' + esc(src) + '" alt="' + esc(cap ? cap.slice(0, 120) : 'Instagram post by @matthewdrag_rmt') + '" width="480" height="640" loading="lazy">' +
            (vid ? '<svg class="ig-kind" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>' : '') + '</a></li>';
        }).join('');
      })
      .catch(function () { /* keep the saved posts */ });
  }

  /* ---------- contact form ---------- */
  var form = $('[data-contact]');
  $$('[data-prefill]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!form) return;
      var sel = form.elements.topic, want = a.getAttribute('data-prefill');
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text === want) sel.selectedIndex = i;
      if (want === 'Team or event' && !form.elements.message.value) form.elements.message.value = 'Team or event name:\nDate:\nLocation:\nHow many athletes:\n';
      setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, 500);
    });
  });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, st = $('[data-form-status]', form);
    var say = function (m, c) { st.textContent = m; st.className = 'form-status ' + (c || ''); };
    if (!f.name.value.trim() || !f.reply.value.trim() || !f.message.value.trim()) return say('Please add your name, how to reach you, and a message.', 'bad');
    var subject = f.topic.value + ' from ' + f.name.value.trim();
    var body = f.message.value.trim() + '\n\n' + f.name.value.trim() + '\n' + f.reply.value.trim();
    if (FORM_ENDPOINT) {
      say('Sending…');
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: f.name.value, reply: f.reply.value, topic: f.topic.value, message: f.message.value, subject: subject }) })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); say('Sent. Matthew will get back to you soon.', 'ok'); })
        .catch(function () { say('That didn\'t send. Please call or text ' + MD.phone + '.', 'bad'); });
      return;
    }
    window.location.href = 'mailto:' + MD.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    say('Your email app should open with the message ready. No email app? Call or text ' + MD.phone + '.', 'ok');
  });

  $$('[data-yr]').forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
