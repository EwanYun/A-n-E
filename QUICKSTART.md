# Quick Start Guide - Get Running in 15 Minutes! ⚡

Follow these steps to get your app up and running quickly:

## 1. First Time Setup (5 minutes)

### Install Node.js
- Go to https://nodejs.org/ 
- Download and install the LTS version
- That's it!

### Create Firebase Project
- Go to https://console.firebase.google.com/
- Click "Add project"
- Name it "our-moments"
- Disable Google Analytics
- Click "Create project"

### Enable Firestore & Storage
1. **Firestore:**
   - Left sidebar → "Firestore Database"
   - "Create database" → "Test mode" → Pick a location → "Enable"

2. **Storage:**
   - Left sidebar → "Storage"
   - "Get started" → Use default rules → Same location → "Done"

### Get Your Firebase Config
- Click ⚙️ → "Project settings"
- Scroll down → Click `</>` (web icon)
- Copy the `firebaseConfig` object (the part with apiKey, authDomain, etc.)

## 2. Configure the App (3 minutes)

### Install Dependencies
Open terminal in the `our-moments` folder:
```bash
npm install
```

### Add Your Firebase Config
Open `src/firebase.js` and replace the config:
```javascript
const firebaseConfig = {
  // PASTE YOUR CONFIG HERE
};
```

### Set Your Access Code
Open `src/components/LoginScreen.js`, line 8:
```javascript
const CORRECT_CODE = 'yoursecretcode'; // Change this!
```

## 3. Run It! (1 minute)
```bash
npm start
```

Browser opens automatically → Enter your access code → Start adding moments! 🎉

## 4. Put It Online (5 minutes)

### Build It
```bash
npm run build
```

### Deploy to Netlify (Easiest!)
1. Go to https://app.netlify.com/drop
2. Drag the `build` folder there
3. Get your URL!
4. Share with your girlfriend 💜

### Install on Phones
**iPhone:** Open in Safari → Share → "Add to Home Screen"
**Android:** Open in Chrome → Menu → "Add to Home Screen"

---

## That's It! 🎉

You now have a beautiful couples app that:
- ✅ Works on both your phones
- ✅ Syncs in real-time
- ✅ Stores photos in the cloud
- ✅ Is completely private to you two

Need detailed help? Check the main README.md

## Common Issues

**"Module not found":** Run `npm install` again

**Firebase errors:** Make sure you:
- Enabled Firestore in test mode
- Enabled Storage
- Updated firebase.js with YOUR config

**Can't see photos:** Make sure Storage is enabled in Firebase

---

Happy Valentine's Day! 💚💜
