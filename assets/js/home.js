document.addEventListener("DOMContentLoaded", () => {
  const sorted = sortTrips(TRIPS);
  const upcoming = sorted.filter((t) => ["upcoming", "active"].includes(tripStatus(t)));
  const past = sorted.filter((t) => tripStatus(t) === "past");
  const ideas = sorted.filter((t) => tripStatus(t) === "idea");

  renderSection("upcoming-grid", upcoming, "No trips on the calendar yet — add one in assets/js/data.js.");
  renderSection("past-grid", past, "No past trips logged yet.");
  renderSection("ideas-grid", ideas, "No bucket-list ideas yet — add one with status: 'idea'.");

  $("#stat-total").textContent = TRIPS.length;
  $("#stat-upcoming").textContent = upcoming.length;
  $("#stat-past").textContent = past.length;
  $("#stat-countries") && ($("#stat-countries").textContent = new Set(TRIPS.map((t) => t.location.split(",").pop().trim())).size);
});

function renderSection(id, trips, emptyMessage) {
  const el = $("#" + id);
  if (!el) return;
  if (!trips.length) {
    el.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }
  el.innerHTML = trips.map(tripCardHtml).join("\n");
}
