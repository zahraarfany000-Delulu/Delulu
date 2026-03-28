# Delulu Shop

Static storefront (HTML, CSS, JavaScript only) inspired by the layout and UX of [Hills Eyewear](https://www.hillseyewear.com/). Branding and product copy are tailored for **Delulu Shop** football hoodies.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
cd delulu-shop
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push the `delulu-shop` folder (or its contents at the repo root) to a GitHub repository.
2. In the repository **Settings → Pages**, set the source to the branch and folder that contain `index.html`.
3. All asset paths in this project are **relative** (e.g. `css/style.css`, `js/main.js`), so they work on GitHub Pages project sites without a leading `/`.

## Stripe Payment Links

1. In [Stripe Dashboard](https://dashboard.stripe.com/) go to **Product catalog** (or **Payment Links**).
2. Create a **Payment Link** for each variant (Pitch Black, Cloud White, Stadium Red, Midnight Navy) at **$79.00** each.
3. For each link, set **After payment** → **Confirmation page** to your hosted `success.html` URL, and enable **Cancel** redirect to your `cancel.html` URL if you use Stripe Checkout flows that support it. (Payment Links let you set a custom success URL; for cancel behavior, use the URL Stripe provides or link customers back from your site.)
4. Replace each placeholder in `index.html`:

   - `https://buy.stripe.com/YOUR_LINK_HERE_PITCH_BLACK`
   - `https://buy.stripe.com/YOUR_LINK_HERE_CLOUD_WHITE`
   - `https://buy.stripe.com/YOUR_LINK_HERE_STADIUM_RED`
   - `https://buy.stripe.com/YOUR_LINK_HERE_MIDNIGHT_NAVY`

   Replace the whole URL with the real Payment Link from Stripe (comments in the HTML mark each spot).

## Replace images

Search for `Replace with actual` in `index.html` and swap placeholders (colored blocks) for real photos or video posters as needed.

## Theme

Colors and typography are controlled with CSS custom properties at the top of `css/style.css` (`:root`).
