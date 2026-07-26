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
 *   highlights   array of short bullet strings (great for past trips)
 *   report       the trip report — write it as plain text, separate
 *                paragraphs with a blank line. Only shows once the trip is past.
 */

const TRIPS = [
  {
    slug: "yosemite-highcountry-2026",
    title: "Yosemite High Country Traverse",
    location: "Yosemite National Park, California",
    startDate: "2026-06-12",
    endDate: "2026-06-16",
    cover: "photos/yosemite-highcountry-2026/cover.svg",
    summary: "Four days off the Tioga Road, chasing granite and alpine lakes.",
    tags: ["backpacking", "national park", "alpine"],
    stats: {
      Distance: "38 mi",
      "Elevation gain": "7,900 ft",
      Difficulty: "Strenuous",
      "Group size": "4"
    },
    participants: ["Dave", "Priya", "Marcus", "Lena"],
    photos: [
      "photos/yosemite-highcountry-2026/01.svg",
      "photos/yosemite-highcountry-2026/02.svg",
      "photos/yosemite-highcountry-2026/03.svg",
      "photos/yosemite-highcountry-2026/04.svg"
    ],
    highlights: [
      "Sunrise over Cathedral Peak from camp two",
      "Swimming in Upper Cathedral Lake",
      "A very lucky bear-free food storage record"
    ],
    itinerary: [
      { day: 1, title: "Tuolumne Meadows → Cathedral Lakes", description: "Easy 5.5 mi warm-up, camp near Upper Cathedral Lake." },
      { day: 2, title: "Cathedral Lakes → Sunrise High Sierra Camp", description: "9 mi with a side scramble up Cathedral Peak's east ridge." },
      { day: 3, title: "Sunrise → Vogelsang", description: "12 mi over Vogelsang Pass, big views of the Cockscomb." },
      { day: 4, title: "Vogelsang → Tuolumne Meadows", description: "11.5 mi out via Rafferty Creek, burgers at the grill to finish." }
    ],
    report:
      "We rolled into Tuolumne Meadows on a Friday afternoon with the kind of packed-too-heavy packs that only ever get lighter with regret. The permit gods were kind and we snagged a walk-up for the loop we wanted.\n\nDay two was the highlight of the whole trip — the scramble up Cathedral Peak's east ridge is exposed in exactly the fun amount, and the 360 view from the summit block (granite domes in every direction, Half Dome a gray thumbnail on the horizon) was worth every pound in the pack.\n\nVogelsang Pass on day three humbled us a little. Afternoon thunderheads built fast and we pushed hard to get over before they let go, which they did about ten minutes after we dropped below treeline. Camp that night was soggy but the stars afterward made up for it.\n\nWe came out sunburned, mosquito-bitten, and already talking about next year's route. This one's going straight into the yearly rotation."
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
    slug: "zion-narrows-2025",
    title: "The Narrows, Top-Down",
    location: "Zion National Park, Utah",
    startDate: "2025-05-03",
    endDate: "2025-05-04",
    cover: "photos/zion-narrows-2025/cover.svg",
    summary: "One night, one canyon, a lot of cold water.",
    tags: ["canyoneering", "national park", "overnight"],
    stats: {
      Distance: "16 mi",
      Difficulty: "Moderate",
      "Water temp": "Cold. Very cold.",
      "Group size": "5"
    },
    participants: ["Dave", "Marcus", "Lena", "Priya", "Owen"],
    photos: [
      "photos/zion-narrows-2025/01.svg",
      "photos/zion-narrows-2025/02.svg",
      "photos/zion-narrows-2025/03.svg"
    ],
    highlights: [
      "Big Spring — the greenest water any of us had ever seen",
      "Wall Street section at golden hour",
      "Drysuits over regular clothes: 10/10, would overpack again"
    ],
    itinerary: [
      { day: 1, title: "Chamberlain's Ranch → Big Spring camp", description: "12 mi of river walking, first real narrows at Deep Creek confluence." },
      { day: 2, title: "Big Spring → Temple of Sinawava", description: "4 mi through Wall Street, out by early afternoon." }
    ],
    report:
      "The permit lottery finally came through for us on the third try, and it did not disappoint. Chamberlain's Ranch is a weird way to start a canyon trip — you're walking through cow pasture for the first hour wondering if you got the directions wrong — but it opens up fast.\n\nThe water was running colder than forecast and we were very glad for the drysuit rentals from the outfitter in Springdale. Regular gear would have been miserable by hour three.\n\nCamp at Big Spring was the highlight: a wall of ferns and moss with water literally pouring out of solid rock, glowing green in the evening light. Worth the whole trip on its own.\n\nWall Street the next morning, the narrowest and deepest section, lived up to the hype completely — walls a thousand feet up and twenty feet apart, light barely making it down to the water. We came out at Temple of Sinawava soaked, cold, grinning, and immediately started planning the bottom-up day hike for next time."
  },
  {
    slug: "caribbean-sailing-2026",
    title: "Leeward Islands Sailing Passage",
    location: "St. Martin to Nevis, St. Barths & Barbuda, Caribbean",
    startDate: "2026-10-22",
    endDate: "2026-11-01",
    cover: "photos/caribbean-sailing-2026/cover.svg",
    summary: "Ten days sailing a Sun Odyssey 519 through the Leewards — easy pace, warm water.",
    tags: ["sailing", "international", "low intensity"],
    stats: {
      Boat: "Sun Odyssey 519",
      Intensity: "Low",
      Cost: "~$1,500",
      Duration: "10 days"
    },
    photos: [
      "photos/caribbean-sailing-2026/cover.svg"
    ],
    itinerary: [
      { day: "1–2", title: "St. Martin", description: "Provision and shakedown sail out of St. Martin." },
      { day: "3–5", title: "St. Martin → Nevis", description: "Passage south to Nevis, easy anchorages and relaxed pace." },
      { day: "6–7", title: "Nevis → St. Barths", description: "Short hop up to St. Barths, beach time and low-key days." },
      { day: "8–10", title: "St. Barths → Barbuda", description: "Final leg out to Barbuda before heading back in." }
    ]
  }
];
