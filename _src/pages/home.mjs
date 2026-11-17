import { F, PRICES, SITE, esc, icon, bibs, visitToggle, socials, businessLd, jane } from '../site.mjs';

const ZONES = [
  ['neck', 'Neck & shoulders', 100, 84],
  ['upper', 'Upper back', 100, 122],
  ['lower', 'Lower back', 100, 178],
  ['hips', 'Hips & glutes', 128, 214],
  ['thighs', 'Quads & hamstrings', 82, 262],
  ['knees', 'Knees', 118, 318],
  ['calves', 'Calves & shins', 82, 362],
  ['feet', 'Feet & ankles', 121, 408],
];

const faqs = [
  ['What happens at my first massage?', `You fill out a health history form (you can do it online through Jane before you arrive) and talk through what's bothering you and what you're training for. Matthew then steps out so you can get on the table and get comfortable, and knocks before he comes back in.`],
  ['Do you direct bill my insurance?', `Yes. Matthew direct bills most major insurers, so you only pay the part your plan doesn't cover. If a claim can't go through, you get an official receipt to submit yourself. Coverage depends on your own plan.`],
  ['Which insurance companies do you bill?', `${F.insurers.join(', ')}, and many more. Not sure about yours? Call or text ${F.phone} and ask.`],
  ['Is fascial stretch therapy covered by my benefits?', `Fascial stretch therapy (FST) is billed as massage therapy, so it uses your RMT coverage the same way a massage does.`],
  ['Do you come to my home?', `Yes. Home visits are 60, 75 or 90 minutes, from $135. Matthew brings the table, to your home or wherever you train. The price varies with the distance.`],
  ['I don\'t have insurance. Is there a discount?', `Yes. Clients without health insurance can ask about a cash discount on 30, 45, 60, 75, 90 and 120 minute treatments.`],
  ['Do you work with teams and events?', `Yes, individuals, competitive athletes and sports teams, plus corporate and community events, paid or pro bono. Send the date and location through the contact form below.`],
  ['Do you sell gift certificates?', `Yes. Ask about gift certificates by call, text or email. They make a good "treat yo' self" for the runner in your life.`],
  ['What do you recommend for recovery at home?', `Medistik extra-strength cream: loosen tight muscles before activity, then soothe sore muscles and joints after. It's available to buy at the clinic after your session.`],
];

