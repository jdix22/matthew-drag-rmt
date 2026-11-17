// Single source of truth for business facts. Pages, JSON-LD and assets/js/data.js all read this.
// Go live: SITE = 'https://matthewdragrmt.com/' and NOINDEX = false, then `node _src/build.mjs`.

export const SITE = 'https://jdix22.github.io/matthew-drag-rmt/';
export const NOINDEX = true;
export const V = '3'; // bump on every CSS/JS change (cache)

export const F = {
  name: 'Matthew Drag Sports Massage Therapy',
  person: 'Matthew Drag',
  short: 'Matthew Drag, RMT',
  tagline: 'Should have stretched before that 6 mile run',
  street: '407 Eagle St',
  city: 'Newmarket',
  region: 'ON',
  postal: 'L3Y 1K5',
  lat: 44.0496904,
  lng: -79.4597685,
  phone: '905-716-4419',
  tel: '+19057164419',
  email: 'matthew-drag@hotmail.com',
  jane: 'https://matthewdragmassagetherapy.janeapp.com/',
  janeStaff: 'https://matthewdragmassagetherapy.janeapp.com/#/staff_member/1',
  maps: 'https://www.google.com/maps/place/Matthew+Drag+Sports+Massage+Therapy/@44.0496904,-79.4597685,16z/data=!3m1!4b1!4m6!3m5!1s0x882ad3ec379250ff:0x73b99aeb7281edcd!8m2!3d44.0496904!4d-79.4597685!16s%2Fg%2F11p5f_sc5_',
  reviews: 'https://www.google.com/maps/place/Matthew+Drag+Sports+Massage+Therapy/@44.0496904,-79.4597685,16z/data=!4m8!3m7!1s0x882ad3ec379250ff:0x73b99aeb7281edcd!8m2!3d44.0496904!4d-79.4597685!9m1!1b1!16s%2Fg%2F11p5f_sc5_',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=407+Eagle+St+Newmarket+ON+L3Y+1K5',
  instagram: 'https://www.instagram.com/matthewdrag_rmt/',
  igHandle: '@matthewdrag_rmt',
  facebook: 'https://www.facebook.com/MatthewDragRMT/',
  linkedin: 'https://www.linkedin.com/in/matthew-drag-49b091107/',
  areas: ['Newmarket', 'Aurora', 'Richmond Hill', 'King City', 'Vaughan'],
  insurers: ['Alberta Blue Cross', 'Canada Life', 'Chambers of Commerce Group Insurance Plan', 'Desjardins Insurance', 'Manulife', 'Sun Life', 'Telus AdjudiCare'],
  awards: ['NewmarketToday Reader Favourite 2023', 'NewmarketToday Reader Favourite 2024', 'NewmarketToday Reader Favourite 2025, Massage Therapy'],
  // [day indexes 0=Sun], open, close (24h, Toronto time)
  hours: [
    { days: [1, 2, 3, 4, 5], open: '08:00', close: '21:00', label: 'Monday to Friday', text: '8 AM to 9 PM' },
    { days: [6], open: '09:30', close: '15:30', label: 'Saturday', text: '9:30 AM to 3:30 PM' },
    { days: [0], open: null, close: null, label: 'Sunday', text: 'Call or text to ask' },
  ],
};

// Jane treatments: d = discipline, first = first-visit treatment id, back = returning id
export const PRICES = {
  massage: {
    label: 'Massage therapy', short: 'Massage', note: 'Deep tissue, sports, relaxation, prenatal, functional massage and cupping. Same price for first and returning visits.',
    rows: [
      { min: 30, price: 80, first: [1, 19], back: [2, 12] },
      { min: 45, price: 95, first: [1, 18], back: [2, 13] },
      { min: 60, price: 130, first: [1, 20], back: [2, 14] },
      { min: 75, price: 140, first: [1, 21], back: [2, 15] },
      { min: 90, price: 170, first: [1, 16], back: [2, 22] },
      { min: 120, price: 260, first: [1, 17], back: [2, 23] },
    ],
  },
  fst: {
    label: 'Fascial stretch therapy', short: 'Stretch · FST', note: 'Assisted stretching on the table. Billed as massage therapy, so your RMT coverage applies.',
    rows: [
      { min: 30, price: 80, first: [5, 32], back: [5, 35] },
      { min: 45, price: 95, first: [5, 31], back: [5, 34] },
      { min: 60, price: 130, first: [5, 30], back: [5, 33] },
    ],
  },
  home: {
    label: 'Home visits', short: 'Home visit', note: 'Matthew brings the table to your home or wherever you train. Price varies with distance.',
    rows: [
      { min: 60, price: 135, first: [3, 26], back: [3, 26], from: true },
      { min: 75, price: 150, first: [3, 27], back: [3, 27], from: true },
      { min: 90, price: 180, first: [3, 29], back: [3, 29], from: true },
    ],
  },
  recovery: {
    label: 'Recovery', short: 'Recovery', note: 'NormaTec leg compression with Hyperice X shoulder contrast (hot and cold) therapy.',
    rows: [
      { min: 15, price: 25, first: [4, 24], back: [4, 24] },
      { min: 30, price: 35, first: [4, 25], back: [4, 25] },
    ],
  },
};

