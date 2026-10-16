# Google Review QR Code Generator 🌟

An AI-powered Google Review page that:
- Generates a **unique review** using Groq AI every time someone scans the QR code
- **Auto-copies** the review to clipboard
- Opens your **Google Maps review page** directly

## Project Structure
```
google-review-qr/
├── index.html        ← Customer-facing page
├── api/
│   └── review.js     ← Groq AI serverless function
└── vercel.json       ← Vercel config
```

## Setup & Deployment

### Step 1: Get your Google Place ID
1. Go to https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Search your restaurant name
3. Copy the `Place ID` (looks like `ChIJ...`)
4. Your review URL: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`

### Step 2: Customize index.html
Open `index.html` and update these 2 lines (around line 130):
```js
const GOOGLE_MAPS_REVIEW_URL = "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE";
const RESTAURANT_DISPLAY_NAME = "Your Restaurant Name";
```

### Step 3: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/google-review-qr.git
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New Project"** → Import your repo
3. Click **Deploy** (no build settings needed)

### Step 5: Add Environment Variables in Vercel
In your Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `GROQ_API_KEY` | `your_groq_api_key_here` |
| `RESTAURANT_NAME` | `Your Restaurant Name` |
| `RESTAURANT_TYPE` | `e.g. South Indian restaurant` |
| `RESTAURANT_SPECIALTY` | `e.g. dosas, filter coffee, biryani` |

> After adding env vars, go to **Deployments → Redeploy** once.

### Step 6: Generate QR Code
1. Copy your Vercel URL (e.g. `https://google-review-qr.vercel.app`)
2. Go to https://www.qr-code-generator.com
3. Paste the URL → Generate → Download
4. Print and place at your restaurant! 🎉

## How It Works
```
Customer scans QR
      ↓
Vercel page loads (index.html)
      ↓
Calls /api/review → Groq LLaMA generates unique review
      ↓
Review auto-copied to clipboard
      ↓
Customer taps "Open Google Maps" → Pastes → Posts ✅
```
