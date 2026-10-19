# Cluck & Coop — Poultry E-Commerce Website

A complete, clean, modern, and responsive poultry e-commerce website built with HTML, CSS, and vanilla JavaScript. Designed as a BSIT school project ("Design and Develop a Poultry E-Commerce Website Specializing in Chickens").

## Project Structure

```
poultry-ecommerce/
├── index.html   # Homepage, categories, shop, product details modal, admin dashboard
├── style.css    # Responsive poultry-theme stylesheet
├── script.js    # Vanilla JavaScript: data, rendering, filtering, admin CRUD, localStorage
└── README.md
```

## Features

1. **Homepage** — Navigation bar, welcome/hero section, featured chickens, and "Browse Chickens" / "View Categories" buttons.
2. **Categories** — 4-month-old chickens, 5-month-old chickens, and 6-month-old & older.
3. **Product Listings** — Each card shows image, name, age, breed, price in Philippine Pesos (₱), description, availability, and an "Add to Cart" / "Details" button.
4. **Product Details** — Click "Details" on any chicken to view breed, age, characteristics, price, description, and availability in a modal.
5. **Admin Dashboard** — Click **Admin** in the navbar and enter demo PIN `1234` to add, edit, and delete listings, manage categories/prices, and update inventory & availability.
6. **Responsive Design** — Works on mobile phones, tablets, and desktop (collapsible nav menu, fluid grids).
7. **Easter eggs** — Tiny subtle chibi-style anime character squares (Attack on Titan's Eren, My Hero Academia's Deku, Sword Art Online's Kirito, Code Geass's Lelouch, Death Note's Light) placed in page corners. Hover to reveal names.
8. **localStorage persistence** — Sample products and admin changes (add/edit/delete) persist between page refreshes in the browser.
9. **GitHub Pages ready** — Static files only. No server, database, API, or installation required.

## How to Run in VS Code

1. Open VS Code.
2. File → Open Folder → select `C:\Users\anixu\OneDrive\Desktop\poultry-ecommerce`.
3. Open `index.html` (double-click in Explorer, or right-click → "Open with Live Server" if you have the Live Server extension installed).
4. The site runs directly in your browser — no build step, no `npm install`.

To publish on GitHub Pages:
1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
3. Go to repository Settings → Pages → Build and deployment → Source: "Deploy from a branch" → select `main` (or `master`) and folder `/(root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Demo Admin

- Navbar → **Admin** → enter PIN `1234`.
- Add new chickens, edit existing ones (click Edit in the table), or delete listings.
- Changes save to browser `localStorage` and refresh the shop automatically.

## Limitations (School Demo)

- **localStorage is not secure.** The admin PIN `1234` is visible in `script.js` and data is stored in the browser only. Do not use for real users or payments.
- **No real checkout or payments.** "Add to Cart" shows a demo alert.
- **No real database.** Data resets if the user clears browser storage.
- Images use public placeholders (`placehold.co`); replace with your own chicken photos for a real project.

## Browser Support

Modern browsers (Chrome, Firefox, Edge, Safari) on desktop and mobile.