export const jane = ([d, t]) => `${F.jane}#/discipline/${d}/treatment/${t}`;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const NAV = [
  ['#body-map', 'Where it hurts'],
  ['#services', 'Services'],
  ['#prices', 'Prices'],
  ['#benefits', 'Benefits'],
  ['#about', 'About'],
  ['#contact', 'Contact'],
];

const icon = {
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-2.8 0-3.5 2-3.5 3.6v1.9H8.5V12h2v9H14v-9h2.6l.4-3.5z" fill="currentColor"/></svg>',
  li: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h3v11H5zM6.5 4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h2.9v1.5c.4-.8 1.5-1.7 3.1-1.7 3.2 0 3.9 2 3.9 4.7V20h-3v-5.6c0-1.3 0-3-1.9-3s-2 1.4-2 2.9V20h-3z" fill="currentColor"/></svg>',
  g: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3c1.8-1.6 2.8-4 2.8-7z" fill="currentColor"/><path d="M12 21c2.5 0 4.6-.8 6.2-2.3l-3-2.4c-.8.6-1.9.9-3.2.9-2.4 0-4.5-1.6-5.2-3.9H3.7v2.4A9.4 9.4 0 0 0 12 21z" fill="currentColor" opacity=".75"/><path d="M6.8 13.3a5.6 5.6 0 0 1 0-3.6V7.3H3.7a9.4 9.4 0 0 0 0 8.4z" fill="currentColor" opacity=".55"/><path d="M12 6.7c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9 9 0 0 0 12 3a9.4 9.4 0 0 0-8.3 4.3l3.1 2.4C7.5 8.3 9.6 6.7 12 6.7z" fill="currentColor" opacity=".9"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="currentColor"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
export { icon };

export function socials(cls = 'socials') {
  return `<ul class="${cls}">
  <li><a href="${F.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${F.igHandle}">${icon.ig}</a></li>
  <li><a href="${F.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.fb}</a></li>
  <li><a href="${F.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon.li}</a></li>
  <li><a href="${F.reviews}" target="_blank" rel="noopener" aria-label="Google reviews">${icon.g}</a></li>
</ul>`;
}

export function businessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
    '@id': SITE + '#business',
    name: F.name,
    alternateName: F.short,
    slogan: F.tagline,
    description: 'Registered massage therapy in Newmarket, Ontario: sports and deep tissue massage, fascial stretch therapy, cupping, prenatal and relaxation massage, home visits, NormaTec compression and Hyperice recovery. Direct billing to most insurers.',
    url: SITE,
    image: SITE + 'assets/img/sports-massage-athlete.webp',
    logo: SITE + 'assets/img/logo-mark.png',
    telephone: F.tel,
    email: F.email,
    priceRange: '$25–$260',
    currenciesAccepted: 'CAD',
    address: { '@type': 'PostalAddress', streetAddress: F.street, addressLocality: F.city, addressRegion: F.region, postalCode: F.postal, addressCountry: 'CA' },
    geo: { '@type': 'GeoCoordinates', latitude: F.lat, longitude: F.lng },
    hasMap: F.maps,
    areaServed: F.areas.map(a => ({ '@type': 'City', name: a + ', Ontario' })),
    openingHoursSpecification: F.hours.filter(h => h.open).map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map(d => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d]),
      opens: h.open, closes: h.close,
    })),
    award: F.awards,
    sameAs: [F.instagram, F.facebook, F.linkedin, F.maps],
    founder: { '@type': 'Person', name: F.person, jobTitle: 'Registered Massage Therapist', sameAs: [F.instagram, F.linkedin] },
    potentialAction: { '@type': 'ReserveAction', target: F.janeStaff, name: 'Book online' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Treatments',
      itemListElement: Object.values(PRICES).flatMap(g => g.rows.map(r => ({
        '@type': 'Offer', price: r.price, priceCurrency: 'CAD',
        itemOffered: { '@type': 'Service', name: `${g.label}, ${r.min} minutes` },
      }))),
    },
  };
}

