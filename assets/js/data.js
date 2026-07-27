/**
 * TRIP DATA
 * ---------
 * This is the entire "database" for the site — one JS array of trip objects.
 * To add a new adventure, copy an existing object below, change the values,
 * and drop your photos into photos/<slug>/.
 *
 * Fields:
 *   slug         (required) URL-safe id, must be unique. Used in trip.html?slug=...
 *   title        (required) Trip name
 *   location     (required) Where it is
 *   status       (optional) 'idea' for bucket-list trips with no fixed dates.
 *                Otherwise leave unset — upcoming/active/past is calculated
 *                automatically from startDate/endDate vs. today.
 *   startDate    'YYYY-MM-DD' (not needed for status: 'idea')
 *   endDate      'YYYY-MM-DD' (not needed for status: 'idea')
 *   cover        path to a hero/cover image
 *   summary      one-line teaser shown on cards
 *   tags         array of short strings
 *   stats        free-form key/value pairs shown as chips (distance, elevation, etc.)
 *   participants array of names
 *   itinerary    array of { day, title, description } — the plan (used for
 *                upcoming/idea trips, but also fine to keep on past trips)
 *   photos       array of image paths for the gallery
 *   videos       array of video file paths (mp4 etc.), shown as a playable
 *                video section on the trip page
 *   highlights   array of short bullet strings (great for past trips)
 *   report       the trip report — write it as plain text, separate
 *                paragraphs with a blank line. Only shows once the trip is past.
 */

const TRIPS = [
  {
    slug: "victoria-mayne-island-2026",
    title: "Victoria & Mayne Island Cycling",
    location: "Victoria & Mayne Island, British Columbia, Canada",
    startDate: "2026-05-11",
    endDate: "2026-05-16",
    cover: "photos/victoria-mayne-island-2026/PXL_20260514_155055641.MP.jpg",
    summary: "Six days cycling around Victoria and out to Mayne Island in the Gulf Islands.",
    tags: ["cycling", "international"],
    photos: [
      "photos/victoria-mayne-island-2026/PXL_20260514_155055641.MP.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260516_160101664.MP.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260514_225720989.MP.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260516_003254013.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260514_024238656.MP.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260512_051232068.MP.jpg",
      "photos/victoria-mayne-island-2026/PXL_20260513_051221726.MP.jpg"
    ]
  },
  {
    slug: "dolomites-hut-trek-2026",
    title: "Dolomites Alta Via 1",
    location: "Dolomites, Italy",
    startDate: "2026-09-05",
    endDate: "2026-09-14",
    cover: "photos/dolomites-hut-trek-2026/cover.svg",
    summary: "Ten days hut-to-hut through the classic Alta Via 1 route.",
    tags: ["hut trek", "international", "via ferrata"],
    stats: {
      Distance: "75 mi",
      "Elevation gain": "24,000 ft",
      Difficulty: "Moderate–strenuous",
      "Group size": "3"
    },
    participants: ["Dave", "Priya", "Sam"],
    photos: [
      "photos/dolomites-hut-trek-2026/01.svg",
      "photos/dolomites-hut-trek-2026/02.svg"
    ],
    itinerary: [
      { day: 1, title: "Lago di Braies → Rifugio Biella", description: "Classic start at the lake, straight up to the first hut." },
      { day: 2, title: "Rifugio Biella → Rifugio Sennes", description: "Rolling alpine meadows, easy day to recover." },
      { day: 3, title: "Rifugio Sennes → Rifugio Fanes", description: "Detour option to Lago di Limo if weather holds." },
      { day: "4–9", title: "Fanes → Lagazuoi → Passo Giau → Croda da Lago → Palafavera → Rifugio Città di Fiume → Passo Duran", description: "The long middle stretch — booking huts ahead for these nights." },
      { day: 10, title: "Passo Duran → Rifugio Pian de Fontana → bus out", description: "Short final push and celebratory pizza in Belluno." }
    ],
    stats_note: "Huts booked through May; still confirming the Lagazuoi via ferrata add-on.",
    report: null
  },
  {
    slug: "patagonia-full-circuit-2027",
    title: "Torres del Paine Full Circuit",
    location: "Patagonia, Chile",
    status: "idea",
    summary: "The full 'O' circuit — bucket list, targeting the 2027–28 season.",
    tags: ["bucket list", "international", "backpacking"],
    stats: {
      Distance: "80 mi",
      Difficulty: "Strenuous",
      "Best season": "Nov–Mar"
    },
    photos: ["photos/patagonia-full-circuit-2027/cover.svg"],
    itinerary: [
      { day: "Planning", title: "Campsite reservations", description: "CONAF sites sell out early — need to book ~6 months out." },
      { day: "Planning", title: "Gear check", description: "Need a 4-season tent option; wind on the backside is no joke." }
    ]
  },
  {
    slug: "caribbean-sailing-2026",
    title: "Leeward Islands Sailing Passage",
    location: "St. Martin to Nevis, St. Barths & Barbuda, Caribbean",
    startDate: "2026-10-22",
    endDate: "2026-11-02",
    cover: "photos/caribbean-sailing-2026/sail%202021%203%20pano.jpg",
    summary: "Twelve days sailing a Sun Odyssey 519 through the Leewards — easy pace, warm water.",
    tags: ["sailing", "international", "low intensity"],
    stats: {
      Boat: { text: "Sun Odyssey 519 (2018)", url: "https://www.jeanneau.com/boats/sailboat/2-sun-odyssey/43-sun-odyssey-519" },
      Intensity: "Low",
      Cost: "~$1,500",
      Duration: "12 days"
    },
    photos: [
      "photos/caribbean-sailing-2026/sail%202021%203%20pano.jpg",
      "photos/caribbean-sailing-2026/sail%202021%202.jpg",
      "photos/caribbean-sailing-2026/sail%202021%201.jpg",
      "photos/caribbean-sailing-2026/DSCF0900.jpg",
      "photos/caribbean-sailing-2026/IMG_3673.jpg",
      "photos/caribbean-sailing-2026/IMG_7609.jpg",
      "photos/caribbean-sailing-2026/IMG_7898.jpg",
      "photos/caribbean-sailing-2026/PXL_20240529_104655005.jpg"
    ],
    videos: [
      "photos/caribbean-sailing-2026/sail-video-1.mp4"
    ],
    itinerary: [
      { day: 1, title: "Arrive SXM", description: "Plane spotting and provisioning." },
      { day: 2, title: "Finish provisioning, board boat late afternoon." },
      { day: 3, title: "After technical briefing, sail to St. Barths." },
      { day: 4, title: "Early departure for Nevis." },
      { day: 5, title: "Explore Nevis." },
      { day: 6, title: "Very early departure to Barbuda." },
      { day: 7, title: "Explore Barbuda." },
      { day: 8, title: "Very early departure to St. Barths." },
      { day: 9, title: "Explore St. Barths." },
      { day: 10, title: "St. Barths, afternoon sail to Tintamarre." },
      { day: 11, title: "TBD" },
      { day: 12, title: "Return boat (1000), fly home." }
    ]
  }
];
