# ShopMind — AI Product Discovery

AI-powered product discovery app. Type in plain English, AI finds the best match.

**Live Demo:** https://capable-torrone-273a78.netlify.app

---

## Tech Stack
- **Frontend + Backend:** Next.js 14 (App Router)
- **AI:** OpenRouter API → GPT-4o-mini
- **Styling:** Tailwind CSS
- **Deployment:** Netlify

---

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — API key already set in `.env.local`.

---

## Deploy to Netlify (Git Deploy)

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import from Git"
3. Select your repo
4. Build settings are auto-detected from `netlify.toml`
5. Click **Deploy** — done!

The API key is already in `netlify.toml`. No manual env var setup needed.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products. Filter: `?category=Laptops` or `?q=gaming` |
| POST | `/api/ask` | AI search. Body: `{ "query": "budget laptop for students" }` |

---

## Environment Variables

| Variable | Value |
|----------|-------|
| `OPENROUTER_API_KEY` | Already set in `.env.local` and `netlify.toml` |

---

## Time Spent: ~3 hours

## What's Implemented
- GET /api/products with filtering
- POST /api/ask with GPT-4o-mini via OpenRouter
- Structured JSON output, error handling
- Product detail pages `/products/[id]`
- React state, effects, reusable components
- Loading skeletons, error/empty states
- SEO meta tags, Netlify config
