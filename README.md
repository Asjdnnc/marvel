# Marvel Cinematic Universe Explorer

A sleek, fully client-side web application for exploring the Marvel Cinematic Universe. Browse movies, track your watch progress, follow the MCU chronological timeline, and search any film online — all with no backend required.

---

## Features

- **Movie Discovery** — Browse the complete MCU catalog with posters, ratings, cast, director, runtime, budget, and revenue.
- **Watch Progress Tracker** — Mark movies as watched and track your progress via a visual progress bar (persisted in `localStorage`).
- **Countdown Timer** — Live countdown to the next major MCU theatrical release.
- **MCU Spotlight** — Featured panel on the home page highlighting the next upcoming Marvel film.
- **Interactive Timeline** — View every MCU movie in chronological watch order, split by Phase.
- **Online Movie Search** — Search any film (inside or outside the MCU) using the TMDB API with details and trailers.
- **Trailer Player** — Watch embedded YouTube trailers directly from a movie detail page.
- **Background Music Player** — Persistent Spotify-embedded music player across the session.
- **Responsive Header** — Sticky navigation bar with smooth hover effects, fully responsive on mobile.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Vanilla CSS + FontAwesome Icons |
| Data | Local JS catalog (no database) |
| External API | TMDB API (online movie search only) |
| Music | Spotify Embed |
| Trailers | YouTube Embed |

---

## Project Structure

```
marvelProject/
└── frontend/
    ├── public/
    │   └── image/          # Local movie poster images
    ├── src/
    │   ├── components/     # Reusable UI components
    │   │   ├── Header.jsx / Header.css
    │   │   ├── Footer.jsx
    │   │   ├── MovieCard.jsx
    │   │   ├── Related.jsx
    │   │   ├── Trailer.jsx / Trailer.css
    │   │   ├── Music.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── ScrollToTop.jsx
    │   │   └── SessionMusicPlayer.jsx
    │   ├── pages/          # Route-level page views
    │   │   ├── MovieList.jsx / MovieList.css
    │   │   ├── MovieDetails.jsx / MovieDetails.css
    │   │   ├── Timeline.jsx / TimelineComp.css
    │   │   └── Others.jsx / Others.css
    │   ├── data/           # Static data layer
    │   │   ├── movieCatalogData.js   # Full MCU movie catalog (38+ films)
    │   │   ├── movieCatalog.js       # Catalog helpers (getById, getRelated)
    │   │   └── mcuSpotlight.js       # Next release & timeline entries
    │   ├── utils/
    │   │   └── watchedMovies.js      # localStorage read/write helpers
    │   ├── App.jsx         # Root component with route definitions
    │   └── main.jsx        # Vite entry point
    ├── .env                # Environment variables (not committed)
    ├── index.html
    └── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/marvelProject.git
cd marvelProject/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables (optional)

The app works fully without any API keys — all MCU movie data is local. The TMDB API is only needed for the **Others / Online Search** feature.

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_KEY=your_tmdb_api_key
VITE_bearerToken=your_tmdb_bearer_token
```

> Get free API credentials at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### 4. Run locally

```bash
npm run dev
```

App will be available at **http://localhost:5173**

---

## Data Architecture

The project is fully decoupled from any backend. All movie data lives in:

- **`src/data/movieCatalogData.js`** — Single source of truth for all 38+ MCU movies. Add new films here.
- **`src/data/movieCatalog.js`** — Exports the catalog with helper functions (`getLocalMovieById`, `getLocalRelatedMovies`).
- **`src/data/mcuSpotlight.js`** — Derives the next MCU release and timeline entries from the catalog.

Watch progress is stored in the browser's `localStorage` under the key `marvel-watched-movies`.

---

## Deployment

Since this is a fully static frontend, it can be deployed to any static hosting platform:

**Vercel / Netlify:**
```bash
npm run build
# Deploy the generated dist/ folder
```

**GitHub Pages:**
```bash
npm run build
# Push the dist/ folder to your gh-pages branch
```

> Build output is in `frontend/dist/`. No server or database required.

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Movie grid with search and progress tracker |
| `/movies/:id` | Movie Details | Full details, trailer, related films |
| `/timeline` | Timeline | Chronological MCU watch order |
| `/others` | Others | Online search via TMDB API |
