# Deployment Guide for Vercel

This guide will help you deploy your Research Implementation Tracker to Vercel using serverless functions.

## Project Structure for Vercel

The project has been restructured for Vercel deployment:

```
├── api/                          # Vercel serverless functions
│   ├── research-papers.ts        # GET /api/research-papers
│   ├── research-papers/[id].ts   # GET /api/research-papers/:id
│   ├── research-projects.ts      # GET /api/research-projects
│   ├── research-projects/[id].ts # GET /api/research-projects/:id
│   ├── github-repos.ts           # GET /api/github-repos
│   ├── github-repos/featured.ts  # GET /api/github-repos/featured
│   └── contact.ts                # POST /api/contact
├── client/                       # React frontend
│   ├── src/
│   ├── package.json             # Frontend dependencies
│   └── dist/                    # Build output
├── server/                      # Shared server code
│   ├── storage.ts               # Storage interface (kept for reuse)
│   └── schema.ts                # Data schemas
├── shared/
│   └── schema.ts                # Shared TypeScript types
└── vercel.json                  # Vercel configuration
```

## Prerequisites

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Create a Vercel account at [vercel.com](https://vercel.com)

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Deploy to Vercel
From your project root directory:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy**: Select Yes
- **Link to existing project**: Select No (for first deployment)
- **Project name**: `research-implementation-tracker` (or your preferred name)
- **Directory**: `.` (current directory)
- **Override settings**: Select No (unless you need custom settings)

### 3. Production Deployment
For production deployment:
```bash
vercel --prod
```

## Configuration Details

### vercel.json
The `vercel.json` file configures:
- **Build Command**: Builds the React frontend from the client directory
- **Output Directory**: Points to `client/dist` for static files
- **API Functions**: Maps `api/**/*.ts` files to serverless functions
- **Routes**: Handles API routing and SPA fallback

### API Functions
Each API endpoint is now a separate serverless function:
- Automatic CORS handling for all origins
- TypeScript support with `@vercel/node`
- Shared storage interface for data consistency
- Proper error handling and HTTP status codes

## Environment Variables

If you need to add environment variables (for database connections, API keys, etc.):

1. **Via Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables

2. **Via CLI**:
   ```bash
   vercel env add VARIABLE_NAME
   ```

## Frontend API Integration

The frontend is already configured to work with Vercel's API routes:
- All API calls use relative URLs (`/api/...`)
- CORS is handled by the serverless functions
- TanStack Query is set up for data fetching

## Database Configuration

For production deployment with a real database:

1. Set up your PostgreSQL database (Neon, Supabase, or similar)
2. Add the `DATABASE_URL` environment variable in Vercel
3. Update the storage interface to use the real database instead of memory storage

## Testing the Deployment

After deployment, test these endpoints:
- `https://your-app.vercel.app/api/research-papers`
- `https://your-app.vercel.app/api/research-projects`
- `https://your-app.vercel.app/api/github-repos/featured`

## Custom Domain (Optional)

To add a custom domain:
1. Go to your Vercel project dashboard
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## Monitoring and Analytics

Vercel provides:
- **Function Logs**: View serverless function execution logs
- **Analytics**: Track page views and performance
- **Speed Insights**: Monitor Core Web Vitals
- **Error Tracking**: Automatic error reporting

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that `client/package.json` exists
   - Verify all dependencies are listed correctly

2. **API Function Errors**:
   - Check function logs in Vercel dashboard
   - Ensure imports are correct for the new structure

3. **CORS Issues**:
   - API functions include CORS headers
   - Check browser network tab for exact error

4. **Missing Dependencies**:
   - Add missing packages to `client/package.json`
   - Redeploy after updating dependencies

## Performance Optimization

1. **Function Cold Starts**: Vercel functions may have cold start delays
2. **Static Caching**: Frontend assets are automatically cached
3. **Edge Network**: Content is served from Vercel's global edge network

Your Research Implementation Tracker is now ready for production deployment on Vercel!