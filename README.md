# Nensi & Jeroen — Wedding Website
## 5 Sept 2026 · Agroturizëm Gjepali, Albania

---

### Getting Started

**No installation required.** Open `index.html` directly in your browser.

```
Double-click index.html
— or —
Drag index.html into your browser window
```

That's it. The site runs entirely locally.

---

### Project Structure

```
wedding-site/
│
├── index.html                  ← Main homepage (open this)
│
├── styles/
│   └── main.css                ← All styles (one file, fully commented)
│
├── scripts/
│   └── main.js                 ← Countdown, accordion, RSVP form, scroll effects
│
├── pages/
│   ├── travel.html             ← Travel guide: airports, transfers, getting around
│   └── accommodation.html      ← Where to stay: curated hotel recommendations
│
└── assets/
    ├── svg/
    │   └── monogram.svg        ← N & J arch monogram
    ├── icons/
    │   └── heart.svg           ← Decorative heart icon
    └── illustrations/
        └── botanical.svg       ← Olive branch / botanical illustration
```

---

### Customisation Guide

#### Replace Couple Names
Names are set to `Nensi` and `Jeroen` across the HTML files.

#### Update Wedding Date
In `scripts/main.js`, line 6:
```js
const weddingDate = new Date('2026-09-05T16:00:00');
```
Change to your actual date and ceremony time.

#### Update Venue Address
Venue details are set to `Agroturizëm Gjepali` in Gjepalaj/Shijak, Albania.

#### RSVP Form
The RSVP form is configured for Netlify Forms. It uses static form fields for Netlify's build-time scanner and submits with a URL-encoded `fetch()` request in `scripts/main.js`.

#### Colours
All colours are defined as CSS variables at the top of `styles/main.css`:
```css
:root {
  --pomegranate: #9B1B30;
  --apricot:     #FF9E61;
  --champagne:   #F5E6D8;
  --wine:        #6E1223;
  --gold:        #C9A96E;
  ...
}
```

#### Fonts
Fonts load from Google Fonts (requires internet). The stack falls back gracefully to Georgia/serif for offline use. To use locally, download the font files and update the `@import` in `styles/main.css`.

---

### Browser Support
Modern browsers (Chrome, Firefox, Safari, Edge). IE not supported.

### No Dependencies
- No npm, no build tools, no frameworks
- No jQuery
- No external CSS libraries
- Internet connection only needed for Google Fonts

---

*Made with love & a great deal of espresso.*
