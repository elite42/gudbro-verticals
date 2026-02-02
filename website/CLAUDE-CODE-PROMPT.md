# Prompt per Claude Code - Test GUDBRO Website

## Istruzioni

Ho già creato il sito GUDBRO marketing website in `/website/site/`. È un progetto Next.js 14 con tutte le pagine pronte.

### Step 1: Avvia il server

```bash
cd /website/site
npm run dev -- --port 3006
```

### Step 2: Apri il browser e mostrami le pagine

Apri queste pagine nel browser e fai screenshot di ognuna:

1. **Homepage**: http://localhost:3006/
   - Hero con phone mockup
   - Stats bar (4,653+ products, 50+ languages...)
   - 6 Vertical cards (Coffeeshop, Tours, Stays, Wellness, Rentals, Backoffice)
   - How It Works (3 steps)
   - Partnership Network section
   - Testimonials carousel
   - Pricing preview
   - Final CTA

2. **Coffeeshop Vertical**: http://localhost:3006/coffeeshop

3. **Tours Vertical**: http://localhost:3006/tours

4. **Pricing Page**: http://localhost:3006/pricing
   - Commission comparison table

5. **Partnership Network**: http://localhost:3006/partnership-network
   - GUDBRO Pass mockup

6. **About**: http://localhost:3006/about

7. **Contact**: http://localhost:3006/contact

### Step 3: Test navigazione

- Clicca sui link del menu header
- Verifica che il mobile menu funzioni (resize a mobile)
- Controlla che tutti i link funzionino

### Design da verificare

- **Primary color**: Blue (#2563EB) - ispirato a meandu.com
- **Font**: Plus Jakarta Sans (system fallback ok)
- **Style**: Clean, professional, trustworthy
- **Mobile-first**: Responsive su tutti i breakpoints

### Note

Il sito è stato creato seguendo il brief in `/website/WEBSITE-BRIEF.md` con:
- 10 pagine complete
- Header con mobile menu
- Footer con tutti i links
- Componenti riutilizzabili per i verticals
- CSS custom con Tailwind v4