export const home = {
  path: '',
  base: '',
  title: 'Matthew Drag RMT | Sports Massage Therapy in Newmarket, ON',
  description: 'Sports, deep tissue and fascial stretch massage at 407 Eagle St, Newmarket, or at home. Reader Favourite 2023–25. Direct billing. Book online.',
  ogTitle: 'Matthew Drag RMT | Sports massage in Newmarket',
  ogDescription: 'From one athlete to another: sports massage, fascial stretch and NormaTec recovery in Newmarket. Book online.',
  ld: [businessLd(), {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }],
  body: () => `
<main id="main">

<section class="hero" data-mile="0" aria-labelledby="hero-h">
  <svg class="lanes" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-50 640 C 300 520, 700 520, 1250 300"/><path d="M-50 690 C 300 570, 700 570, 1250 350"/>
    <path d="M-50 740 C 300 620, 700 620, 1250 400"/><path d="M-50 790 C 300 670, 700 670, 1250 450"/>
  </svg>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="neon" aria-label="${esc(F.tagline)}"><span class="neon-a">Should have stretched</span> <span class="neon-b">before that 6 mile run</span></p>
      <h1 id="hero-h">Sports massage therapy in Newmarket, <em>from one athlete to another.</em></h1>
      <p class="lede">Deep tissue, sports massage, fascial stretch therapy and cupping at 407 Eagle St, or at your home. NormaTec and Hyperice recovery on site. Direct billing to most insurers.</p>
      <div class="hero-cta">
        <a class="btn btn-neon" href="${F.janeStaff}" target="_blank" rel="noopener" data-book-staff>Book online ${icon.arrow}</a>
        <a class="btn btn-ghost-light" href="tel:${F.tel}">${icon.phone} Call or text ${F.phone}</a>
      </div>
      <ul class="proof">
        <li><b>Reader Favourite</b><span>NewmarketToday '23 · '24 · '25</span></li>
        <li><a href="${F.reviews}" target="_blank" rel="noopener"><b>400+ five-star</b><span>Google reviews</span></a></li>
        <li><b>Direct billing</b><span>To most major insurers</span></li>
      </ul>
    </div>
    <figure class="hero-photo">
      <img src="assets/img/sports-massage-athlete.webp" width="800" height="800" alt="Matthew Drag working on a fighter's leg on a massage table in a gym" fetchpriority="high">
      <figcaption class="bib-tag" aria-hidden="true"><span>No.</span>407<small>Eagle St · Newmarket</small></figcaption>
    </figure>
  </div>
</section>

<section class="section body-map" id="body-map" data-mile="1" aria-labelledby="map-h">
  <div class="wrap">
    <header class="sec-head">
      <p class="mile-tag">Mile 1</p>
      <h2 id="map-h">Where's it bugging you?</h2>
      <p>Tap where it hurts. You'll get a treatment, a length, a recovery add-on and a button that books exactly that.</p>
    </header>
    <div class="map-grid">
      <div class="figure-wrap">
        <svg class="figure" viewBox="0 0 200 440" role="img" aria-label="Body outline with tappable areas">
          <g class="fig-body">
            <ellipse cx="100" cy="38" rx="21" ry="25" class="fig-head"/>
            <path d="M58 92 Q100 70 142 92 L132 206 Q100 222 68 206 Z"/>
            <path d="M64 96 Q46 160 38 236" class="fig-limb"/><path d="M136 96 Q154 160 162 236" class="fig-limb"/>
            <path d="M84 214 Q80 320 80 420" class="fig-leg"/><path d="M116 214 Q120 320 120 420" class="fig-leg"/>
          </g>
          ${ZONES.map(([k, label, x, y]) => `<g class="spot" aria-hidden="true" data-spot="${k}" transform="translate(${x} ${y})"><circle r="15" class="spot-halo"/><circle r="6.5" class="spot-dot"/></g>`).join('')}
        </svg>
      </div>
      <div class="map-side">
        <ul class="zone-list" role="list">
          ${ZONES.map(([k, label]) => `<li><button type="button" data-zone="${k}" aria-pressed="false">${label}</button></li>`).join('')}
          <li><button type="button" data-zone="race" aria-pressed="false">Everything. I just raced.</button></li>
        </ul>
        <div class="zone-card" data-zone-card aria-live="polite">
          <p class="zone-empty">Pick a spot on the body or from the list.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section services" id="services" data-mile="2" aria-labelledby="svc-h">
  <div class="wrap">
    <header class="sec-head">
      <p class="mile-tag">Mile 2</p>
      <h2 id="svc-h">What Matthew does</h2>
      <p>One therapist, one goal: help you move better, recover faster and train harder. Book 30, 45, 60, 75, 90 or 120 minutes, once for relief or monthly to stay ahead of it.</p>
    </header>
    <div class="svc-grid">
      <article class="svc svc-wide">
        <img src="assets/img/clinic-treatment-room.webp" width="686" height="574" alt="Treatment room at 407 Eagle Street with a massage table, plants and a forest mural" loading="lazy">
        <div><h3>Massage therapy at the clinic</h3>
        <p>Deep tissue, sports massage, relaxation, prenatal and functional massage at 407 Eagle St in Newmarket. Cupping can be worked into any session; just ask.</p>
        <a class="more" href="#prices">See prices ${icon.arrow}</a></div>
      </article>
      <article class="svc">
        <img src="assets/img/fascial-stretch-therapy.webp" width="382" height="510" alt="Matthew stretching a client's hip and leg on the table during fascial stretch therapy" loading="lazy">
        <div><h3>Fascial stretch therapy</h3>
        <p>Gentle, assisted stretching and traction for tight hips, backs and shoulders. Billed as massage therapy.</p>
        <a class="more" href="fascial-stretch-therapy/">About FST ${icon.arrow}</a></div>
      </article>
      <article class="svc">
        <img src="assets/img/cupping-therapy.webp" width="623" height="800" alt="Silicone cups placed along a client's back during cupping therapy" loading="lazy">
        <div><h3>Cupping</h3>
        <p>Added to your massage to lift and loosen stubborn tissue across the back, shoulders and legs.</p>
        <a class="more" href="#prices">Book a massage ${icon.arrow}</a></div>
      </article>
      <article class="svc">
        <img src="assets/img/normatec-compression-boots.webp" width="700" height="710" alt="NormaTec compression boots laid out on the treatment table" loading="lazy">
        <div><h3>NormaTec &amp; Hyperice recovery</h3>
        <p>Compression boots for your legs plus hot and cold contrast for your shoulder. 15 or 30 minutes, from $25.</p>
        <a class="more" href="recovery/">Recovery options ${icon.arrow}</a></div>
      </article>
      <article class="svc">
        <img src="assets/img/community-soccer-tournament.webp" width="799" height="676" alt="Matthew holding his massage therapy banner in a soccer goal at an indoor field" loading="lazy">
        <div><h3>Mobile massage</h3>
        <p>He brings the table to your home, or wherever you train. 60, 75 or 90 minutes.</p>
        <a class="more" href="mobile-massage/">Home visits ${icon.arrow}</a></div>
      </article>
    </div>
  </div>
</section>

<section class="section prices" id="prices" data-mile="3" aria-labelledby="price-h">
  <div class="wrap">
    <header class="sec-head sec-head-row">
      <div>
        <p class="mile-tag">Mile 3</p>
        <h2 id="price-h">Prices &amp; booking</h2>
        <p>Pick your length and book straight into Matthew's calendar on Jane. Every link goes to the exact appointment, so there's no hunting through a list.</p>
      </div>
      ${visitToggle()}
    </header>
    <div class="tabs" role="tablist" aria-label="Treatment type">
      ${Object.entries(PRICES).map(([k, g], i) => `<button type="button" role="tab" id="tab-${k}" aria-controls="panel-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${g.label}</button>`).join('')}
    </div>
    ${Object.entries(PRICES).map(([k, g], i) => `<div class="tab-panel" role="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}"${i ? ' hidden' : ''}>
      <p class="panel-note">${g.note}</p>
      ${bibs(k, { pop: k === 'massage' ? 60 : 0 })}
    </div>`).join('\n')}
    <p class="price-foot"><span data-visit-hint>First time? Book a first visit. It leaves time for your health history.</span> No insurance? Ask about the cash discount.</p>
  </div>
</section>

<section class="section benefits" id="benefits" data-mile="4" aria-labelledby="ben-h">
  <div class="wrap ben-grid">
    <div>
      <p class="mile-tag">Mile 4</p>
      <h2 id="ben-h">Use your benefits before they reset</h2>
      <p class="countdown" data-countdown>If your plan resets on January 1, unused massage dollars don't roll over. December fills up fast.</p>
      <h3>Direct billing</h3>
      <p>Matthew bills your insurer directly, so you only pay what your plan doesn't cover:</p>
      <ul class="chips">${F.insurers.map(i => `<li>${i}</li>`).join('')}<li>and many more</li></ul>
    </div>
    <div class="calc" data-calc>
      <h3>What will my coverage buy?</h3>
      <label for="cov">Massage dollars left on my plan</label>
      <div class="money"><span>$</span><input id="cov" type="number" inputmode="numeric" min="0" step="10" value="500" data-cov></div>
      <div class="quick">${[250, 500, 750, 1000].map(v => `<button type="button" data-cov-set="${v}">$${v}</button>`).join('')}</div>
      <div class="calc-out" data-calc-out aria-live="polite"></div>
      <p class="fine-print">Uses Matthew's 2026 prices. Check your plan for per-visit limits.</p>
    </div>
  </div>
</section>

<section class="section race" id="race" data-mile="4.5" aria-labelledby="race-h">
  <div class="wrap">
    <header class="sec-head">
      <p class="mile-tag">Mile 4.5</p>
      <h2 id="race-h">Got a race or a big game coming?</h2>
      <p>Enter the date. You'll get a simple plan: when to get your last deep session, when to loosen up, and when to flush it out after.</p>
    </header>
    <form class="race-form" data-race onsubmit="return false">
      <label>Event date <input type="date" data-race-date required></label>
      <label>Event
        <select data-race-type>
          <option value="short">5K or 10K</option>
          <option value="half" selected>Half marathon</option>
          <option value="full">Marathon</option>
          <option value="hyrox">HYROX</option>
          <option value="game">Tournament or big game</option>
        </select>
      </label>
    </form>
    <ol class="race-plan" data-race-plan aria-live="polite"></ol>
    <p class="fine-print">General timing many athletes use. Matthew will tailor it to you at your visit.</p>
  </div>
</section>

<section class="section about" id="about" data-mile="5" aria-labelledby="about-h">
  <div class="wrap about-grid">
    <figure class="about-photo">
      <img src="assets/img/matthew-drag-rmt-portrait.webp" width="408" height="510" alt="Matthew Drag, RMT, smiling outdoors in a light blue polo" loading="lazy">
    </figure>
    <div class="about-copy">
      <p class="mile-tag">Mile 5</p>
      <h2 id="about-h">From one athlete to another</h2>
      <p class="big">Sports have shaped Matthew's life: soccer, hockey, long-distance running, and lately HYROX. Pushing his own body through every kind of training is how he got fascinated with how it moves, and how it recovers.</p>
      <p>He loves working with athletes to find the root cause of their pain or weakness, starting from their history. And he keeps adding to his toolkit, from fascial stretch therapy to NormaTec and Hyperice recovery.</p>
      <ul class="creds">
        <li><b>RMT</b><span>Registered Massage Therapist</span></li>
        <li><b>FST Level 1</b><span>Fascial stretch therapy</span></li>
        <li><b>Georgian College</b><span>Graduate</span></li>
        <li><b>3 years running</b><span>NewmarketToday Reader Favourite, 2023, 2024, 2025</span></li>
      </ul>
      <a class="btn btn-ink" href="${F.janeStaff}" target="_blank" rel="noopener" data-book-staff>Book with Matthew ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="section reviews" aria-labelledby="rev-h">
  <div class="wrap">
    <header class="sec-head sec-head-row">
      <div><h2 id="rev-h">What clients say</h2>
      <p>Over 400 five-star reviews on Google. Three of them:</p></div>
      <a class="btn btn-ink-line" href="${F.reviews}" target="_blank" rel="noopener">Read them on Google ${icon.arrow}</a>
    </header>
    <div class="quotes">
      <blockquote><p>Matthew is far more than just your average RMT – he continues to add to his skill sets through personal continued learnings and adds additional tools to his arsenal that your average RMT will likely not have.</p><footer>Giancarlo C.</footer></blockquote>
      <blockquote><p>I have been Matthew's customer for over four years now and I am always impressed with his availability, professionalism, and work ethic… you will come out feeling like a million bucks again!</p><footer>Mark B.</footer></blockquote>
      <blockquote><p>My 12 year old son is a competitive soccer player… Now, my son goes to Matthew weekly and can't wait until his next session. It helps relieve the muscle pain from intense soccer and to recover more quickly.</p><footer>Melissa &amp; Julian</footer></blockquote>
    </div>
  </div>
</section>

<section class="section teams" id="teams" aria-labelledby="team-h">
  <div class="wrap teams-grid">
    <div>
      <h2 id="team-h">Teams, clubs &amp; events</h2>
      <p>Massage and recovery for individuals, competitive athletes and whole teams, plus corporate and community events, paid or pro bono. Some of the community events Matthew has worked:</p>
      <ul class="chips chips-dark">
        <li>Hockey for Grace</li><li>Mercy 4 Mankind run</li><li>Conrad Rollings Memorial Tournament</li><li>Southlake Regional Health Centre</li><li>Newmarket Food Pantry</li><li>LOFT</li><li>GoodLife Fitness</li>
      </ul>
      <a class="btn btn-neon" href="#contact" data-prefill="Team or event">Ask about your event ${icon.arrow}</a>
    </div>
    <div class="team-photos">
      <img src="assets/img/goodlife-team-recovery-event.webp" width="799" height="604" alt="A large group in matching black shirts flexing at a GoodLife Fitness event Matthew worked" loading="lazy">
      <img src="assets/img/mercy-4-mankind-run.webp" width="800" height="688" alt="Matthew in front of the Mercy 4 Mankind run backdrop" loading="lazy">
    </div>
  </div>
</section>

<section class="section gear" aria-labelledby="gear-h">
  <div class="wrap">
    <header class="sec-head">
      <h2 id="gear-h">The best in recovery</h2>
      <p>Tools for the spots massage alone can't always reach. Ask Matthew which one fits your injury.</p>
    </header>
    <div class="gear-grid">
      <article><img src="assets/img/hyperice-x-knee.webp" width="489" height="798" alt="Hyperice X contrast therapy device strapped around a knee" loading="lazy"><h3>Hyperice X knee</h3><p>Hot, cold and contrast therapy for a sore or recently injured knee.</p></article>
      <article><img src="assets/img/hyperice-x-shoulder.webp" width="559" height="800" alt="Box of the Hyperice X shoulder contrast therapy device" loading="lazy"><h3>Hyperice X shoulder</h3><p>Contrast therapy for a recent injury or a frozen shoulder. Included with NormaTec sessions.</p></article>
      
      <article><img src="assets/img/medistik-recovery-cream.webp" width="600" height="618" alt="Three bottles of Medistik professional recovery cream" loading="lazy"><h3>Medistik</h3><p>Extra-strength cream to prime, perform and restore. Buy it at the clinic after your session.</p></article>
      <article><img src="assets/img/gift-certificate.webp" width="600" height="800" alt="Matthew Drag gift certificate cards reading Treat Yo' Self" loading="lazy"><h3>Gift certificates</h3><p>Give the gift of recovery. Call, text or email to get one.</p></article>
    </div>
  </div>
</section>

<section class="section insta" id="instagram" data-mile="5.5" aria-labelledby="ig-h">
  <div class="wrap">
    <header class="sec-head sec-head-row">
      <div><p class="mile-tag">Mile 5.5</p>
      <h2 id="ig-h">Out there too</h2>
      <p>Races, HYROX finishes, clinic news and recovery tips on Instagram.</p></div>
      <a class="btn btn-ink-line" href="${F.instagram}" target="_blank" rel="noopener">${icon.ig} Follow ${F.igHandle}</a>
    </header>
    <ul class="ig-grid" data-ig>
      ${[
        ['DfDPCaBSvAL', 'Matthew holding his 2025 Reader Favourite certificate at the NewmarketToday awards'],
        ['DYfOzllBwNM', 'Matthew flexing in front of his HYROX finish time of 1:11:18'],
        ['DZP4qCIFTEw', 'Matthew smiling at the finish of a road race wearing bib 67'],
        ['DbtPmTeFYmD', 'Matthew at a race start line wearing bib 1054'],
        ['DdP0n_AlZ7B', 'Matthew flexing in a parking lot after an evening race'],
        ['DX5NaOoFeSr', 'Matthew at the start line of a downtown half marathon'],
      ].map(([id, alt]) => `<li><a class="ig-tile" href="https://www.instagram.com/p/${id}/" target="_blank" rel="noopener"><img src="assets/img/ig/${id}.webp" width="480" height="640" alt="${alt}" loading="lazy"></a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section faq" id="faq" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    <header class="sec-head"><h2 id="faq-h">Questions people ask</h2>
    <p>Still wondering? Call or text <a href="tel:${F.tel}">${F.phone}</a>.</p></header>
    <div class="faq-list">
      ${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section contact" id="contact" data-mile="5.8" aria-labelledby="contact-h">
  <div class="wrap contact-grid">
    <div>
      <p class="mile-tag">Mile 6</p>
      <h2 id="contact-h">Find the clinic</h2>
      <p class="addr">${F.street}<br>${F.city}, ${F.region} ${F.postal}</p>
      <p class="open-line" data-open-line></p>
      <ul class="hours hours-lg">${F.hours.map(h => `<li data-days="${h.days.join(',')}"><span>${h.label}</span><span>${h.text}</span></li>`).join('')}</ul>
      <div class="contact-btns">
        <a class="btn btn-ink" href="${F.directions}" target="_blank" rel="noopener">Get directions ${icon.arrow}</a>
        <a class="btn btn-ink-line" href="tel:${F.tel}">${icon.phone} Call ${F.phone}</a>
        <a class="btn btn-ink-line" href="sms:${F.tel}?&body=${encodeURIComponent('Hi Matthew, I found you on your website. ')}">Text Matthew</a>
      </div>
      <p>Coming for the first time? Fill out your health history and intake form on Jane before you arrive.</p>
      ${socials('socials socials-ink')}
    </div>
    <form class="contact-form" data-contact novalidate>
      <h3>Send a message</h3>
      <label>Your name <input name="name" autocomplete="name" required></label>
      <label>Email or phone <input name="reply" autocomplete="on" required></label>
      <label>About
        <select name="topic">
          <option>Booking question</option><option>Insurance or direct billing</option><option>Home visit</option><option>Team or event</option><option>Gift certificate</option><option>Something else</option>
        </select>
      </label>
      <label>Message <textarea name="message" rows="4" required></textarea></label>
      <button class="btn btn-neon" type="submit">Send to Matthew ${icon.arrow}</button>
      <p class="form-status" data-form-status aria-live="polite"></p>
      <p class="fine-print">Opens your email app with the message ready to send to ${F.email}.</p>
    </form>
  </div>
</section>

</main>`,
};
