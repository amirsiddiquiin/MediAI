# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub account with this repository pushed
- Google Gemini API key

## Deployment Steps

### 1. Push to GitHub
If you haven't already, push your code to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
- Link to existing project or create new
- Set project name (e.g., "mediai")
- Confirm settings

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty - will use vercel.json)
   - **Output Directory**: (leave empty)
4. Click "Deploy"

### 3. Set Environment Variables

In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add the following variables:

**Backend Variables:**
- `GEMINI_API_KEY`: Your Google Gemini API key
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: `production`
- `PORT`: `5001`

**Frontend Variables:**
- `VITE_API_URL`: `/api` (this will route to backend)

### 4. Redeploy

After setting environment variables, redeploy:
```bash
vercel --prod
```

Or in the Vercel Dashboard, go to Deployments → Click the three dots → Redeploy

## Project Structure

This is a monorepo deployment with:
- **Frontend**: React + Vite (served from `/`)
- **Backend**: Express.js API (served from `/api`)

The `vercel.json` configuration handles routing between frontend and backend.

## Troubleshooting

### API Routes Not Working
- Check that environment variables are set correctly
- Verify the backend is being deployed as a serverless function
- Check Vercel Function Logs for errors

### Frontend Build Errors
- Ensure all dependencies are in `package.json`
- Check that `npm run build` works locally
- Verify Vite configuration is correct

### CORS Issues
- The backend has CORS enabled via `cors()` middleware
- API routes are prefixed with `/api` in the root `vercel.json`

## Local Development

After deployment, you can still run locally:
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Production URL

After deployment, Vercel will provide a URL like:
- `https://mediai.vercel.app`

You can also add a custom domain in Vercel Dashboard → Settings → Domains.
