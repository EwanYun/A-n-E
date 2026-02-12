# Our Moments 💚💜

A beautiful, romantic web app for tracking your shared bucket list and creating memories together. Built with love for Valentine's Day.

## Features ✨

- **Shared Bucket List**: Add future plans, dates, and dreams
- **Memory Keeper**: Mark moments complete and add photos
- **Beautiful Design**: Sage green and purple romantic color scheme
- **PWA Ready**: Install on both your phones like a native app
- **Real-time Sync**: Changes appear instantly on both devices
- **Private**: Secured with your shared access code

## Setup Instructions 🚀

I'll walk you through every step. Don't worry - it's easier than it looks!

### Step 1: Install Node.js (if you don't have it)

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Install it (just click through the installer)
4. Verify it worked by opening a terminal and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers appear.

### Step 2: Create a Firebase Project

Firebase will handle your database and photo storage for free.

1. Go to https://firebase.google.com/
2. Click "Get Started" and sign in with a Google account
3. Click "Add project"
4. Name it something like "our-moments" (it doesn't matter what)
5. You can disable Google Analytics (we don't need it)
6. Wait for it to create (takes ~30 seconds)

### Step 3: Set Up Firebase Services

Now we need to enable the features we'll use:

**Enable Firestore (Database):**
1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it properly later)
4. Choose a location close to you
5. Click "Enable"

**Enable Storage (for photos):**
1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Keep the default security rules
4. Choose the same location as before
5. Click "Done"

### Step 4: Get Your Firebase Config

1. Click the gear icon ⚙️ next to "Project Overview" → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>`
4. Register app with a nickname like "our-moments-app"
5. You'll see a code snippet with your config - it looks like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
6. **Copy this whole config object** - you'll need it in Step 6

### Step 5: Install the App

1. Open your terminal/command prompt
2. Navigate to where you extracted the app files:
   ```bash
   cd path/to/our-moments
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   This will take a few minutes - it's downloading all the libraries we need.

### Step 6: Add Your Firebase Config

1. Open the file `src/firebase.js`
2. Replace the placeholder config with YOUR config from Step 4:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
     // ... paste your actual values here
   };
   ```

### Step 7: Set Your Access Code

1. Open `src/components/LoginScreen.js`
2. Find this line (around line 8):
   ```javascript
   const CORRECT_CODE = 'ourlove2025';
   ```
3. Change `'ourlove2025'` to whatever secret code you want!
   - Make it something meaningful to you two
   - Keep it lowercase (the app converts everything to lowercase)
   - Tell your girlfriend the code so she can access it too 💜

### Step 8: Run the App!

```bash
npm start
```

This will:
- Start a development server
- Open your browser automatically to http://localhost:3000
- Show you the app!

Try it out:
1. Enter your access code
2. Add a moment
3. Test marking it complete
4. Upload a photo

### Step 9: Deploy It Online

Right now it only runs on your computer. Let's put it online so you both can access it from your phones!

**Deploy to Netlify (Easiest):**

1. Create an account at https://netlify.com (free)
2. Build your app:
   ```bash
   npm run build
   ```
3. Drag the `build` folder to Netlify's deploy zone
4. Done! You'll get a URL like `your-app.netlify.app`

**OR Deploy to Firebase Hosting:**

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize hosting:
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Set public directory to `build`
   - Configure as single-page app: Yes
   - Don't overwrite files: No
4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```
5. You'll get a URL like `your-app.web.app`

### Step 10: Install as PWA on Your Phones

Once it's deployed online:

**On iPhone:**
1. Open the URL in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Name it "Our Moments" ✨
5. Tap "Add"

**On Android:**
1. Open the URL in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen"
4. Tap "Add"

Now you both have it as an app icon on your phones!

## Customization Ideas 🎨

Want to personalize it more?

**Change the access code reminder:**
Edit `src/components/LoginScreen.js` line 15

**Change colors:**
Edit `src/App.css` - look for:
- `#87a96b` (sage green)
- `#9b7ebd` (purple)

**Change the title/subtitle:**
Edit `src/App.js` lines 59-60

**Add more categories:**
Edit `src/components/AddMoment.js` lines 15-23

## Troubleshooting 🔧

**"Module not found" errors:**
```bash
npm install
```

**Firebase errors when adding moments:**
- Check that you updated `src/firebase.js` with your actual config
- Make sure Firestore and Storage are enabled in Firebase Console

**Can't upload photos:**
- Check Firebase Storage is enabled
- Check your Storage rules allow writes

**App won't load:**
- Check browser console for errors (F12)
- Make sure `npm start` is running
- Try clearing cache and refreshing

## Security Note 🔒

Before sharing widely, you should secure your Firebase:

1. Go to Firestore → Rules
2. Replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /moments/{moment} {
      allow read, write: if true;
    }
  }
}
```

For production, you'd want proper authentication, but for a private couples app, this works fine.

## Need Help?

If you get stuck:
1. Check the terminal for error messages
2. Check the browser console (F12) for errors
3. Make sure all steps above are completed
4. Google the error message - often someone else had the same issue!

## Have Fun! 💚💜

This is your app - make it yours! Add inside jokes, change the design, add features. The code is well-commented and organized, so feel free to experiment.

Happy Valentine's Day! 🌹
