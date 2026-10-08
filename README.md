# The Green Table

Restaurant landing page with React frontend and Express backend. Built with TypeScript, Vite, and Tailwind CSS.

## Run locally

```sh
# Install dependencies across all packages
pnpm install

# Start dev servers (client on :5173, server on :5000)
pnpm dev

# Build both packages
pnpm build

# Build and preview client only
pnpm --filter client build
pnpm --filter client preview
```

## Structure

### `client/`
- `src/components/` — React components (Navbar, Hero, DishCarousel, Button)
- `src/types/` — TypeScript types (Dish interface)
- `src/data/` — Site content and mock dish data
- `src/services/` — Data fetching layer
- `src/hooks/` — Custom React hooks
- `src/lib/` — API client and utilities
- `.env.example` — Environment template

### `server/`
- `src/routes/` — API endpoints (/health, /reservations)
- `src/middleware/` — CORS and middleware setup
- `.env.example` — Environment template

## Development

The carousel uses embla-carousel-react with keyboard/swipe support. Animation libraries (GSAP, Lenis) are installed but not yet integrated. Content (hours, taglines, nav links) is centralized in `client/src/data/site.ts`.

To connect the Express API, update `client/src/services/dishService.ts` to call the real endpoints instead of mock data. Set `VITE_API_URL` in `client/.env` using `client/.env.example`.
