import { F, SITE, esc, icon, bibs, visitToggle } from '../site.mjs';

function servicePage({ path, title, description, kicker, h1, lede, img, alt, w, h, priceKey, sections, faqs, serviceName, serviceType }) {
  return {
    path, base: '../', title, description,
    ld: [
      {
        '@context': 'https://schema.org', '@type': 'Service', name: serviceName, serviceType,
        description, url: SITE + path,
        provider: { '@id': SITE + '#business', '@type': 'MedicalBusiness', name: F.name, telephone: F.tel,
          address: { '@type': 'PostalAddress', streetAddress: F.street, addressLocality: F.city, addressRegion: F.region, postalCode: F.postal, addressCountry: 'CA' } },
        areaServed: F.areas.map(a => ({ '@type': 'City', name: a + ', Ontario' })),
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: serviceName, item: SITE + path },
        ],
      },
    ],
    body: () => `
<main id="main">
<section class="hero hero-sub" data-mile="0" aria-labelledby="hero-h">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="crumbs"><a href="../">Home</a> <span aria-hidden="true">/</span> ${esc(serviceName)}</p>
      <p class="eyebrow">${kicker}</p>
      <h1 id="hero-h">${h1}</h1>
      <p class="lede">${lede}</p>
      <div class="hero-cta">
        <a class="btn btn-neon" href="#prices">See times &amp; book ${icon.arrow}</a>
        <a class="btn btn-ghost-light" href="tel:${F.tel}">${icon.phone} ${F.phone}</a>
      </div>
    </div>
    <figure class="hero-photo hero-photo-sm">
      <img src="../assets/img/${img}" width="${w}" height="${h}" alt="${alt}" fetchpriority="high">
    </figure>
  </div>
</section>

${sections.map((s, i) => `<section class="section prose-sec${i % 2 ? ' alt' : ''}" data-mile="${(i + 1) * 1.5}">
  <div class="wrap prose">
    <h2>${s.h}</h2>
    ${s.body}
  </div>
</section>`).join('\n')}

<section class="section prices" id="prices" data-mile="5" aria-labelledby="price-h">
  <div class="wrap">
    <header class="sec-head sec-head-row">
      <div><h2 id="price-h">Times &amp; prices</h2>
      <p>Each button opens that exact appointment in Matthew's Jane calendar.</p></div>
      ${priceKey === 'home' || priceKey === 'recovery' ? '' : visitToggle()}
    </header>
    ${bibs(priceKey, { pop: priceKey === 'recovery' ? 30 : 60 })}
    <p class="price-foot">Direct billing to most insurers. No insurance? Ask about the cash discount.</p>
  </div>
</section>

<section class="section faq" data-mile="5.6" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    <header class="sec-head"><h2 id="faq-h">Questions</h2>
    <p>Anything else: call or text <a href="tel:${F.tel}">${F.phone}</a>.</p></header>
    <div class="faq-list">
      ${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section next-up">
  <div class="wrap next-grid">
    <p>Not sure this is the right one? Tap where it hurts and get a suggestion.</p>
    <a class="btn btn-ink" href="../#body-map">Try the body map ${icon.arrow}</a>
  </div>
</section>
</main>`,
  };
}

export const fst = servicePage({
  path: 'fascial-stretch-therapy/',
  title: 'Fascial Stretch Therapy in Newmarket | Matthew Drag RMT',
  description: 'Fascial stretch therapy (FST) in Newmarket with Matthew Drag, RMT. Assisted stretching for tight hips, back and shoulders. Billed as massage therapy.',
  kicker: 'Fascial stretch therapy · FST Level 1',
  h1: 'Fascial stretch therapy in Newmarket',
  lede: 'Assisted, pain-free stretching on the table for stiff hips, backs, hamstrings and shoulders. It\'s billed as massage therapy, so your RMT coverage applies.',
  img: 'fascial-stretch-therapy.webp', alt: 'Matthew stretching a client\'s hip and leg on the treatment table', w: 382, h: 510,
  priceKey: 'fst', serviceName: 'Fascial stretch therapy', serviceType: 'Fascial Stretch Therapy',
  sections: [
    { h: 'What is fascial stretch therapy?', body: `<p>Fascial stretch therapy (FST) is a gentle, assisted stretching technique. It works on fascia, the connective tissue wrapped around your muscles, tendons, ligaments and joints, which plays a big role in how your body moves and feels.</p>
<p>Repetitive training, sitting all day or an old injury can leave fascia tight and restricted. That shows up as stiffness, pain and a shorter range of motion. FST uses gentle traction and targeted stretches to release those restrictions.</p>` },
    { h: 'Who it helps', body: `<ul class="ticks"><li>Runners and lifters with tight hips, hamstrings or IT bands</li><li>Hockey and soccer players who feel "locked up" through the hips and lower back</li><li>Desk workers with stiff necks, shoulders and backs</li><li>Anyone who wants to move more freely without forcing it</li></ul>
<p>You stay clothed in comfortable athletic wear. Matthew moves you through each stretch while you relax, so you get further than you could stretching on your own.</p>` },
    { h: 'FST or massage?', body: `<p>Massage is hands-on work on the muscle itself. FST moves whole joints and chains of muscle through their range. Many clients alternate the two, or ask Matthew to combine them. If you're unsure, book whichever suits your time and talk it through at the start of your visit.</p>` },
  ],
  faqs: [
    ['Is FST covered by my insurance?', 'FST is billed as massage therapy, so it uses your RMT coverage the same way a massage does. Matthew direct bills most major insurers.'],
    ['What should I wear?', 'Comfortable athletic clothes you can move in, like shorts or leggings and a t-shirt.'],
    ['How long is a session?', '30, 45 or 60 minutes. Book a first-visit FST if you\'ve never had one with Matthew.'],
  ],
});

