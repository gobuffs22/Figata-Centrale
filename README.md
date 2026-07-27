# Figata Centrale

A static site for organizing adventures: a planning calendar, detailed per-trip
pages, photo galleries, and trip reports from past trips. No build step, no
database — everything is plain HTML/CSS/JS and one editable data file.

Live at **https://www.figata-centrale.com** (via the `CNAME` file, served through GitHub Pages).

## Pages

- `index.html` — Adventures overview: Upcoming, Trip reports (past), and Bucket list (ideas with no fixed dates). Sections are computed automatically from each trip's dates vs. today.
- `calendar.html` — Month-by-month calendar view of every trip with fixed dates, with a legend and prev/next/today navigation.
- `trip.html?slug=...` — A shareable page per trip: cover photo, stats, day-by-day itinerary, photo gallery (with lightbox), and the full trip report for past trips.

## Adding a trip

All trip data lives in [`assets/js/data.js`](assets/js/data.js) as one array —
no code changes needed elsewhere. Copy an existing entry, edit the fields (see
the comment block at the top of the file for what each one does), and:

1. Create a folder under `photos/<slug>/` and drop your images in.
2. Point `cover` and `photos` at those files.
3. For a trip with no confirmed dates yet, set `status: "idea"` instead of
   `startDate`/`endDate` — it'll show up in the Bucket list instead of the
   calendar.
4. Once a trip's `endDate` is in the past, it automatically moves into
   "Trip reports" on the homepage — write the `report` field (and swap in
   real photos) whenever you're ready.

## Running locally

No install, no server required — just open `index.html` in a browser. (Some
browsers restrict `fetch()` over `file://`, which is why trip data is loaded
as a plain `<script>` tag rather than fetched JSON — this avoids that
entirely.)

## Deploying

This repo is already wired up for GitHub Pages with a custom domain:

- Pages is served from the `main` branch, repo root (Settings → Pages in the
  GitHub UI — enable this once if it isn't already).
- `CNAME` points the custom domain (`www.figata-centrale.com`) at GitHub
  Pages; leave it in place unless you're changing domains.
- Any push to `main` updates the live site — there's no build step to run.
