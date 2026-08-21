# Butter & Bloom

Website for a bespoke cake studio. Single-page React site with a four-step cake designer, a booking diary that enforces lead times, accounts, and a deposit checkout.

**This is a front-end demo.** Accounts and payments are simulated in the browser — nothing is stored or charged. See [Making it real](#making-it-real) below.

---

## Running it locally

You need [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Edits save and reload instantly.

To check the production build before deploying:

```bash
npm run build
npm run preview
```

---

## What's where

```
index.html          Page title, meta description, social share tags
src/main.jsx        Entry point — you'll rarely touch this
src/index.css       Global reset only
src/App.jsx         The entire site
public/favicon.svg  Browser tab icon
```

Everything lives in `App.jsx`. It's long, but it's organised top to bottom:

| Section | What it holds |
|---|---|
| `CSS` | All styling. Colours are CSS variables at the top of the `.mm` block. |
| Ornament | The drawn SVG flourishes, fleurons, vine rules and rose branch |
| Data | Prices, flavours, finishes, decorations, collections, testimonials |
| `Engraving` | Draws the cake illustration from the current selections |
| `App` | Page layout and the cake designer |
| `Diary` | The booking calendar |
| `Enquire` | Contact form |
| Modals | Account, deposit checkout, collection detail |

### Changing prices

All in the data section near the top:

- `SIZES` — price per tier by diameter
- `FINISHES` — surcharge **per tier**
- `DECOR` — one-off surcharge per decoration
- `DIETARY` — `pct` is a percentage uplift (`.10` = 10%)
- `HANDOVER` — delivery options; `poa: true` shows "price on application"

The deposit percentage is in the `quote` calculation — search for `* .3`.

### Changing lead times

Search for `leadWeeks`. Currently 2 weeks for one tier, 4 for two, 8 for three, 10 for four. The calendar locks automatically to whatever you set.

### Changing studio availability

`capacityFor` decides which dates show as taken. Right now Mondays are closed and a deterministic pattern marks some dates full. Replace this with real data when there's a database behind it.

### Changing colours

The CSS variables at the top of the `.mm` block:

```
--ground   #F5EFF1   page background
--ink      #3D2B33   body text
--verdant  #4E6B4F   botanical green — ornament, rules
--rose     #B96A78   accent — buttons, selections
--gilt     #B08D4F   gold detailing
```

---

## Putting it on GitHub

```bash
git init
git add .
git commit -m "Butter & Bloom site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/butter-and-bloom.git
git push -u origin main
```

Create the empty repo on github.com first (no README, no .gitignore — this project has both).

---

## Putting it live

**Vercel** is the easiest and free for this:

1. Go to vercel.com, sign in with GitHub
2. Add New → Project → import `butter-and-bloom`
3. It detects Vite automatically. Click Deploy.
4. You get a URL like `butter-and-bloom.vercel.app` in about a minute

Every push to `main` redeploys automatically. Custom domains are free to attach under Settings → Domains.

**Netlify** works identically — build command `npm run build`, publish directory `dist`.

**GitHub Pages** works too but needs one change: uncomment the `base` line in `vite.config.js` and set it to `"/butter-and-bloom/"`, matching your repo name. Otherwise the CSS and JS won't load.

---

## Before showing a client

The demo content is invented and must be replaced:

- The six venue names under "Recommended by" — remove entirely unless there's a genuine relationship
- The three client quotes
- The Mayfair address, phone number and email
- The "120 cakes a year" and other figures in the stats band
- Social links in `SOCIALS` all point at bare instagram.com / pinterest.com etc.

Prices should be checked against what she actually charges.

---

## Making it real

The demo needs a backend for accounts, payments and a real diary. Shortest sensible path:

| Need | Suggested |
|---|---|
| Framework | Move to Next.js, or keep Vite and add a small API |
| Database | Postgres — Neon or Supabase both have free tiers |
| Accounts | Auth.js, or Supabase Auth |
| Payments | Stripe Checkout for the deposit, invoice for the balance |
| Photography | Cloudinary, or just optimised images in `public/` |
| Emails | Resend or Postmark for confirmations |

Two things that matter when you do:

**Move the pricing calculation server-side.** Right now it runs in the browser, which means anyone can edit the total before it reaches checkout.

**Never handle card details yourself.** The checkout panel is deliberately disabled. Replace it with Stripe's hosted Checkout or Elements so card numbers never touch your servers — this is what keeps PCI compliance out of scope.

Running cost at low volume is roughly £0–20/month plus Stripe's 1.5% + 20p per transaction.
