let viewYear, viewMonth; // 0-indexed month

document.addEventListener("DOMContentLoaded", () => {
  const t = todayLocal();
  viewYear = t.getFullYear();
  viewMonth = t.getMonth();

  $("#cal-prev").addEventListener("click", () => shiftMonth(-1));
  $("#cal-next").addEventListener("click", () => shiftMonth(1));
  $("#cal-today").addEventListener("click", () => {
    const now = todayLocal();
    viewYear = now.getFullYear();
    viewMonth = now.getMonth();
    render();
  });

  render();
});

function shiftMonth(delta) {
  viewMonth += delta;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  render();
}

function tripsOverlappingMonth(year, month) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  return TRIPS.filter((t) => {
    if (t.status === "idea") return false;
    const s = parseISODate(t.startDate);
    const e = parseISODate(t.endDate);
    return e >= monthStart && s <= monthEnd;
  });
}

const TRIP_COLORS = ["#2d6a4f", "#d97706", "#2563eb", "#9d174d", "#0891b2", "#7c3aed"];
function colorForTrip(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return TRIP_COLORS[hash % TRIP_COLORS.length];
}

function render() {
  $("#cal-title").textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  const monthTrips = tripsOverlappingMonth(viewYear, viewMonth);
  const t = todayLocal();
  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  let cellsHtml = "";
  for (let i = 0; i < startWeekday; i++) {
    cellsHtml += `<div class="cal-cell cal-cell--empty"></div>`;
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(viewYear, viewMonth, day);
    const isToday = cellDate.getTime() === t.getTime();
    const dayTrips = monthTrips.filter((tr) => {
      const s = parseISODate(tr.startDate), e = parseISODate(tr.endDate);
      return cellDate >= s && cellDate <= e;
    });
    const bars = dayTrips.map((tr) => {
      const color = colorForTrip(tr.slug);
      const isStart = parseISODate(tr.startDate).getTime() === cellDate.getTime();
      return `<a class="cal-bar" style="background:${color}" href="trip.html?slug=${encodeURIComponent(tr.slug)}" title="${escapeHtml(tr.title)}">${isStart ? escapeHtml(tr.title) : ""}</a>`;
    }).join("");
    cellsHtml += `
      <div class="cal-cell${isToday ? " cal-cell--today" : ""}">
        <span class="cal-cell__num">${day}</span>
        <div class="cal-cell__bars">${bars}</div>
      </div>`;
  }
  const totalCells = startWeekday + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailing; i++) {
    cellsHtml += `<div class="cal-cell cal-cell--empty"></div>`;
  }

  $("#cal-grid").innerHTML = cellsHtml;

  // Legend / list of trips touching this month
  const legend = $("#cal-legend");
  if (!monthTrips.length) {
    legend.innerHTML = `<p class="empty-state">No trips this month.</p>`;
  } else {
    legend.innerHTML = sortTrips(monthTrips).map((tr) => `
      <a class="legend-item" href="trip.html?slug=${encodeURIComponent(tr.slug)}">
        <span class="legend-item__swatch" style="background:${colorForTrip(tr.slug)}"></span>
        <span class="legend-item__text">
          <strong>${escapeHtml(tr.title)}</strong>
          <span>${formatDateRange(tr.startDate, tr.endDate)}</span>
        </span>
      </a>`).join("\n");
  }
}
