# Phase 28: Document Upload + Visa Tracking - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Verified guests can upload passport and visa documents from the in-stay dashboard. The system tracks visa expiry dates and sends reminders. Property owners view, download, and track registration status of guest documents in the backoffice. All documents auto-delete after a configurable retention period post-checkout, compliant with GDPR/PDPA/PDPL.

**Out of scope:** OCR auto-extraction of passport data fields, automated submission to government portals (NA17/TM30), visa extension booking/payment.

</domain>

<decisions>
## Implementation Decisions

### Upload Experience

- Camera as default entry point, with "choose from gallery" as fallback option
- Two document types: **passport data page** (first upload) and **visa page** (first upload + renewals)
- For renewals, only the new visa page is needed (passport already on file)
- Manual date entry for visa expiry date (no OCR date extraction in v1)
- OCR used for **photo quality validation only**: detect blurry photos, wrong page (not a visa page), unreadable content — prompt user to retake
- User mentioned: visa stamps from border entry are often unclear/hard to read — quality validation should account for this with helpful guidance messages
- HEIC conversion + image compression before upload (browser-image-compression + heic2any, already approved as zero-new-dependency in Phase 26 decisions)

### Visa Expiry Progress Bar

- Dismissable alert box at top of dashboard (not sticky — scrolls with content)
- Always visible on dashboard load for verified guests with an uploaded visa
- User can close it with X button in top-right corner
- Color progression: green → yellow → red as expiry approaches
- **When visa expires during stay**: alert becomes red, non-dismissable, prominent message "Visa expired — contact your host"
- Progress bar only appears after guest has uploaded a visa with an expiry date

### Reminder Notifications

- In-app + push notifications to guest when visa expiry approaches and no renewal uploaded
- Default intervals: **7 days** and **3 days** before expiry (configurable by owner in backoffice)
- Push notifications trigger only if guest hasn't already uploaded a renewed visa
- Owner receives notification in backoffice when a reminder is sent (so they can follow up manually via call/message)
- If owner has a convention with visa extension offices, reminder notification can include a link/info about visa extension services (configurable text field in backoffice)

### Backoffice Owner View

- **Two views**: per-guest (click guest → see their documents) AND per-urgency (dashboard sorted by expiry date, most urgent first)
- Owner notified of new uploads via: badge counter on documents section + push notification
- Download individual document photos (for manual upload to government portals like NA17/TM30)
- Owner can mark each document as **"Registered with authorities"** — trackable status for compliance
- Configurable reminder intervals per property (default 7 and 3 days)
- Configurable visa extension info text (optional, shown in guest reminders)

### Privacy & GDPR Compliance

- **Explicit consent required**: checkbox "I consent to the processing of my passport/visa documents for temporary residence registration with local authorities" — must be checked before upload is enabled
- **Informative disclaimer** displayed alongside checkbox: what data is collected, why (legal obligation for temporary residence registration), who sees it (property owner only), how long it's kept, right to request deletion
- **Legal basis**: dual — "legal obligation" (immigration registration) + "consent" (digital storage in our system)
- **Multi-language**: consent text and disclaimer available in guest's language
- **Retention period**: configurable by owner (default 30 days post-checkout), with minimum 7 days and maximum 90 days — accounts for varying legal requirements across Vietnam (Decree 144), Thailand (PDPA), and other SEA countries
- **Early deletion**: guest can request deletion after checkout via dashboard; during stay, documents are retained (owner needs them for registration). Button appears post-checkout only.
- **Deletion confirmation**: push notification sent to guest when documents are auto-deleted ("Your documents have been deleted from [property name]'s system")
- **Supabase Storage**: private bucket with RLS, signed URLs for owner access (no public URLs)
- **GDPR auto-delete cron**: server-side job deletes documents after retention period expires — no manual intervention

### Claude's Discretion

- OCR library/service choice for photo quality validation
- Exact progress bar visual design and color thresholds
- Consent text wording (following legal research above)
- Upload UI flow (single-step vs multi-step wizard)
- Backoffice urgency dashboard layout details
- Push notification delivery mechanism (existing infrastructure or new)

</decisions>

<specifics>
## Specific Ideas

- "Avevamo una barra in alto progressiva che indicava quanti giorni mancavano alla scadenza del visto" — progress bar al top della dashboard, non sticky
- "Timbri fatti all'ingresso della nazione sono spesso poco chiari" — OCR quality check deve guidare l'utente con messaggi utili, non solo dire "foto non valida"
- "Il proprietario deve comunicare alle autorità che l'ospite alloggia e ha documenti validi" — il sistema facilita questo workflow (upload → download → invio manuale ad autorità)
- Real-world flow researched: Vietnam NA17 form (12-24h deadline), Thailand TM30 (24h deadline, online portal) — owner needs downloadable photos to upload to government portals
- "Se il proprietario ha una convenzione con uffici per estendere il visto, possiamo allegare info nella notifica" — configurable extension info in reminders

## Legal Research Summary

**Vietnam:** Form NA17, registrazione entro 12-24h, portale immigrazione provinciale online. Multa VND 4-12M per mancata registrazione. New PDPL effective Jan 2026.

**Thailand:** TM30 form, registrazione entro 24h, portale tm30.immigration.go.th. Multa THB 800-1,600 per ritardo. PDPA fully effective since June 2022, THB 21.5M in fines issued Aug 2025.

**GDPR (EU tourists):** Hotel in Spagna multato €30,000 per scan passaporto senza consenso. Richiede: consenso esplicito, data minimization, informativa trasparente, diritto alla cancellazione.

**Sources:**

- [Vietnam temporary residence registration](https://www.vietnam-visa.com/temporary-residence-registration-vietnam/)
- [Vietnam NA17 form guide](https://eiv.edu.vn/en/na17-temporary-residence-declaration-form-for-foreigners-in-vietnam-complete-guide-2025/)
- [Thailand TM30 explained](https://perfecthomes.co.th/tm030-registration-thailand/)
- [Thailand PDPA for hospitality](https://formiti.com/thailand-pdpa-compliance-for-hospitality-a-guide-for-hotel-groups/)
- [GDPR hotel passport handling](https://gdprwise.eu/news/hotel-guest-passports-and-id-cards-dos-and-donts/)
- [Spain hotel fined €30K](https://www.lexology.com/library/detail.aspx?g=4037c178-f818-45c9-bee3-6f6a488bc62e)

</specifics>

<deferred>
## Deferred Ideas

- **Visa extension suggestions**: mostrare suggerimenti per estendere il visto in base al paese — potrebbe essere una fase futura o un add-on alla Phase 28 se semplice
- **Tourist/local detection from coffeeshop onboarding**: il pattern di chiedere "sei un locale o un turista?" e la data di partenza per gestire notifiche post-soggiorno — applicabile cross-vertical, fase separata
- **Annual re-engagement**: mandare un messaggio carino al turista l'anno dopo per stimolare il ritorno — CRM/marketing phase separata
- **Automated government portal submission**: integrazione diretta con NA17/TM30 portali per invio automatico — complessità elevata, fase futura
- **OCR data extraction from passport**: estrarre automaticamente nome, numero passaporto, nazionalità dalla foto — miglioramento futuro dell'OCR quality check

</deferred>

---

_Phase: 28-document-upload-visa-tracking_
_Context gathered: 2026-02-01_
