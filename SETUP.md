# Quick Setup Guide

## ⚠️ SECURITY WARNING - IMPORTANT
**NEVER commit your `.env` file or any files containing actual API keys to version control!**
- Use `.env.local` for local development (already in .gitignore)
- Keep `.env.example` as a template with placeholder values only
- If you accidentally expose API keys, regenerate them immediately in Google Cloud Console

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your Firebase credentials** (get from Firebase Console)
3. **Add Billplz API keys** (get from Billplz dashboard)
4. **Set your WhatsApp number** for lead notifications

**Note:** Use `.env.local` instead of `.env` to ensure it's excluded from version control.

## Step 3: Set up Firebase

### Create Firebase Project
1. Visit https://console.firebase.google.com/
2. Click "Add project"
3. Follow the wizard to create your project

### Enable Authentication
1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Enable "Google" provider
5. Add your domain to authorized domains

### Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your preferred location

### Create Storage Bucket
1. Go to Storage
2. Click "Get started"
3. Accept the default security rules

### Deploy Rules
```bash
firebase login
firebase init firestore
firebase init storage
firebase deploy --only firestore,storage
```

## Step 4: Get Firebase Config

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app
5. Copy the config values to your `.env.local` file

**Important:** These are public Firebase config values safe for client-side use.

## Step 5: Set up Billplz (Optional)

1. Sign up at https://www.billplz.com/
2. Go to Settings > API Keys
3. Copy your API Secret Key
4. Create a Collection and copy the Collection ID
5. Add both to your `.env.local` file

## Step 6: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Step 7: Test the Application

1. Sign up for a new account
2. Create a new property site
3. Choose a template
4. Customize with the page builder
5. Publish your site

## Troubleshooting

### Firebase Connection Issues
- Make sure all environment variables are set correctly in `.env.local`
- Check that Firebase rules are deployed
- Verify your domain is authorized in Firebase Console
- Ensure the development server has been restarted after adding environment variables

### Page Builder Not Loading
- Clear browser cache
- Check browser console for errors
- Make sure GrapesJS dependencies are installed
- Restart the development server

### Subdomain Routing Not Working
- For local development, subdomain routing is limited
- Use the direct URL: http://localhost:3000/sites/[subdomain]
- For production, configure wildcard DNS

## Next Steps

1. Customize the templates in `lib/templates/`
2. Add your own branding
3. Configure custom domains
4. Set up email notifications
5. Deploy to production

## Production Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Firebase Hosting
```bash
# Build the app
npm run build

# Deploy
firebase deploy --only hosting
```

## Security Best Practices

1. **Environment Variables:**
   - Use `.env.local` for local development
   - Never commit `.env` files to version control
   - Use environment variables in production (Vercel, Netlify, etc.)

2. **API Key Management:**
   - Regenerate API keys if accidentally exposed
   - Set up API key restrictions in Google Cloud Console
   - Monitor usage in your Google Cloud Console

3. **Firebase Security Rules:**
   - Review and customize Firestore rules for your use case
   - Test security rules thoroughly before production

## Need Help?

- Check the main README.md for detailed documentation
- Review Firebase documentation: https://firebase.google.com/docs
- Check Next.js documentation: https://nextjs.org/docs
- Review GrapesJS documentation: https://grapesjs.com/docs/

## Key Files to Customize

- `lib/templates/` - Property templates
- `lib/translations.ts` - Multi-language content
- `components/builder/GrapesJSEditor.tsx` - Page builder customization
- `app/page.tsx` - Landing page
- `app/globals.css` - Global styles
