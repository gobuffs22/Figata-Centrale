/* Shared helpers used by home.js, calendar.js, trip.js */

function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseISODate(s) {
  // Avoid timezone off-by-one by treating dates as local midnight.
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function todayLocal() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(s) {
  const d = parseISODate(s);
  return `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateRange(startS, endS) {
  const start = parseISODate(startS);
  const end = parseISODate(endS);
  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      return `${MONTH_SHORT[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
    }
    return `${MONTH_SHORT[start.getMonth()]} ${start.getDate()} – ${MONTH_SHORT[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${formatDate(startS)} – ${formatDate(endS)}`;
}

/** Returns 'idea' | 'past' | 'active' | 'upcoming' */
function tripStatus(trip) {
  if (trip.status === "idea") return "idea";
  const t = todayLocal();
  const start = parseISODate(trip.startDate);
  const end = parseISODate(trip.endDate);
  if (end < t) return "past";
  if (start <= t && t <= end) return "active";
  return "upcoming";
}

const STATUS_LABEL = {
  idea: "Bucket list",
  past: "Past trip",
  active: "Happening now",
  upcoming: "Upcoming"
};

function statusBadgeHtml(status) {
  return `<span class="badge badge--${status}">${STATUS_LABEL[status]}</span>`;
}

function paragraphsToHtml(text) {
  if (!text) return "";
  return text
    .split(/\n\s*\n/)
    .map((p) => `<p>${escapeHtml(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

function statChipsHtml(stats) {
  if (!stats) return "";
  return Object.entries(stats)
    .map(([k, v]) => `<div class="chip"><span class="chip__label">${escapeHtml(k)}</span><span class="chip__value">${escapeHtml(v)}</span></div>`)
    .join("");
}

function tagListHtml(tags) {
  if (!tags || !tags.length) return "";
  return `<div class="tag-list">${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>`;
}

function sortTrips(trips) {
  // upcoming/active first (soonest first), then ideas, then past (most recent first)
  const rank = { active: 0, upcoming: 1, idea: 2, past: 3 };
  return [...trips].sort((a, b) => {
    const sa = tripStatus(a), sb = tripStatus(b);
    if (rank[sa] !== rank[sb]) return rank[sa] - rank[sb];
    if (sa === "past") {
      return parseISODate(b.endDate) - parseISODate(a.endDate);
    }
    if (sa === "idea") return a.title.localeCompare(b.title);
    return parseISODate(a.startDate) - parseISODate(b.startDate);
  });
}

function tripCardHtml(trip) {
  const status = tripStatus(trip);
  const cover = trip.cover || (trip.photos && trip.photos[0]) || "";
  const dateLine = status === "idea"
    ? (trip.stats && trip.stats["Best season"] ? `Best season: ${escapeHtml(trip.stats["Best season"])}` : "Dates not set")
    : formatDateRange(trip.startDate, trip.endDate);
  return `
    <a class="card" href="trip.html?slug=${encodeURIComponent(trip.slug)}">
      <div class="card__image" style="${cover ? `background-image:url('${cover}')` : ""}">
        ${statusBadgeHtml(status)}
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapeHtml(trip.title)}</h3>
        <p class="card__location">${escapeHtml(trip.location)}</p>
        <p class="card__date">${dateLine}</p>
        <p class="card__summary">${escapeHtml(trip.summary || "")}</p>
        ${tagListHtml(trip.tags)}
      </div>
    </a>`;
}

function setActiveNav(page) {
  $all(".nav__link").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("is-active");
  });
}
