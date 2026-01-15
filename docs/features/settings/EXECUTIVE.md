# Settings - Executive Summary

> Centro di controllo per configurazione completa del locale.

---

## Cosa Fa

Settings e' il **centro di controllo** dove i gestori configurano tutto: profilo aziendale, branding, orari operativi, metodi di pagamento (fiat + crypto), piattaforme social e delivery, autenticazione OAuth, lingue e valute. Include 23+ integrazioni con piattaforme Asia (Zalo, LINE, Momo, GrabFood).

---

## Perche E' Importante

| Impatto                    | Descrizione                                           |
| -------------------------- | ----------------------------------------------------- |
| **Personalizzazione**      | Ogni aspetto riflette il brand locale                 |
| **Flessibilita Pagamenti** | Multi-payment (fiat + crypto) attrae diversi segmenti |
| **Localizzazione**         | Timezone, currency, lingue = ready for global ops     |
| **Operazioni Complesse**   | Orari variabili (vacanze, stagioni) = business reale  |
| **Integrazione Social**    | 23+ piattaforme = customer acquisition                |

---

## Stato Attuale

| Aspetto        | Stato       | Note                         |
| -------------- | ----------- | ---------------------------- |
| Funzionalita   | 🟡 75%      | Core OK, Calendar incompleto |
| Test Coverage  | ❌ Minimo   | Solo validation tests        |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md           |
| Database       | ✅ 100%     | Tabelle complete             |

---

## Funzionalita Chiave

### 1. General Settings

- **Business Profile**: Nome, tipo, descrizione, logo
- **Regional**: Timezone, valuta, lingua primaria
- **Branding**: Colori, tema (light/dark/auto)
- **Notifications**: Email, suoni per tipo evento

### 2. Operating Hours

- **Orari Settimanali**: 7 giorni configurabili
- **Override Types**:
  | Tipo | Uso |
  |------|-----|
  | Closures | Chiusure temporanee |
  | Holidays | Festivita ricorrenti |
  | Seasonal | Orari stagionali |
  | Special | Eventi one-off |

### 3. Payment Methods

#### Fiat (9 metodi)

| Provider    | Note                |
| ----------- | ------------------- |
| Stripe      | Card payments       |
| PayPal      | Global              |
| Apple Pay   | iOS                 |
| Google Pay  | Android             |
| Samsung Pay | Samsung devices     |
| VietQR      | Vietnam QR payments |
| Momo        | Vietnam e-wallet    |
| ZaloPay     | Vietnam e-wallet    |

#### Crypto (4 currency)

- Bitcoin (BTC)
- Ethereum (ETH)
- USDC
- USDT

Features: validazione indirizzi wallet, network selection, timeout configurabile

### 4. Social & Delivery (23+ piattaforme)

| Categoria     | Piattaforme                                                         |
| ------------- | ------------------------------------------------------------------- |
| **Social**    | Facebook, Instagram, TikTok, X, YouTube, LinkedIn                   |
| **Asia Chat** | Zalo, LINE, KakaoTalk, WeChat, Xiaohongshu                          |
| **Review**    | Google Business, TripAdvisor, Dianping, Yelp                        |
| **Delivery**  | GrabFood, ShopeeFood, GoJek, Baemin, Foodpanda, Deliveroo, UberEats |

- Custom links illimitati

### 5. Auth Settings (8 OAuth providers)

- Google
- Apple
- Facebook
- GitHub
- X (Twitter)
- LinkedIn
- Discord
- Microsoft

* Email/Password sempre abilitato

### 6. Languages

- 33+ lingue disponibili
- RTL support (Arabic, Hebrew)
- Primary language selector
- Multi-lingua per menu

### 7. Currency

- Exchange rates da exchangerate-api.com
- Refresh giornaliero
- Visualizzazione tassi
- Conversione esempi

---

## Metriche Chiave

| Metrica                     | Valore |
| --------------------------- | ------ |
| Metodi pagamento fiat       | 9      |
| Crypto supportate           | 4      |
| Piattaforme social/delivery | 23+    |
| OAuth providers             | 8      |
| Lingue disponibili          | 33+    |
| Override types orari        | 4      |

---

## Competitivita

| Aspetto                          | GUDBRO | Toast | Square | Lightspeed |
| -------------------------------- | ------ | ----- | ------ | ---------- |
| Crypto payments                  | ✅     | ❌    | ❌     | ❌         |
| Asia payment (Momo, ZaloPay)     | ✅     | ❌    | ❌     | ❌         |
| Asia social (Zalo, LINE)         | ✅     | ❌    | ❌     | ❌         |
| Asia delivery (GrabFood, Baemin) | ✅     | ❌    | ❌     | ❌         |
| Schedule overrides               | ✅     | 🟡    | 🟡     | ✅         |
| Multi OAuth                      | ✅     | ✅    | ✅     | 🟡         |
| RTL languages                    | ✅     | ❌    | ❌     | 🟡         |

---

## Roadmap

### Completato

- [x] General settings (profile, regional, branding, notifications)
- [x] Hours settings (weekly + 4 override types)
- [x] Payments (9 fiat + 4 crypto)
- [x] Social (23+ platforms + custom)
- [x] Auth (8 OAuth providers)
- [x] Languages (33+ con RTL)
- [x] Currency (exchange rates view)

### In Progress

- [ ] Calendar page (incompleta)

### Planned

- [ ] Auth context integration (replace demo merchant)
- [ ] General settings persistence
- [ ] Currency merchant config
- [ ] E2E testing

---

## Rischi & Mitigazioni

| Rischio                      | Probabilita | Impatto | Mitigazione              |
| ---------------------------- | ----------- | ------- | ------------------------ |
| Demo mode hardcoded          | Alta        | Medio   | Replace con auth context |
| General settings non salvano | Alta        | Medio   | Implementare persistence |
| Calendar incompleto          | Media       | Basso   | Non critico per MVP      |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                           | Scopo            |
| ---------------------------------------------- | ---------------- |
| `app/(dashboard)/settings/layout.tsx`          | Layout con tabs  |
| `app/(dashboard)/settings/page.tsx`            | General settings |
| `app/(dashboard)/settings/hours/page.tsx`      | Orari operativi  |
| `app/(dashboard)/settings/payments/page.tsx`   | Pagamenti        |
| `app/(dashboard)/settings/social/page.tsx`     | Social links     |
| `app/(dashboard)/settings/auth/page.tsx`       | OAuth config     |
| `app/api/settings/payments/route.ts`           | API pagamenti    |
| `app/api/settings/social/route.ts`             | API social       |
| `migrations/043-merchant-payment-settings.sql` | Schema payments  |
| `migrations/044-merchant-social-links.sql`     | Schema social    |

---

_Ultimo aggiornamento: 2026-01-14_
