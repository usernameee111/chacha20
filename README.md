# ChaCha20 Ultra Visual (Ready)

This project is a React + Vite + Three.js visualization of the ChaCha20 cipher, with step-by-step trace playback, sound cues, and neon cyber styling.

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Build (for Vercel):
```bash
npm run build
```

4. Preview:
```bash
npm run preview
```

Notes:
- The `Try` panel uses the real ChaCha20 block function to produce a 64-byte keystream for a single block (educational demo). For long messages you'd need to iterate blocks (can be added).
- Vercel: this repo includes `vercel.json` and a `build` script. If Vercel fails, check build logs for errors and Node version.
