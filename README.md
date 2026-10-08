# The Green Table

Frontend-only restaurant landing page built with React, TypeScript, Vite, and CSS. The design starts at `client/`; there is no backend implementation.

## Run locally

```sh
cd client
npm install
npm run dev
```

## Structure

- `client/src/components/` contains the navbar, hero, reusable buttons, and dish carousel.
- `client/src/types/` holds the shared `Dish` type.
- `client/src/data/` holds mock dish records.
- `client/src/services/` provides the asynchronous mock data layer.
- `client/src/hooks/` exposes dishes and loading/error state to UI components.
- `client/src/lib/apiClient.ts` is the typed fetch wrapper for future API calls.
- `client/src/assets/` is reserved for local images and other frontend assets.

The current carousel calls `useDishes()`, which calls `getFeaturedDishes()` in `services/dishService.ts`. To connect the Express API later, replace that mock service implementation with `apiRequest<Dish[]>('/dishes/featured')` from `lib/apiClient.ts`. Set `VITE_API_URL` in `client/.env` using `client/.env.example`. No UI component needs to call `fetch` directly.

Booking links currently point to the small `#reservation` placeholder section. The dish photography is served as optimized WebP from Unsplash; replace the URLs in `src/data/dishes.ts` with locally hosted menu photography when available.

An Express + PostgreSQL server is planned but has not been started.
