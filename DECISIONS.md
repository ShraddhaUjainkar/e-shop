# Decisions & Architecture

## Architectural Decision: Handling Product Variants

The biggest decision was how to handle variant options (colors, sizes, and stock limits). The Fake Store API only returns a single image and description — it has no concept of variants at all. But the assignment explicitly asked for colour swatches, size availability states (available, low stock, sold out), and variant deep-linking via the URL.

I considered hardcoding a fixed set of variants per product, but that would mean variant data living separately from the product data, with no natural way to keep it consistent across page loads. Instead, I fetch the live API data and enrich it on the client: a helper uses the product ID as a seed to generate stable, repeatable stock levels. This keeps variants consistent and linkable across sessions without needing a real database or backend changes.

I also kept a few smaller decisions consistent with this approach:

- A **mapper** transforms the raw API response into my own `Product` type, adding color/size/stock in one central place instead of guessing them inside components.
- All API calls live in one **service file** (`services/api.ts`), and both pages share a single **`useApiResource` hook** for loading/error state, rather than duplicating that logic.
- I kept the raw API type and my app's `Product` type **separate**, so a change in the API's shape doesn't ripple through the rest of the app.

---

## What I'd Do Differently With More Time

- **State immutability**: `addToCart` currently updates quantities by mutating an object property directly inside a shallow-copied array (`newItems[idx].quantity += quantity`). This works, but mutating state like this causes React's `StrictMode` to run the update twice in development, which is what caused a "+2 instead of +1" bug I ran into. With more time, I'd refactor this to return a fresh array with `.map()` instead, so state stays properly immutable.
- **Clean Routing**: I put routes directly in `App.tsx` for simplicity. In a larger project, I would extract this into a dedicated `/src/router` folder.
