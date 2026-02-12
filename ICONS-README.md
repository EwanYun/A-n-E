# PWA Icons Note

For the app to look perfect when installed on phones, you need two icon files:

**Required icons:**
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

## Easy Way to Create Icons

### Option 1: Use a Photo
1. Pick a photo of you two together
2. Go to https://www.iloveimg.com/crop-image
3. Crop it to a square
4. Resize to 512x512 pixels
5. Download and save as `icon-512.png`
6. Resize the same image to 192x192 pixels
7. Save as `icon-192.png`
8. Put both files in the `public/` folder

### Option 2: Use a Simple Design
1. Go to https://www.canva.com/
2. Create a new design: 512x512 pixels
3. Add your initials, a heart, or something meaningful
4. Use your sage green (#87a96b) and purple (#9b7ebd) colors!
5. Download as PNG (512x512)
6. Save as `icon-512.png`
7. Do the same for 192x192
8. Put both in the `public/` folder

### Option 3: Placeholder (temporary)
Until you make proper icons, you can:
1. Create simple solid color squares using any image editor
2. Just make them 192x192 and 512x512
3. This will work but won't look as nice

## Where to Put Them

Both icon files go in:
```
our-moments/public/icon-192.png
our-moments/public/icon-512.png
```

The app already references these files in `manifest.json` - you just need to create them!
