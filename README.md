# Matthew Drag Sports Massage Therapy — redesign

Redesign of https://matthewdragrmt.com/ (current site is a one-page Canva site).
Static site, no build step needed to view; `node _src/build.mjs` regenerates every page
from `_src/` (pages share one header, footer and head template).

## Point of view

- **Who he is to his clients:** the RMT who is also out there running the half, racing HYROX
  and playing Sunday soccer. Not a spa. "From one athlete to another."
- **What they worry about before booking:** "Will this actually fix my calf / knee / back,
  or is it just a nice rub?", "Will my benefits cover it?", "Can I get in before my race?",
  "Which of these 30 options do I book?"
- **Guiding word:** *ready* (race-ready, game-ready, back-to-it ready).
- **Signature details:** his own tagline lit up like the yellow neon sign in his clinic;
  the page scrolls as a 6-mile run (mile markers on the side, "6.0 mi, now go stretch" at the end);
  a "Where's it bugging you?" body map that answers with a treatment, a length, a recovery
  add-on and a Book button straight into the right Jane slot; a race-week planner;
  a year-end benefits countdown + "what does my coverage buy" calculator.
- **Must not look like:** a spa (no lotus, candles, pastel sage), and not a generic gym template.
  Colours come from his logo (navy + teal) and his clinic's neon sign (yellow).

## Facts sheet (everything on the page comes from here)

Sources: matthewdragrmt.com, his Jane page (matthewdragmassagetherapy.janeapp.com),
Instagram @matthewdrag_rmt, his printed banners and certificates (photos on the old site).

- Business: Matthew Drag Sports Massage Therapy. Person: Matthew Drag, RMT.
- Tagline: "Should have stretched before that 6 mile run".
- Address: 407 Eagle St, Newmarket, ON L3Y 1K5. Geo 44.0496904, -79.4597685.
- Phone (call or text): 905-716-4419. Email: matthew-drag@hotmail.com.
- Hours: Mon–Fri 8 AM–9 PM, Sat 9:30 AM–3:30 PM, Sun: contact him.
- Area served (his words): Newmarket, Richmond Hill, King City, Vaughan, Aurora. Mobile visits come to you.
- Booking: Jane. Staff id 1. Disciplines: 1 Initial, 2 Follow-up, 3 Home visits, 4 Normatec/Hyperice, 5 FST.
- Prices (Jane, 2026-11-16): massage 30 $80, 45 $95, 60 $130, 75 $140, 90 $170, 120 $260
  (same for first and follow-up). FST 30 $80, 45 $95, 60 $130 (billed as massage therapy).
  Home 60 $135, 75 $150, 90 $180 ("price varies depending on KM"). Normatec legs + Hyperice X
  shoulder 15 $25, 30 $35. Cash discount offered to clients without insurance.
- Services (his list): deep tissue, sports massage, relaxation, fascial stretch therapy, prenatal,
  functional massage, cupping; clinic or mobile; NormaTec compression, Hyperice X knee + shoulder,
  Normatec hip attachment; teams and events (paid or pro bono); gift certificates; Medistik for sale.
- Direct billing: Alberta Blue Cross, Canada Life, Chambers of Commerce Group Insurance Plan,
  Desjardins, Manulife, Sun Life, Telus AdjudiCare "and many more".
- Proof: NewmarketToday Reader Favourite 2023, 2024 and 2025 (certificates); "400+ five-star
  Google reviews" (his claim, links to Google); Georgian College diploma (photo); FST Level 1 (IG bio).
- Community events shown on his site: Hockey for Grace, LOFT, Southlake Regional Health Centre,
  Newmarket Food Pantry, Mercy 4 Mankind, Conrad Rollings Memorial Tournament, GoodLife Fitness team.
- Social: instagram.com/matthewdrag_rmt, facebook.com/MatthewDragRMT,
  linkedin.com/in/matthew-drag-49b091107, Google Maps listing.

## Maintenance

| What | Where |
|---|---|
| Instagram feed | `BEHOLD_FEED_ID` at the top of `assets/js/site.js`. Until set, the 6 saved posts in `assets/img/ig/` show. Free Behold plan = 6 posts. Add post ids to `IG_HIDE` to hide one. |
| Prices / Jane links | `PRICES` in `assets/js/site.js` (and the static table in `_src/pages/home.mjs` for no-JS) |
| Hours | `HOURS` in `assets/js/site.js` + `_src/site.mjs` (JSON-LD + footer) |
| Contact form | mailto to his email; set `FORM_ENDPOINT` in `assets/js/site.js` for a real form service |
| Go live | in `_src/site.mjs` set `SITE` to `https://matthewdragrmt.com/` and `NOINDEX = false`, run `node _src/build.mjs` |

## Open questions for Matthew (not shown on the site)

1. CMTO registration number? (Good to show next to "RMT".)
2. Year he started practising (for "since 20XX" in About and structured data)?
3. Body-map and race-week suggestions are sensible general guidance written for this demo. He should
   read and adjust them to his own advice.
4. The 75-min home visit is listed on Jane as 65 minutes long. Typo?
5. How much is the cash discount? (Site only says "ask".)
6. Is Hyperice X knee bookable, or ask-only? (Jane only lists the shoulder.)
7. Is "400+ five-star Google reviews" still the right number?
8. Gift certificates: can people buy them online, or by call/text only?
9. CMTO advertising rules: his current site shows three named client quotes. Confirm he's comfortable
   keeping them (the redesign keeps them plus the link to his Google reviews). Drop the "What clients say"
   section if not.
10. Is direct billing available for home visits? (Site says "ask".)
11. Real proof on the page comes only from his own site, Jane page, IG and certificates. The FAQ wording
    about his first-visit routine and official receipts is from his current site.
