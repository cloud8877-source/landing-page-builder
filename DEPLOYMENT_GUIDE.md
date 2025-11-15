# Firebase Deployment Guide

## 🔧 **Internal Server Error Fixes Applied**

The following fixes have been implemented to resolve the internal server error:

### 1. ✅ **Node.js Version Compatibility**
- Updated `functions/package.json` to use Node.js 18 (Firebase compatible)
- Added `runtime: "nodejs18"` to functions configuration

### 2. ✅ **Firebase Security Rules**
- Temporarily disabled App Check requirements in Firestore rules
- Updated `firestore.rules` to allow all requests for testing

### 3. ✅ **Environment Variable Handling**
- Created safe environment configuration (`lib/config/environment.ts`)
- Updated Firebase Admin SDK with better error handling
- Modified Gemini service to work without API key gracefully

### 4. ✅ **Cloud Functions Compatibility**
- Updated rate limiting middleware for serverless environments
- Added fallback configurations for missing environment variables
- Improved error handling throughout the application

## 🚀 **Deployment Instructions**

### **Step 1: Authenticate with Firebase**
```bash
firebase login
```

### **Step 2: Set Environment Variables Using Firebase CLI (Recommended)**

After authenticating with `firebase login`, run these commands to set your API keys securely:

**Set Gemini API Key:**
```bash
firebase functions:config:set gemini.api_key="your_gemini_api_key_here"
```

**Set Firebase Configuration:**
```bash
firebase functions:config:set firebase.api_key="your_firebase_api_key_here"
firebase functions:config:set firebase.auth_domain="your_project.firebaseapp.com"
firebase functions:config:set firebase.project_id="your_project_id"
firebase functions:config:set firebase.storage_bucket="your_project.appspot.com"
firebase functions:config:set firebase.messaging_sender_id="your_sender_id"
firebase functions:config:set firebase.app_id="your_app_id"
firebase functions:config:set firebase.measurement_id="your_measurement_id"
```

**Set App Configuration:**
```bash
firebase functions:config:set app.url="https://crypto-eon-475812-a1.web.app"
firebase functions:config:set app.base_domain="crypto-eon-475812-a1.web.app"
firebase functions:config:set whatsapp.default_number="60123456789"
```

### **Step 3: Update Code to Use Firebase Functions Config**

After setting the config, update your environment variable usage in the code to access `functions.config()`. The code has been updated to use these configurations.

### **Alternative Step 2: Set Environment Variables in Firebase Console**

If CLI doesn't work, go to [Firebase Console](https://console.firebase.google.com/project/crypto-eon-475812-a1/functions/config) and add the same variables manually.

### **Step 3: Deploy to Firebase**
```bash
firebase deploy
```

### **Alternative: Manual Deployment via Firebase Console**

If CLI deployment fails, you can:

1. **Functions**: Deploy via Firebase Console → Functions → Deploy
2. **Hosting**: Deploy via Firebase Console → Hosting → Deploy
3. **Firestore Rules**: Update via Firebase Console → Firestore → Rules
4. **Storage Rules**: Update via Firebase Console → Storage → Rules

## 🔍 **After Deployment**

### **Testing Checklist:**
- [ ] Main page loads: https://crypto-eon-475812-a1.web.app/
- [ ] API endpoints work: /api/leads, /api/ai/*
- [ ] Static assets load properly
- [ ] No internal server error

### **Monitoring:**
- Check Firebase Console → Functions → Logs for any errors
- Monitor Firebase Console → Hosting for deployment status
- Test all application functionality

### **Expected Result:**
The internal server error should be resolved, and the application should work properly at:
https://crypto-eon-475812-a1.web.app/

## 🔧 **Troubleshooting**

### **If Still Getting Internal Server Error:**
1. Check Cloud Functions logs in Firebase Console
2. Verify all environment variables are set correctly
3. Ensure Node.js 18 runtime is working
4. Check if all dependencies are installed

### **Common Issues:**
- **Authentication**: Make sure `firebase login` was successful
- **Environment Variables**: Double-check they're set in Cloud Functions runtime
- **Build Errors**: Check for any TypeScript or build errors

## 📝 **Post-Deployment Security**

After deployment, remember to:
1. **Re-enable App Check** once everything is working
2. **Review security rules** and tighten them appropriately
3. **Monitor logs** for any unusual activity
4. **Test all user flows** to ensure proper functionality

## 🆘 **Support**

If issues persist:
1. Check this file for updated instructions
2. Review Firebase Console logs for specific error messages
3. Test individual components (API endpoints, static pages, etc.)

The fixes should resolve the internal server error and restore full functionality to your landing page builder application!