export function head(p) {
  const url = SITE + (p.path || '');
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0a1a33">
${NOINDEX ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(F.name)}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.ogDescription || p.description)}">
<meta property="og:image" content="${SITE}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Matthew Drag Sports Massage Therapy, Newmarket. Should have stretched before that 6 mile run.">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_CA">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${p.base}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p.base}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anybody:ital,wdth,wght@0,62..112,400..900;1,62..112,700..900&family=Sacramento&family=Schibsted+Grotesk:ital,wght@0,400..700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${p.base}assets/css/site.css?v=${V}">
${(p.ld || []).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>`;
}

export function header(p) {
  const nav = NAV.map(([h, t]) => `<li><a href="${p.base}${h}">${t}</a></li>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    <a class="brand" href="${p.base || './'}" aria-label="${esc(F.name)}, home">
      <span class="brand-chip"><img src="${p.base}assets/img/logo-mark.png" alt="" width="40" height="40"></span>
      <span class="brand-words"><b>Matthew Drag</b><small>Sports Massage Therapy</small></span>
    </a>
    <nav class="nav" aria-label="Main"><ul>${nav}</ul></nav>
    <span class="open-chip" data-open-chip hidden></span>
    <a class="btn btn-neon btn-sm header-book" href="${F.janeStaff}" data-book-staff target="_blank" rel="noopener">Book</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" data-menu><span></span><span></span><span class="sr">Menu</span></button>
  </div>
  <div class="mile-bar" aria-hidden="true"><i data-mile-fill></i><span data-mile-label>0.0 mi</span></div>
</header>
<div class="drawer" id="drawer" data-drawer hidden>
  <ul>${nav}</ul>
  <a class="btn btn-neon" href="${F.janeStaff}" target="_blank" rel="noopener">Book online</a>
  <a class="btn btn-ghost-light" href="tel:${F.tel}">${icon.phone} Call or text ${F.phone}</a>
</div>
<aside class="mile-rail" aria-hidden="true" data-mile-rail>
  <div class="rail-track"><i class="rail-fill" data-rail-fill></i><i class="rail-runner" data-rail-runner></i></div>
  <ol>${[0, 1, 2, 3, 4, 5, 6].map(m => `<li style="--m:${m}"><span>${m}</span></li>`).join('')}</ol>
</aside>`;
}

export function footer(p) {
  const hours = F.hours.map(h => `<li><span>${h.label}</span><span>${h.text}</span></li>`).join('');
  return `<footer class="site-footer">
  <div class="wrap">
    <p class="finish" aria-hidden="true"><span class="finish-mi">6.0 mi</span> You made it. <em>Now go stretch.</em></p>
    <div class="foot-grid">
      <div>
        <p class="foot-name">${esc(F.name)}</p>
        <p>${F.street}, ${F.city}, ${F.region} ${F.postal}<br>
        <a href="tel:${F.tel}">${F.phone}</a> (call or text)<br>
        <a href="mailto:${F.email}">${F.email}</a></p>
        ${socials()}
      </div>
      <div>
        <p class="foot-h">Hours</p>
        <ul class="hours">${hours}</ul>
      </div>
      <div>
        <p class="foot-h">Treatments</p>
        <ul class="foot-links">
          <li><a href="${p.base}#prices">Massage therapy prices</a></li>
          <li><a href="${p.base}fascial-stretch-therapy/">Fascial stretch therapy</a></li>
          <li><a href="${p.base}mobile-massage/">Mobile massage (home visits)</a></li>
          <li><a href="${p.base}recovery/">NormaTec &amp; Hyperice recovery</a></li>
          <li><a href="${p.base}#teams">Teams &amp; events</a></li>
        </ul>
      </div>
    </div>
    <p class="fine">© <span data-yr>2026</span> ${esc(F.name)}. Serving ${F.areas.slice(0, -1).join(', ')} and ${F.areas.at(-1)}. <a href="https://jdix.ca" rel="noopener">Website designed by jdix.ca</a></p>
  </div>
</footer>
<script src="${p.base}assets/js/data.js?v=${V}"></script>
<script src="${p.base}assets/js/site.js?v=${V}" defer></script>
</body>
</html>`;
}

// Bib-style price cards for one group (static; JS swaps first/returning links)
export function bibs(key, opts = {}) {
  const g = PRICES[key];
  return `<ul class="bibs" data-group="${key}">${g.rows.map((r, i) => `
  <li class="bib${opts.pop === r.min ? ' bib-pop' : ''}">
    <span class="bib-top">${g.short.toUpperCase()}</span>
    <span class="bib-num">${r.min}<small>min</small></span>
    <span class="bib-price">${r.from ? '<small>from</small> ' : ''}$${r.price}</span>
    <a class="bib-book" href="${jane(r.first)}" data-first="${jane(r.first)}" data-back="${jane(r.back)}" target="_blank" rel="noopener" aria-label="Book ${r.min} minute ${g.label.toLowerCase()}, $${r.price}">Book ${r.min}</a>
  </li>`).join('')}
</ul>`;
}

export function visitToggle() {
  return `<div class="visit-toggle" role="radiogroup" aria-label="Have you been to Matthew before?">
  <button type="button" role="radio" aria-checked="true" data-visit="first">First visit</button>
  <button type="button" role="radio" aria-checked="false" data-visit="back">Been here before</button>
</div>`;
}
