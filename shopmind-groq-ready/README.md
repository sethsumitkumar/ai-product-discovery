# ShopMind — AI Product Discovery

AI-powered product discovery app built with Next.js 14 + Gemini AI. Type in plain English, AI finds the best match.

---

## Tech Stack

- **Frontend + Backend:** Next.js 14 (App Router)
- **AI:** Google Gemini 2.0 Flash
- **Styling:** Tailwind CSS
- **Deployment:** Netlify

---

## Run Locally

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd shopmind

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then edit .env.local and add your Gemini API key:
# GEMINI_API_KEY=your_key_here

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000

---

## Get a Gemini API Key (Free)

1. Go to https://aistudio.google.com/apikey
2. Click **Create API key**
3. Copy the key and paste it into `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

---

## Deploy to Netlify

### Option A — Git Deploy (Recommended)

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build settings are auto-detected from `netlify.toml`
5. Go to **Site configuration → Environment variables** → Add:
   - Key: `GEMINI_API_KEY`
   - Value: your Gemini API key
6. Click **Deploy site** — done!

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set GEMINI_API_KEY your_key_here
netlify deploy --prod
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts, then:
vercel env add GEMINI_API_KEY
vercel --prod
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products. Filter: `?category=Laptops` or `?q=gaming` |
| `POST` | `/api/ask` | AI search. Body: `{ "query": "budget laptop for students" }` |

### Example — POST /api/ask

**Request:**
```json
{ "query": "best laptop for gaming under $1000" }
```

**Response:**
```json
{
  "products": [...],
  "productIds": ["p2"],
  "summary": "The GameBeast X17 is a great high-performance gaming laptop...",
  "intent": "gaming laptop under $1000",
  "total": 1
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key from https://aistudio.google.com/apikey |

> ⚠️ Never commit `.env.local` or hardcode your API key in code/config files.  
> Always set it via your hosting platform's environment variable settings.

---

## What's Implemented

- ✅ `GET /api/products` — list + filter by category or keyword
- ✅ `POST /api/ask` — natural language AI search via Gemini 2.0 Flash
- ✅ Structured JSON output: `{ productIds, summary, intent }`
- ✅ Full error handling: rate limits, timeouts, missing key, invalid responses
- ✅ Product detail pages at `/products/[id]`
- ✅ Category filter tabs (client-side)
- ✅ Loading skeletons, error + empty states
- ✅ SEO meta tags (title + description per page)
- ✅ Reusable components: `<ProductCard>`, `<SearchBar>`
- ✅ No secrets in code or config

---

## Time Spent: ~3 hours
