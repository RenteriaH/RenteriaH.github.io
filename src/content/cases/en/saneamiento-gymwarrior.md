---
title: "Hardening a legacy PHP app without rewriting it"
seoTitle: "Case study: hardening a legacy PHP app"
seoDescription: "How I found and fixed ten security issues in a PHP and MySQL store, with tests that fail on the original version and pass on the fix."
summary: "An academic PHP and MySQL store that worked, but had SQL injection, unvalidated uploads, user data in the repository and a tracking script hidden in the template. Ten fixes, verified with end-to-end tests."
role: "Original build (2024) and hardening (2026)"
org: "Academic project — GYMWARRIOR"
period: "2024 · 2026"
stack: ["PHP 8", "MySQL 8", "JavaScript", "Playwright", "git-filter-repo"]
order: 1
key: "saneamiento-gymwarrior"
---

## Context

GYMWARRIOR is a web store I built at school in 2024: catalog by category, sign-up and login, guest mode, cart, test
checkout with the PayPal sandbox and an inventory dashboard. It is plain PHP with no framework, on MySQL.

In 2026, reviewing my GitHub before job hunting, I found the public repository contained a database dump with real user
emails and a Google Maps key. I made it private right away and set a more useful goal than deleting it: get it to a
state I could defend in an interview.

## Why it "didn't show"

First I reproduced it. GitHub shows code but doesn't run PHP, so the repository looked "broken". I set up PHP and MySQL
locally, loaded the schema and confirmed the original code **did work**: the home page rendered and the catalog, without
a database, ended in a fatal error. Nothing needed a rewrite to work; what was wrong needed fixing.

## What I found

| Issue | Risk |
|---|---|
| Sign-up built SQL from user input | SQL injection |
| A page that created an admin with a fixed password when visited | Anyone could create an admin |
| Unvalidated image uploads | A `.php` disguised as `.jpg` was stored and could run |
| No CSRF token; product deletion via GET | Forged actions from another site |
| Unescaped output | XSS |
| `.env` served by the web server | Credentials visible to anyone |
| External tracking script in the HTML template | Remote code running on every visit, including login |
| Checkout without quantity or stock checks | Negative stock; selling sold-out items |
| SQL dump with user data in the repository | Third-party privacy |
| Testimonials with real-looking names and photos | Privacy and made-up reviews |

The tracking script was the surprise: it came in the free template's `custom.js` and pulled code from an external
domain with `$.getScript`. I didn't write it, but it was on my site.

## Tests first

Before fixing anything I wrote 13 Playwright end-to-end tests describing how the app **should** behave: pages without
errors, no scripts from unapproved domains, internal files unreachable, sign-up and login, guest cart, stock-aware
checkout, and a disguised PHP file being rejected.

Against the original code, 10 of 13 failed. That gave me an objective list of what to fix and a way to know when it was
fixed.

## The fixes

- **Prepared statements** on every write, and sign-up validation with the same rules in the browser and on the server.
- **CSRF tokens** on every form and on the cart's `fetch` call; product deletion moved to POST.
- **Uploads**: real file type via `finfo`, JPG/PNG/WEBP allowlist, 2 MB cap and a random filename.
- **Transactional checkout** with `UPDATE … WHERE stock >= ?`: if one item falls short, nothing is deducted.
- **`.env`-based config** outside the repository, plus `.htaccess` and a `router.php` that block internal files.
- Two functional bugs: guests couldn't add to the cart (their `usuario_id` is `null`, so `isset()` treated them as
  logged out), and checkout redirected to the receipt before the server confirmed stock.
- **Fictional data** (`example.com` domain) instead of the dump, and testimonials labeled as examples.

After the changes, all 13 tests pass.

## History matters too

Deleting a file in a new commit doesn't remove it from history. I rewrote history with `git-filter-repo` in a separate
copy, removing the dump, photos and key, and verified it by searching every commit for each pattern. The key gets
revoked at the provider: removing it from code doesn't invalidate it.

## Screenshots

Screenshots of the hardened version running locally with fictional data. This is not a live demo: GitHub Pages doesn’t run PHP or MySQL.

<figure class="shot"><img src="/img/gymwarrior/index.jpg" alt="Store home page" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Store home page</figcaption></figure>
<figure class="shot"><img src="/img/gymwarrior/carrito.jpg" alt="Cart with the PayPal sandbox checkout button" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Cart with the PayPal sandbox checkout button</figcaption></figure>
<figure class="shot"><img src="/img/gymwarrior/admin.jpg" alt="Admin dashboard to add products with a validated image" width="1200" height="750" loading="lazy" decoding="async"><figcaption>Admin dashboard to add products with a validated image</figcaption></figure>

## What I learned

- Working isn't the same as safe: the original did what it promised.
- Tests that fail before the fix are the best evidence the fix works.
- A free template is third-party code and deserves the same review.
- Protecting other people's data comes before any visual improvement.

I did the hardening in 2026 with help from AI agents, reviewing and testing every change.
