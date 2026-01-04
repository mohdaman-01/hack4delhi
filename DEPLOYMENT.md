# Deployment Guide for Netlify

## Quick Deploy Options

### Option 1: Drag & Drop (Easiest - 2 minutes)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire project folder onto the page
3. Wait for upload to complete
4. Your site is live! 🎉

### Option 2: GitHub + Netlify (Recommended for updates)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select your repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Automatic Deployments:**
   - Every push to `main` branch auto-deploys
   - Preview deployments for pull requests

### Option 3: Netlify CLI (For developers)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   # Test deploy
   netlify deploy
   
   # Production deploy
   netlify deploy --prod
   ```

## Custom Domain Setup

1. Go to your site settings in Netlify
2. Click "Domain management"
3. Click "Add custom domain"
4. Follow the DNS configuration instructions

## Environment Variables (If needed in future)

1. Go to Site settings → Build & deploy → Environment
2. Add variables as needed
3. Redeploy for changes to take effect

## Performance Optimization

Your site is already optimized with:
- ✅ Static files (no build process needed)
- ✅ CDN delivery via Netlify
- ✅ Automatic HTTPS
- ✅ Cache headers configured
- ✅ Security headers enabled
- ✅ SPA routing configured

## Monitoring

After deployment, monitor your site:
- **Analytics**: Enable Netlify Analytics in site settings
- **Forms**: If you add forms, enable Netlify Forms
- **Functions**: Can add serverless functions later if needed

## Troubleshooting

**Issue: Site not loading**
- Check Netlify deploy logs
- Verify all files are uploaded
- Check browser console for errors

**Issue: Map not showing**
- Ensure internet connection (maps load from CDN)
- Check browser console for API errors

**Issue: 404 errors**
- `_redirects` file handles SPA routing
- Verify it's in the root directory

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All navigation links work
- [ ] Maps display properly
- [ ] Charts render correctly
- [ ] Forms are functional
- [ ] Mobile responsive
- [ ] Test on different browsers

## Support

For Netlify-specific issues:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)

## Next Steps

Consider adding:
- Real backend API integration
- User authentication
- Database for storing reports
- Email notifications
- SMS alerts for critical zones
- PWA capabilities for offline access
