# 🚀 SK Taufique Hossain - Neural 3D Portfolio Setup Guide

Welcome to your futuristic AI-inspired portfolio with heavy 3D graphics, neural networks, and glowing neon aesthetics!

## 📋 What's New (3D Upgrade)

✅ **Hero Section**: Glowing wireframe sphere + orbiting particle field + neural synapse lines  
✅ **All Sections**: Ambient 3D particle backgrounds (performance-aware)  
✅ **Skills Section**: 3D orbiting tech stack visualization  
✅ **Services/Portfolio**: Real mouse-tracked 3D tilt effect on cards  
✅ **Future Vision**: Heavy neural mesh sphere (densest 3D scene)  
✅ **Loading Screen**: Rotating 3D wireframe + progress bar  
✅ **Global Theme**: Dark cyan-violet futuristic aesthetic  
✅ **Performance**: Auto-scales 3D quality based on device capability  

---

## 🛠 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `three` - 3D rendering engine
- `@react-three/fiber` - React wrapper for Three.js
- `@react-three/drei` - 3D helpers
- `@react-three/postprocessing` - Bloom/glow effects
- All other existing dependencies (Framer Motion, Tailwind, etc.)

### Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site defaults to **dark mode** (neural theme) on first load. This is intentional — the futuristic aesthetic is designed dark-first.

---

## 📧 Email Integration (Contact Form)

### Current Setup: `mailto:` (Works Instantly)

Your contact form uses a simple `mailto:` link approach — **no backend required**.

When users submit the form, their default email client opens with pre-filled subject and body, sending to: **`taufique.support@gamil.com`**

✅ **Pros**: 
- Works immediately, no setup needed
- No backend required
- GDPR-friendly (data stays on user's device)

❌ **Cons**:
- User sees their email client (not seamless)
- No data validation on your end

### Upgrade Option 1: Formspree (Recommended for Production)

Formspree is **free, no-code email backend** — messages come to your inbox without user's email client opening.

**Setup (2 minutes)**:

1. Go to https://formspree.io
2. Sign up (free)
3. Create a new form, enter: `taufique.support@gamil.com`
4. Copy the form endpoint (e.g., `https://formspree.io/f/xyzabc123`)
5. Replace the `mailto:` logic in `components/portfolio/contact.tsx`:

```typescript
// Replace the entire handleSubmit function with:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
    method: 'POST',
    body: new FormData(e.currentTarget),
    headers: { 'Accept': 'application/json' }
  })
  
  if (response.ok) {
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }
}
```

### Upgrade Option 2: EmailJS (Gmail Integration)

EmailJS lets you send from your Gmail account directly — even more seamless.

**Setup (5 minutes)**:

1. Go to https://www.emailjs.com
2. Sign up, connect your Gmail account
3. Get your `Service ID` and `Template ID`
4. Install: `npm install @emailjs/browser`
5. Add to `contact.tsx`:

```typescript
import emailjs from '@emailjs/browser'

useEffect(() => {
  emailjs.init('YOUR_PUBLIC_KEY_HERE')
}, [])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    await emailjs.send(
      'SERVICE_ID',
      'TEMPLATE_ID',
      {
        to_email: 'taufique.support@gamil.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      }
    )
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  } catch (error) {
    console.error('Email send failed:', error)
  }
}
```

---

## 🎨 Color Customization

The entire site uses CSS variables. To change the neon theme:

**File**: `app/globals.css`

```css
:root {
  --neon-cyan: #5eead4;        /* Primary accent */
  --neon-cyan-bright: #22d3ee;  /* Brighter cyan */
  --neon-violet: #a78bfa;       /* Secondary accent */
  --neon-violet-bright: #c084fc; /* Brighter violet */
  --void: #05070d;              /* Deep background */
}
```

Change these hex values to customize the glow colors globally.

---

## 📱 Performance & 3D Quality

The site automatically scales 3D complexity based on device capability:

- **High-end**: 2200 particles, 90 neural nodes, bloom effects enabled
- **Mid-range**: 1100 particles, 55 nodes, reduced bloom
- **Low-end**: 400 particles, 30 nodes, bloom disabled

Override via `hooks/use-perf-tier.ts` if needed.

**Mobile note**: Heavy 3D scenes (Hero, Future Vision) may load slower on older phones. The site gracefully degrades.

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Go to https://vercel.com
3. Import your repo
4. Deploy (automatic)

Vercel auto-detects Next.js and handles everything.

### Option 2: Any Node.js Host

1. Build: `npm run build`
2. Start: `npm start`
3. Deploy to Heroku, Railway, Render, etc.

### Option 3: Static Export (SSG)

If you want to host on GitHub Pages or S3:

```bash
npm run build
npm run export  # Note: this requires `output: 'export'` in next.config.mjs
```

---

## 📝 Social Links (Not Yet Added)

Currently, social links in footer/nav are placeholder `#` links. When ready, update:

**File**: `components/portfolio/footer.tsx` and `components/portfolio/social-links.tsx`

Change:
```typescript
{ icon: Github, href: '#', label: 'GitHub' },
```

To:
```typescript
{ icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
```

---

## 🎯 Key Files Changed

### New 3D Components:
- `components/three/scene-wrapper.tsx` - Reusable Canvas wrapper
- `components/three/neural-core-scene.tsx` - Hero 3D centerpiece
- `components/three/neural-mesh-scene.tsx` - Future Vision heavy scene
- `components/three/skill-orbit-scene.tsx` - Skills 3D visualization
- `components/three/ambient-field.tsx` - Lightweight particle backgrounds
- `hooks/use-perf-tier.ts` - Device performance detection

### Updated Components (3D + Neon Theme):
- `components/portfolio/hero.tsx` - Added 3D core + bloom
- `components/portfolio/about.tsx` - Ambient particles + neon cards
- `components/portfolio/skills.tsx` - 3D orbit ring
- `components/portfolio/services.tsx` - Mouse-tracked 3D tilt cards
- `components/portfolio/portfolio.tsx` - 3D tilt + neon styling
- `components/portfolio/future-vision.tsx` - Heavy neural mesh
- `components/portfolio/contact.tsx` - Email integration
- All other sections - Ambient backgrounds + neon glassy cards

### Theme & Config:
- `app/globals.css` - New cyan-violet dark theme + utilities
- `app/layout.tsx` - Dark mode by default
- `next.config.mjs` - Three.js transpile config

---

## 🐛 Troubleshooting

**Q: 3D scenes not rendering**
- Check browser console for WebGL errors
- Try Chrome/Edge (WebGL support best there)
- 3D disabled on very old devices automatically

**Q: Slow on mobile**
- This is expected — heavy 3D is desktop-first design
- Auto-degrades to fewer particles on weak devices
- Future optimization: Skip 3D on mobile entirely (possible)

**Q: "Module not found" errors after npm install**
- Make sure you ran `npm install` successfully
- Try `npm install --legacy-peer-deps` if conflicts
- Delete `node_modules` and `package-lock.json`, then `npm install` again

**Q: Dark mode toggle not working**
- Check browser localStorage is enabled
- Try clearing site data and refresh

---

## 💡 Next Steps

1. ✅ Install & test locally (`npm run dev`)
2. 📧 Decide on email integration (mailto → Formspree → EmailJS)
3. 🔗 Add real social links
4. 📸 Update project portfolio with your actual work
5. 🚀 Deploy to Vercel/hosting

---

## 📞 Support

This portfolio is fully customizable. Feel free to:
- Change colors in `globals.css`
- Add/remove 3D scenes by editing section components
- Modify text, images, links throughout
- Adjust animation speeds in Framer Motion props

Good luck! 🚀✨
