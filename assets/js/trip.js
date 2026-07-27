document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const trip = TRIPS.find((t) => t.slug === slug);

  if (!trip) {
    $("#trip-root").innerHTML = `
      <div class="not-found">
        <h1>Trip not found</h1>
        <p>We couldn't find an adventure with that link.</p>
        <a class="btn" href="index.html">&larr; Back home</a>
      </div>`;
    document.title = "Trip not found · Figata Centrale";
    return;
  }

  document.title = `${trip.title} · Figata Centrale`;
  const status = tripStatus(trip);
  const cover = trip.cover || (trip.photos && trip.photos[0]) || "";

  const dateLine = status === "idea"
    ? "Dates not set yet"
    : formatDateRange(trip.startDate, trip.endDate);

  let html = `
    <div class="trip-hero" style="${cover ? `background-image:url('${cover}')` : ""}">
      <div class="trip-hero__overlay">
        ${statusBadgeHtml(status)}
        <h1>${escapeHtml(trip.title)}</h1>
        <p class="trip-hero__meta">${escapeHtml(trip.location)} &middot; ${dateLine}</p>
      </div>
    </div>
    <div class="trip-body">
      ${trip.summary ? `<p class="trip-summary">${escapeHtml(trip.summary)}</p>` : ""}
      ${tagListHtml(trip.tags)}
      ${trip.stats ? `<div class="chip-row">${statChipsHtml(trip.stats)}</div>` : ""}
      ${trip.participants && trip.participants.length ? `
        <div class="trip-section">
          <h2>Who's going</h2>
          <p class="participants">${trip.participants.map(escapeHtml).join(", ")}</p>
        </div>` : ""}
      ${trip.itinerary && trip.itinerary.length ? `
        <div class="trip-section">
          <h2>${status === "past" ? "Itinerary" : "Plan"}</h2>
          <ol class="itinerary">
            ${trip.itinerary.map((d) => `
              <li>
                <span class="itinerary__day">Day ${escapeHtml(String(d.day))}</span>
                <div>
                  <strong>${escapeHtml(d.title)}</strong>
                  <p>${escapeHtml(d.description)}</p>
                </div>
              </li>`).join("")}
          </ol>
        </div>` : ""}
      ${trip.highlights && trip.highlights.length ? `
        <div class="trip-section">
          <h2>Highlights</h2>
          <ul class="highlights">
            ${trip.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>
        </div>` : ""}
      ${trip.photos && trip.photos.length ? `
        <div class="trip-section">
          <h2>Photos</h2>
          <div class="gallery">
            ${trip.photos.map((p, i) => `<button class="gallery__thumb" style="background-image:url('${p}')" data-index="${i}" aria-label="Open photo ${i + 1}"></button>`).join("")}
          </div>
        </div>` : ""}
      ${trip.videos && trip.videos.length ? `
        <div class="trip-section">
          <h2>Videos</h2>
          <div class="video-list">
            ${trip.videos.map((v) => `<video controls preload="metadata" src="${v}"></video>`).join("")}
          </div>
        </div>` : ""}
      ${trip.report ? `
        <div class="trip-section trip-report">
          <h2>Trip Report</h2>
          ${paragraphsToHtml(trip.report)}
        </div>` : ""}
    </div>
    <a class="btn btn--ghost back-link" href="index.html">&larr; All adventures</a>
  `;

  $("#trip-root").innerHTML = html;

  if (trip.photos && trip.photos.length) {
    setupLightbox(trip.photos);
  }
});

function setupLightbox(photos) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__prev" aria-label="Previous">&#10094;</button>
    <img class="lightbox__img" alt="">
    <button class="lightbox__next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(overlay);

  let current = 0;
  const img = overlay.querySelector(".lightbox__img");

  function show(i) {
    current = (i + photos.length) % photos.length;
    img.src = photos[current];
  }
  function open(i) {
    show(i);
    overlay.classList.add("is-open");
  }
  function close() {
    overlay.classList.remove("is-open");
  }

  $all(".gallery__thumb").forEach((btn) => {
    btn.addEventListener("click", () => open(Number(btn.dataset.index)));
  });
  overlay.querySelector(".lightbox__close").addEventListener("click", close);
  overlay.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
  overlay.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}