export const mobile = servicePage({
  path: 'mobile-massage/',
  title: 'Mobile Massage, Newmarket & York Region | Matthew Drag RMT',
  description: 'Registered massage therapy at your home in Newmarket, Aurora, Richmond Hill, King City and Vaughan. 60, 75 or 90 minutes. Direct billing. Book online.',
  kicker: 'Mobile massage · home visits',
  h1: 'Mobile massage therapy at your home',
  lede: 'Matthew brings the table to you, at home or wherever you train, across Newmarket, Aurora, Richmond Hill, King City and Vaughan. 60, 75 or 90 minutes.',
  img: 'matthew-drag-soccer.webp', alt: 'Matthew Drag in soccer kit on an indoor field under his own massage therapy banner', w: 900, h: 1200,
  priceKey: 'home', serviceName: 'Mobile massage therapy', serviceType: 'Mobile Massage Therapy',
  sections: [
    { h: 'Massage without the drive', body: `<p>After a long run, a tournament or a long week, getting in the car is the last thing you want. With a home visit, Matthew sets up a full treatment table in your space and you're already home when it's done.</p>
<p>It's the same registered massage therapy as at the clinic: deep tissue, sports, relaxation or prenatal massage.</p>` },
    { h: 'Where Matthew travels', body: `<p>Home visits cover ${F.areas.slice(0, -1).join(', ')} and ${F.areas.at(-1)}. The price varies with the distance, so the listed price is a starting point. Not sure if you're in range? Call or text <a href="tel:${F.tel}">${F.phone}</a>.</p>
<p>Booking for a team, a club or an event instead? Use the <a href="../#contact">contact form</a> and include the date and place.</p>` },
  ],
  faqs: [
    ['How much is a home visit?', 'From $135 for 60 minutes, $150 for 75 minutes and $180 for 90 minutes. The price varies with the distance.'],
    ['What do I need to have ready?', 'Some floor space with room to walk around a massage table. Matthew brings the table.'],
    ['Is a home visit covered by insurance?', 'Home visits are registered massage therapy. Ask Matthew about direct billing for your plan when you book.'],
  ],
});

export const recovery = servicePage({
  path: 'recovery/',
  title: 'NormaTec & Hyperice Recovery, Newmarket | Matthew Drag RMT',
  description: 'NormaTec compression boots and Hyperice X contrast therapy in Newmarket. 15 minutes $25, 30 minutes $35. Faster recovery after training and races.',
  kicker: 'NormaTec compression · Hyperice X',
  h1: 'NormaTec &amp; Hyperice recovery in Newmarket',
  lede: 'Pull on the NormaTec boots, strap on the Hyperice X shoulder and let them work: 15 minutes for $25 or 30 minutes for $35. On its own, or before or after a massage.',
  img: 'normatec-compression-boots.webp', alt: 'NormaTec compression boots on the treatment table', w: 700, h: 710,
  priceKey: 'recovery', serviceName: 'NormaTec and Hyperice recovery', serviceType: 'Compression and contrast therapy',
  sections: [
    { h: 'What NormaTec does', body: `<p>NormaTec boots (by Hyperice) use dynamic air compression that mimics your muscles' natural pumping action. It's built to speed up recovery, increase circulation and reduce swelling in the legs.</p>
<ul class="ticks"><li>Less muscle soreness and stiffness</li><li>Less swelling and inflammation</li><li>Better circulation and lymphatic drainage</li><li>Faster recovery after workouts and races</li></ul>` },
    { h: 'Hyperice X: hot, cold and contrast', body: `<p>Every NormaTec session on Jane includes the Hyperice X shoulder for contrast (hot and cold) therapy, helpful for a recent injury or a frozen shoulder.</p>
<p>Matthew also has a Hyperice X knee for sore or recently injured knees, and a NormaTec hip attachment for quads, hamstrings, IT bands, lower back and glutes. Ask him about either one.</p>` },
  ],
  faqs: [
    ['How long is a session?', '15 minutes for $25 or 30 minutes for $35.'],
    ['Can I add it to a massage?', 'Yes. Book the massage and the recovery session back to back, or ask Matthew at your visit.'],
    ['When should I use it?', 'Many athletes use compression a day or two after a hard session or race to flush out their legs.'],
  ],
});
