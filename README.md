# Property Landing Page Builder - Malaysia

A complete multi-tenant SaaS platform for Malaysian property agents to create professional landing pages with drag-and-drop functionality.

## Features

- **Multi-Tenant Architecture**: Each agent gets their own subdomain
- **5 Malaysian Property Templates**: Luxury Condo, Affordable Housing, Commercial, Landed, Serviced Apartment
- **Drag-Drop Page Builder**: Powered by GrapesJS
- **Lead Capture**: Built-in contact forms with Firebase storage
- **WhatsApp Integration**: Direct WhatsApp contact buttons
- **Multi-Language**: Support for English, Malay (Bahasa Malaysia), and Mandarin
- **Firebase Backend**: Authentication, Firestore, Storage
- **Payment Gateway**: Billplz integration for Malaysian payments
- **Mobile Responsive**: All templates work perfectly on mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Page Builder**: GrapesJS with custom Malaysian property blocks
- **Backend**: Firebase (Auth, Firestore, Storage, Hosting)
- **Payment**: Billplz (Malaysian payment gateway)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Billplz account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landing-page-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Firebase and Billplz credentials:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (for server-side)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_DOMAIN=localhost:3000

# Billplz Payment Gateway
BILLPLZ_API_KEY=your_billplz_api_key
BILLPLZ_COLLECTION_ID=your_collection_id
BILLPLZ_X_SIGNATURE_KEY=your_signature_key

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_DEFAULT_NUMBER=60123456789
```

4. Set up Firebase:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore
firebase deploy --only storage
```

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Google Analytics (optional)

### 2. Enable Authentication

1. Go to Authentication > Sign-in method
2. Enable Email/Password
3. Enable Google sign-in
4. Add authorized domains

### 3. Create Firestore Database

1. Go to Firestore Database
2. Create database in production mode
3. Deploy the rules using: `firebase deploy --only firestore`

### 4. Set up Storage

1. Go to Storage
2. Get started with default rules
3. Deploy storage rules: `firebase deploy --only storage`

### 5. Get Firebase Config

1. Go to Project Settings
2. Under "Your apps", click "Web app"
3. Copy the configuration values to your `.env` file

## Billplz Setup

1. Sign up at [Billplz](https://www.billplz.com/)
2. Get your API credentials
3. Create a collection for subscriptions
4. Add credentials to `.env` file

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── leads/        # Lead capture API
│   │   └── payment/      # Payment integration
│   ├── builder/          # Page builder interface
│   ├── dashboard/        # User dashboard
│   ├── login/           # Authentication page
│   └── sites/           # Subdomain routing
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── builder/         # GrapesJS editor
│   ├── layout/          # Layout components
│   └── ui/              # Shadcn/ui components
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── lib/                 # Utility libraries
│   ├── firebase/        # Firebase configuration
│   ├── templates/       # Property templates
│   ├── translations.ts  # Multi-language support
│   ├── types/           # TypeScript types
│   └── utils.ts         # Utility functions
├── public/              # Static assets
├── firestore.rules      # Firestore security rules
├── storage.rules        # Storage security rules
└── next.config.js       # Next.js configuration
```

## Features Guide

### Creating a Landing Page

1. Sign up / Log in
2. Click "Create New Site"
3. Choose a template (Luxury Condo, Affordable Housing, etc.)
4. Enter site details and subdomain
5. Use the visual editor to customize
6. Publish your site

### Using the Page Builder

- Drag and drop components from the left panel
- Customize styles in the right panel
- Preview on different devices (desktop, tablet, mobile)
- Auto-saves every 30 seconds
- Click "Save Changes" to save manually

### Lead Management

- View all leads in the dashboard
- Leads are captured from contact forms
- WhatsApp integration for instant follow-up
- Export leads data (coming soon)

### Multi-Language Support

The application includes translations for:
- English
- Bahasa Malaysia (Malay)
- Mandarin Chinese

Templates automatically adjust based on user's language preference.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Firebase Hosting

```bash
# Build the project
npm run build
npm run export

# Deploy to Firebase
firebase deploy --only hosting
```

## Subdomain Configuration

For production, configure your DNS:

1. Add a wildcard CNAME record: `*.yourdomain.com` → your hosting
2. Update `NEXT_PUBLIC_BASE_DOMAIN` in environment variables
3. Configure your hosting platform for wildcard domains

For development, you can test subdomains using:
- `subdomain.localhost:3000` (works in some browsers)
- Local DNS configuration
- Tools like `ngrok` or `localhost.run`

## Pricing Plans

- **Free**: 1 site, basic templates
- **Pro** (RM 49/month): 5 sites, all templates, custom domain
- **Enterprise** (RM 199/month): Unlimited sites, priority support

## Support

For issues and feature requests, please create an issue in the GitHub repository.

## License

This project is licensed under the MIT License.

## Credits

- Built with Next.js 14 and Firebase
- UI components by Shadcn/ui
- Page builder powered by GrapesJS
- Icons by Lucide React
- Designed for Malaysian property agents

---

Made with ❤️ for Malaysian Property Agents
