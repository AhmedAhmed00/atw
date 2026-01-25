# Deployment Guide - Vercel

This guide will help you deploy the "All The Way" application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with your Git provider

2. **Import Your Repository**
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect the Vite framework

3. **Configure Project Settings**
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (already configured in vercel.json)
   - **Output Directory**: `dist` (already configured in vercel.json)
   - **Install Command**: `npm install` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For Production Deployment**
   ```bash
   vercel --prod
   ```

## Configuration Files

### vercel.json
This file contains the deployment configuration:
- **Build settings**: Automatically configured for Vite
- **SPA routing**: All routes redirect to index.html for React Router
- **Caching headers**: Optimized for static assets

### .vercelignore
This file excludes unnecessary files from deployment:
- node_modules
- Development files
- Build artifacts (Vercel builds these)

## Environment Variables

If your application needs environment variables:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables (e.g., `VITE_API_URL`)

2. **In vercel.json** (optional):
   ```json
   {
     "env": {
       "VITE_API_URL": "@api-url"
     }
   }
   ```

## Build Verification

Before deploying, verify your build works locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Check the dist/ folder was created
ls dist/
```

## Post-Deployment

After deployment:

1. **Check the deployment URL**
   - Vercel provides a unique URL for each deployment
   - Production deployments get a custom domain (if configured)

2. **Monitor Build Logs**
   - Check the "Deployments" tab in Vercel dashboard
   - Review build logs for any errors

3. **Set up Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Troubleshooting

### Build Fails

1. **Check Node.js version**
   - Vercel uses Node.js 18.x by default
   - You can specify a version in `package.json`:
     ```json
     {
       "engines": {
         "node": ">=18.0.0"
       }
     }
     ```

2. **Check Build Logs**
   - Review error messages in Vercel dashboard
   - Common issues:
     - Missing dependencies
     - TypeScript errors
     - Environment variables not set

### Routing Issues

- The `vercel.json` includes a rewrite rule for SPA routing
- All routes should redirect to `index.html`
- If routes don't work, check the rewrites configuration

### Performance

- Static assets are cached for 1 year (configured in vercel.json)
- Consider enabling Vercel Analytics for performance monitoring

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to your main/master branch
- **Preview**: Every push to other branches (creates preview deployments)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)

