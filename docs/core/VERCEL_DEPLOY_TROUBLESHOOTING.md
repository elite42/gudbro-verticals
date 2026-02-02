# Vercel Deploy Troubleshooting - Guida Operativa

## Problema Riscontrato

**Data**: 22 Gennaio 2026
**Progetto**: gudbro-backoffice (nuovo progetto Vercel per recovery)

### Sintomi

- Nuovo progetto Vercel creato e configurato correttamente
- Environment Variables aggiunte con successo (9 variabili)
- Repository GitHub collegato: `elite42/gudbro-verticals`
- Root Directory configurato: `apps/backoffice`
- **Nessun deployment viene triggerato**

### Tentativi Effettuati

#### 1. Create Deployment Modal (UI) - ❌ NON FUNZIONA

- Il form "Create Deployment" accetta input ma il pulsante rimane disabilitato
- Digitare "main" o il commit hash mostra il dropdown con opzioni valide
- Il checkmark verde appare ma il pulsante "Create Deployment" resta grigio
- **Problema**: Sembra un bug dell'UI di Vercel per progetti senza deployment precedenti

#### 2. Deploy Hook - ⚠️ RISPONDE MA NON CREA DEPLOYMENT

```bash
# Creato deploy hook da Settings > Git > Deploy Hooks
# Nome: manual-deploy
# Branch: main
# URL: https://api.vercel.com/v1/integrations/deploy/prj_afWLeqM0HPSAGSrc3ciysNJP2gED/NDtbFLEjIX
```

**Risposta API**:

```json
{
  "status": 201,
  "data": {
    "job": {
      "state": "PENDING",
      "id": "..."
    }
  }
}
```

- L'API risponde con 201 (Created) e stato PENDING
- Ma nessun deployment appare nella dashboard
- Il job rimane in PENDING indefinitamente

#### 3. Git Push - ❌ NON POSSIBILE

- Il repo locale è 4 commit ahead di origin
- Git push fallisce per mancanza di credenziali GitHub nel container

### Ricerche Effettuate

#### Limitazioni Piano Hobby

Secondo la [community Vercel](https://community.vercel.com/t/unable-to-deploy-from-organizational-private-repository/16334):

- **Repo privati di organizzazioni**: NON supportati su Hobby plan
- **NOTA**: Il nostro repo `elite42/gudbro-verticals` è **PUBBLICO** e `elite42` è un account personale, NON un'organizzazione

#### Deploy Hook Issues

Dalla [documentazione Vercel](https://vercel.com/docs/deploy-hooks):

- I deploy hook possono rimanere in PENDING se ci sono problemi di permessi
- Verificare che il git author abbia accesso al progetto Vercel
- Verificare che i metadata git corrispondano all'account GitHub

### Settings Verificati

- ✅ Connected Git Repository: elite42/gudbro-verticals
- ✅ Root Directory: apps/backoffice
- ✅ Framework Preset: Next.js
- ✅ Build Command: `cd ../.. && pnpm turbo build --filter=backoffice`
- ✅ Install Command: `cd ../.. && pnpm install`
- ✅ Include files outside root directory: Enabled
- ✅ deployment_status Events: Enabled
- ✅ repository_dispatch Events: Enabled
- ✅ Vercel Authentication: Enabled (Standard Protection)

### Prossimi Passi da Provare

1. **Verificare Deployment Protection Settings**
   - Controllare se ci sono restrizioni che bloccano i deployment

2. **Provare GitHub Actions con Vercel CLI**
   - Workaround documentato per forzare deployment
   - Richiede token Vercel

3. **Contattare Support Vercel**
   - Se il problema persiste, potrebbe essere un bug

4. **Verificare altri progetti Vercel**
   - gudbro-coffeeshop-pwa e gudbro-website funzionano?
   - Confrontare le configurazioni

### Lezioni Apprese

1. **Il "Create Deployment" button può essere buggato** per nuovi progetti senza deploy precedenti

2. **Deploy Hook restituisce 201 ma non garantisce il deployment** - il job può rimanere in PENDING

3. **Sempre documentare i tentativi** per non ripetere gli stessi passi

4. **Verificare prima le limitazioni del piano** (Hobby vs Pro)

5. **Per monorepo, assicurarsi che**:
   - Root Directory sia corretto
   - "Include files outside root directory" sia abilitato
   - I comandi build/install navigano correttamente alla root del monorepo

---

## Riferimenti Utili

- [Vercel Deploy Hooks Docs](https://vercel.com/docs/deploy-hooks)
- [Vercel Monorepo Docs](https://vercel.com/docs/monorepos)
- [Vercel API - Create Deployment](https://vercel.com/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment)
- [Community: Deploy Hooks Not Triggering](https://community.vercel.com/t/deploy-hooks-no-longer-triggering-deployments/22074)
- [Community: Private Org Repo Restrictions](https://community.vercel.com/t/unable-to-deploy-from-organizational-private-repository/16334)
