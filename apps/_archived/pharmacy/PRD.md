# GUDBRO Pharmacy - Product Requirements Document

**Product:** GUDBRO Pharmacy PWA
**Version:** 2.0
**Status:** Planning
**Last Updated:** 2026-01-27
**Author:** GUDBRO Team
**Market:** Da Nang, Vietnam (launch market)

---

## 1. Vision & Objective

### Vision

Become the trusted digital bridge between Vietnam's independent pharmacies and the millions of tourists, expats, and locals who need medicine but face language barriers, unfamiliar drug names, and zero price transparency.

### Objective

Launch a PWA for Da Nang that solves the pharmacy access problem for non-Vietnamese speakers by providing:

1. A multilingual product catalog that translates the pharmacy experience into the customer's language (product names, symptoms, dosage instructions)
2. Transparent, multi-currency pricing displayed upfront
3. Symptom-based search so customers find what they need without knowing drug names
4. Clear OTC vs prescription labeling and banned substance warnings for every product
5. Pre-translated messaging to connect customers with pharmacists via WhatsApp/Zalo
6. Integration with the GUDBRO ecosystem so accommodations, tours, and wellness verticals can refer guests to the nearest pharmacy

### Strategic Approach

> **Phase 1 is an INFORMATIONAL CATALOG + TRANSLATION + CONTACT tool, NOT direct pharmaceutical e-commerce.**
>
> This avoids regulatory complexity under the new Pharmacy Law 44/2024/QH15 while providing immediate value. Think of it as "the pharmacy's digital storefront that speaks the tourist's language." The pharmacist remains in the loop for every transaction.

### Value Proposition

| For Tourists & Expats                         | For Pharmacies                              | For GUDBRO Ecosystem                       |
| --------------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| Search by symptom in their language           | Digital catalog without building an app     | New vertical revenue stream                |
| See product names in English + Vietnamese     | Reach tourist customers who can't walk in   | Cross-sell from accommodations             |
| Know prices upfront (VND/USD/EUR)             | Pre-translated customer messages via Zalo   | Partner commission model (85/10/5)         |
| OTC vs prescription clarity                   | Compete digitally with Long Chau/Pharmacity | Data on tourist health spending patterns   |
| Banned substance warnings before buying       | Professional digital presence for free      | Network effect with stays, tours, wellness |
| Contact pharmacy with pre-translated messages | Delivery requests organized digitally       | Pharmacy Law compliance readiness          |
| Generic name lookup (know what you're buying) | Order history for returning customers       | Unique vertical no competitor covers       |

---

## 2. Market Context & Opportunity

### The Problem (Vietnam-Specific)

Healthcare access for tourists and expats in Vietnam suffers from several compounding pain points:

| Problem                               | Impact                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Language barrier**                  | Tourists can't explain symptoms or read Vietnamese drug labels                                      |
| **Different drug names**              | Same molecule has different brand names (e.g., Paracetamol vs Tylenol vs Panadol)                   |
| **No price transparency**             | No visible price list; tourists often pay more without knowing ("tourist tax")                      |
| **OTC vs prescription confusion**     | 86.8% of customers buy antibiotics without prescription in practice                                 |
| **Banned substance risk**             | Tourists unknowingly buy medications controlled in their home country (codeine, diazepam, zolpidem) |
| **No digital presence**               | 85% of pharmacies (small "nha thuoc") have zero online catalog or ordering                          |
| **Opening hours vary**                | No reliable way to check if a pharmacy is open before going                                         |
| **Counterfeit risk**                  | Unverified pharmacies may sell counterfeit or expired products                                      |
| **Dosage instructions in Vietnamese** | Tourists can't read how to take the medicine they just bought                                       |

### Market Numbers

- **~50,000 pharmacies in Vietnam**, 85% are small independent "nha thuoc" with zero digital presence
- **42,500+ independent pharmacies** have NO app, NO website, NO digital catalog
- **Da Nang:** 10.9M visitors in 2024, target 11.9M in 2025 -- every tourist is a potential pharmacy customer
- **Vietnam tourism:** 17.5M+ international visitors (2025), growing 15% YoY
- **Digital nomad population:** 50,000+ in Vietnam, recurring health needs (stomach issues, allergies, sunburn)
- **Expat community:** Growing, values convenience, English-language access, and reliability

### Most Purchased by Tourists

| Category              | Common Products                              | Why Common                                        |
| --------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Pain Relief**       | Paracetamol, Ibuprofen, Panadol              | Universal need                                    |
| **Stomach/Digestive** | Loperamide, ORS, Smecta, Berberin, Antiacids | Traveler's diarrhea very common                   |
| **Allergy**           | Cetirizine, Loratadine, Fexofenadine         | Tropical climate triggers allergies               |
| **Antibiotics**       | Amoxicillin, Azithromycin                    | Sold OTC in practice (86.8% without prescription) |
| **Cold/Cough**        | Decolgen, Tiffy, cough syrup                 | AC + heat cycling                                 |
| **Skincare**          | Sunscreen, aloe vera, insect repellent       | Tropical sun and mosquitoes                       |
| **First Aid**         | Bandages, Betadine, Neosporin                | Beach/adventure injuries                          |
| **Vitamins**          | Vitamin C, multivitamins, electrolytes       | Travel fatigue, prevention                        |

### Regulatory Context: Pharmacy Law 44/2024/QH15

Vietnam's new Pharmacy Law (effective July 1, 2025) introduces major changes. Implementation governed by Decree 163/2025 and Circular 31/2025.

| Regulation Change                       | Impact for GUDBRO                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| **E-prescriptions mandatory**           | Digital infrastructure becomes essential; GUDBRO can help pharmacies adapt          |
| **Pharmaceutical e-commerce legalized** | Opens future path for digital ordering (Phase 3+), but only on registered platforms |
| **GPP standards enforced**              | Quality baseline; GUDBRO partners must be GPP-compliant                             |
| **Stricter controlled substance rules** | Reinforces need for clear OTC/Rx labeling in our catalog                            |
| **Pharmacist presence required**        | Validates our "contact the pharmacy" model over self-service ordering               |

### Competitive Landscape

| Competitor              | Model                          | Weakness                                                    |
| ----------------------- | ------------------------------ | ----------------------------------------------------------- |
| Independent "nha thuoc" | Walk-in, cash, no digital      | No English, no price list, no online presence               |
| FPT Long Chau (1,800+)  | Chain app with AI/telemedicine | Only their own stores; not for independent pharmacies       |
| Pharmacity (1,000+)     | Chain app with ordering        | Only their own stores; limited English support              |
| Grab Health (pilot)     | Delivery platform              | Limited pharmacy catalog, no symptom search, no translation |
| Google Translate        | Manual translation             | Can't search by symptom, no pricing, no pharmacy-specific   |
| Hotel concierge         | Manual recommendation          | Slow, limited knowledge, expensive options only             |
| **GUDBRO Pharmacy**     | Multilingual catalog + contact | **Fills the gap for 42,500+ independent pharmacies**        |

---

## 3. User Personas

### Persona 1: Tourist with a Health Need - "Marco"

- **Demographics:** 30-55, international tourist visiting Da Nang/Hoi An
- **Context:** Woke up with stomach problems, sunburn, or headache during vacation; needs medicine NOW
- **Pain Points:**
  - Doesn't know Vietnamese drug names, can't read labels
  - Doesn't know what's OTC vs prescription in Vietnam
  - Worried about buying something banned in their home country
  - Afraid of being overcharged ("tourist tax")
  - Can't communicate symptoms to the pharmacist
- **Behavior:** Scans QR code at pharmacy door or taps "Pharmacy" in accommodation dashboard, searches "stomach ache", sees recommended products with English names, generic names, prices, and OTC status
- **Goal:** Find the right medicine quickly, know it's safe to buy, understand the price, and communicate needs to the pharmacist
- **Success Metric:** Time from symptom search to pharmacy contact < 3 minutes

### Persona 2: Long-term Expat - "Jessica"

- **Demographics:** 25-45, digital nomad or long-term expat in Da Nang
- **Context:** Lives in Vietnam 3-12 months, has recurring needs (allergy meds, vitamins, skincare) and prefers a trusted pharmacy
- **Pain Points:**
  - Knows what molecule she needs (e.g., cetirizine) but can't find it by Vietnamese brand name
  - Wants to reorder the same products without repeating the whole search
  - Prefers delivery to her apartment
  - Wants to compare brand vs generic prices
- **Behavior:** Opens bookmarked PWA, searches by generic name or browses category, contacts pharmacy via Zalo to confirm stock, requests delivery
- **Goal:** Reliable access to her regular medications with minimal language friction, delivery to her apartment
- **Success Metric:** Repeat purchase rate > 40%

### Persona 3: Independent Pharmacy Owner - "Anh"

- **Demographics:** 35-55, Vietnamese pharmacist/owner of a small "nha thuoc" in Da Nang
- **Context:** Runs a 1-2 person pharmacy near tourist areas. Sees foreign customers daily but can't communicate. Loses business to Long Chau/Pharmacity chains that have apps and AI.
- **Pain Points:**
  - Can't speak English/Korean/Chinese to serve tourists
  - Has no website, no app, no digital presence
  - Can't afford to build technology
  - Worries about compliance with new Pharmacy Law requirements
  - Sees tourist customers walk away because of communication barrier
- **Behavior:** Receives GUDBRO QR code to display in shop window. Tourists scan it and browse the catalog in their language. Receives pre-translated messages via Zalo when customers want to buy. Delivers to nearby hotels when requested.
- **Goal:** Serve more foreign customers without learning English, get a digital presence for free, stay competitive with chains
- **Success Metric:** +30% foreign customer transactions within 3 months of onboarding

### Persona 4: Hotel/Accommodation Partner - "Binh"

- **Demographics:** 30-50, manager of a GUDBRO-partnered hotel, apartment, or homestay in Da Nang
- **Context:** Guests regularly ask for pharmacy recommendations, especially when feeling unwell. Currently, staff gives verbal directions or offers to buy medicine (liability risk). No pharmacy on-site.
- **Pain Points:**
  - Guests ask for medicine recommendations -- staff is not qualified to advise
  - Sending guests out to find a pharmacy creates a bad experience
  - No reliable partner pharmacy to refer guests to
  - Wants to earn from referrals but has no tracking system
- **Behavior:** Adds "Pharmacy" link to in-stay digital dashboard. When a guest taps it, they are deep-linked to the nearest GUDBRO partner pharmacy with language, currency, and delivery address pre-filled. Earns 10% commission on referred purchases.
- **Goal:** Provide guests with a safe, easy pharmacy option; earn passive commission income; reduce liability from informal medicine advice
- **Success Metric:** 15% of guests use the pharmacy referral link during their stay

---

## 4. User Journeys

### Journey A: Tourist at Pharmacy -- QR Scan -- Symptom Search -- Contact -- Purchase

```
+-------------------------------------------------------------------+
|  TOURIST WALK-IN JOURNEY                                          |
+-------------------------------------------------------------------+
|                                                                   |
|  1. DISCOVER                                                      |
|     +-- Tourist enters pharmacy or sees QR code on door/counter   |
|     +-- Scans QR -> pharmacy.gudbro.com/{pharmacy-slug}           |
|     +-- PWA loads in detected language (EN/KO/ZH/JA)              |
|                                                                   |
|  2. SEARCH BY SYMPTOM                                             |
|     +-- Types "stomach ache" or taps symptom icon                 |
|     +-- Sees recommended products:                                |
|         - Smecta (Diosmectite) - Stomach coating                  |
|           OTC | 35.000d (~$1.40) | Vietnamese: Thuoc da day        |
|         - Oresol (ORS Sachets) - Rehydration                      |
|           OTC | 5.000d (~$0.20) | Vietnamese: Oresol               |
|         - Berberin - Intestinal antiseptic                        |
|           OTC | 15.000d (~$0.60) | Vietnamese: Berberin             |
|     +-- Each product shows: generic name, OTC/Rx badge,           |
|         price in VND + tourist currency, Vietnamese name           |
|                                                                   |
|  3. CHECK SAFETY                                                  |
|     +-- Sees green "OTC" badge = safe to buy without prescription |
|     +-- Sees yellow "Rx" badge = needs prescription               |
|     +-- Sees red warning for controlled/banned substances         |
|     +-- Country-specific warnings (e.g., codeine banned in Japan) |
|                                                                   |
|  4. CONTACT PHARMACY                                              |
|     +-- Taps "Ask Pharmacist" button                              |
|     +-- Pre-translated message generated:                         |
|         EN: "I would like to buy Smecta for stomach pain"         |
|         VI: "Toi muon mua Smecta cho dau bung"                    |
|     +-- Sends via WhatsApp or Zalo                                |
|     +-- Or shows message on screen to pharmacist at counter       |
|                                                                   |
|  5. PURCHASE                                                      |
|     +-- Pharmacist prepares the product                           |
|     +-- Customer pays at counter (cash or card)                   |
|     +-- Gets dosage instructions in their language (from PWA)     |
|                                                                   |
+-------------------------------------------------------------------+
```

### Journey B: Expat -- PWA -- Delivery Order Flow

```
+-------------------------------------------------------------------+
|  EXPAT DELIVERY ORDER JOURNEY                                     |
+-------------------------------------------------------------------+
|                                                                   |
|  1. OPEN PWA                                                      |
|     +-- Customer opens bookmarked PWA                             |
|     +-- Sees browsing history and "Recently Viewed" products      |
|                                                                   |
|  2. SEARCH BY GENERIC NAME                                        |
|     +-- Types "cetirizine" (generic name for allergy med)         |
|     +-- Sees available products:                                  |
|         - Zyrtec (Cetirizine 10mg) - Brand                        |
|           OTC | 85.000d (~$3.40) | 10 tablets                     |
|         - Cetirizin Stada (Cetirizine 10mg) - Generic             |
|           OTC | 25.000d (~$1.00) | 10 tablets                     |
|     +-- Can compare brand vs generic with same molecule           |
|                                                                   |
|  3. CONFIRM STOCK                                                 |
|     +-- Taps "Check Availability" on preferred product            |
|     +-- Pre-translated Zalo message sent to pharmacy:             |
|         "Do you have Cetirizin Stada 10mg in stock?"              |
|         "Ban co Cetirizin Stada 10mg khong?"                      |
|     +-- Pharmacy replies via Zalo                                 |
|                                                                   |
|  4. REQUEST DELIVERY                                              |
|     +-- Taps "Request Delivery" button                            |
|     +-- Fills delivery form:                                      |
|         - Address (saved from last time)                          |
|         - Preferred time slot                                     |
|         - Notes ("leave at reception")                            |
|     +-- Delivery request sent via Zalo/WhatsApp                   |
|                                                                   |
|  5. RECEIVE                                                       |
|     +-- Pharmacy delivers via staff or Grab                       |
|     +-- Customer pays on delivery (cash/card)                     |
|     +-- Product saved to "My Products" for easy reorder           |
|                                                                   |
+-------------------------------------------------------------------+
```

### Journey C: Pharmacy Onboarding -- Zero to Digital in 1 Day

```
+-------------------------------------------------------------------+
|  PHARMACY ONBOARDING JOURNEY                                      |
+-------------------------------------------------------------------+
|                                                                   |
|  1. OUTREACH                                                      |
|     +-- GUDBRO team visits pharmacy near tourist areas            |
|     +-- Explains value: "Get foreign customers with zero cost"    |
|     +-- Shows demo of how tourists will see their pharmacy        |
|                                                                   |
|  2. DATA COLLECTION (30 min)                                      |
|     +-- GUDBRO team photographs the pharmacy                     |
|     +-- Records operating hours, phone, Zalo                     |
|     +-- Photographs top 50-100 products with prices              |
|     +-- Notes delivery availability and radius                   |
|     +-- Collects GPP certificate number                          |
|                                                                   |
|  3. CATALOG CREATION (GUDBRO team, 2-4 hours)                    |
|     +-- Products entered into catalog with:                      |
|         - Vietnamese name (as on label)                           |
|         - English name + generic/molecule name                    |
|         - Category and symptom tags                               |
|         - OTC/Rx/Controlled classification                       |
|         - Price in VND                                            |
|         - Dosage instructions (top 50 products)                  |
|     +-- Pharmacy page created: pharmacy.gudbro.com/{slug}        |
|                                                                   |
|  4. ACTIVATION                                                    |
|     +-- QR code printed and displayed at pharmacy entrance       |
|     +-- Pharmacy staff shown how to receive Zalo messages        |
|     +-- Test message sent to confirm workflow                    |
|     +-- Pharmacy goes live on GUDBRO locator map                 |
|                                                                   |
|  5. ONGOING                                                       |
|     +-- GUDBRO team updates catalog quarterly                    |
|     +-- Pharmacy notifies GUDBRO of price changes via Zalo       |
|     +-- Monthly report: messages received, products viewed        |
|     +-- Phase 2: Pharmacy self-service dashboard                 |
|                                                                   |
+-------------------------------------------------------------------+
```

---

## 5. Core Features (Phase 1 MVP)

### 5.1 Product Catalog with Multilingual Names

Public-facing catalog of pharmacy products with full translation support.

- Product name in Vietnamese (as sold in pharmacy)
- Product name in English, Korean, Chinese, Japanese
- **Generic/molecule name** prominently displayed (e.g., "Paracetamol 500mg")
- Brand name mapping (Tylenol = Panadol = Efferalgan = Paracetamol)
- Product photo
- Dosage form (tablet, capsule, syrup, cream, sachet)
- Pack size and unit count
- Brief description and common use case

**Sample Product Card:**

| Field        | Example                                           |
| ------------ | ------------------------------------------------- |
| Vietnamese   | Panadol Extra                                     |
| English      | Panadol Extra (Paracetamol 500mg + Caffeine 65mg) |
| Korean       | 파나돌 엑스트라                                   |
| Chinese      | 必理痛特强                                        |
| Generic Name | Paracetamol 500mg + Caffeine 65mg                 |
| Category     | Pain Relief                                       |
| OTC Status   | OTC (green badge)                                 |
| Price        | 45.000d / $1.80 / EUR1.70                         |
| Form         | Tablet (10 per blister)                           |
| Common Use   | Headache, fever, body pain                        |

### 5.2 Symptom-Based Search

The killer feature: search by what you feel, not what you need to buy.

**Symptom Categories:**

| Symptom (EN)    | VI            | KO       | ZH       | Common Products                         |
| --------------- | ------------- | -------- | -------- | --------------------------------------- |
| Headache        | Dau dau       | 두통     | 头痛     | Paracetamol, Ibuprofen, Panadol         |
| Stomach ache    | Dau bung      | 복통     | 胃痛     | Smecta, Oresol, Berberin, Phosphalugel  |
| Diarrhea        | Tieu chay     | 설사     | 腹泻     | Smecta, Oresol, Loperamide, Berberin    |
| Allergy         | Di ung        | 알레르기 | 过敏     | Cetirizine, Loratadine, Fexofenadine    |
| Sunburn         | Chay nang     | 일광화상 | 晒伤     | Aloe Vera Gel, Bepanthen, Silvadene     |
| Insect bite     | Con trung can | 벌레물림 | 虫咬     | Hydrocortisone cream, Calamine lotion   |
| Cold / Flu      | Cam cum       | 감기     | 感冒     | Decolgen, Tiffy, Paracetamol, Vitamin C |
| Sore throat     | Dau hong      | 인후통   | 喉咙痛   | Strepsils, Dorithricin, Betadine gargle |
| Motion sickness | Say xe        | 멀미     | 晕车     | Dimenhydrinate, Nautamine               |
| Skin rash       | Phat ban      | 피부발진 | 皮疹     | Hydrocortisone, Calamine, Phenergan     |
| Eye irritation  | Kho mat       | 눈 자극  | 眼睛不适 | Rohto, Refresh Tears, Systane           |
| Muscle pain     | Dau co        | 근육통   | 肌肉酸痛 | Salonpas, Voltaren, Tiger Balm          |
| Fever           | Sot           | 발열     | 发烧     | Paracetamol, Ibuprofen, Efferalgan      |
| Constipation    | Tao bon       | 변비     | 便秘     | Duphalac, Forlax, Bisacodyl             |
| First aid       | So cuu        | 응급처치 | 急救     | Betadine, Bandages, Gauze, Neosporin    |

### 5.3 OTC vs Prescription Indicator

Clear visual system to prevent confusion and legal issues.

```
Product Status Badges:
----------------------------------------------

  [  OTC  ]     Green badge - Available without prescription
                "You can buy this over the counter"

  [  Rx   ]     Yellow badge - Requires prescription
                "You need a doctor's prescription for this"

  [CONTROLLED]  Red badge - Controlled substance
                "This medication is controlled in Vietnam"

  [! WARNING]   Orange badge - Banned in some countries
                "This may be prohibited in your home country.
                 Check before purchasing."
```

**Country-Specific Warnings (Phase 1 - Static Data):**

| Substance         | Banned/Restricted In             | Warning Text                                                |
| ----------------- | -------------------------------- | ----------------------------------------------------------- |
| Codeine           | Japan, UAE, Greece               | "Codeine is banned in Japan, UAE, and several countries"    |
| Pseudoephedrine   | Japan (>certain qty), Mexico     | "Quantity limits may apply in your country"                 |
| Tramadol          | UAE, Egypt, Indonesia            | "Tramadol is banned in several countries"                   |
| Diazepam (Valium) | UAE, Japan (without certificate) | "Requires import certificate in many countries"             |
| Zolpidem          | UAE, Japan, Singapore            | "Controlled sleep medication, restricted in many countries" |
| Metformin         | Generally allowed                | No warning needed                                           |

### 5.4 Multi-Currency Price Display

Transparent pricing to eliminate the "tourist tax" problem.

- **Primary display:** Vietnamese Dong (VND) -- the actual price paid
- **Secondary display:** Converted price in USD, EUR, KRW, JPY, CNY, GBP
- **Currency selector:** Toggle preferred display currency
- **Static rates (Phase 1):** Updated monthly; live API in Phase 2
- **Price range indicator:** Shows if price is typical, above, or below average for this product

| Currency      | Code | Symbol | Rate vs VND (approx.) |
| ------------- | ---- | ------ | --------------------- |
| US Dollar     | USD  | $      | 25,000                |
| Euro          | EUR  | EUR    | 27,000                |
| Korean Won    | KRW  | W      | 18                    |
| Japanese Yen  | JPY  | JPY    | 165                   |
| Chinese Yuan  | CNY  | CNY    | 3,500                 |
| British Pound | GBP  | GBP    | 32,000                |

### 5.5 Pre-Translated Contact Messages

Bridge the communication gap between customer and pharmacist.

**How it works:**

1. Customer browses products and selects what they need
2. Taps "Contact Pharmacy" button
3. PWA generates a bilingual message:

```
----------------------------------------------
PRE-TRANSLATED MESSAGE EXAMPLE
----------------------------------------------

[English - for customer reference]
Hello, I would like to buy:
- Smecta (diosmectite) x 2 boxes - for stomach pain
- Oresol sachets x 5 - for rehydration
Can you prepare these? I will come to the shop.
Thank you.

[Vietnamese - sent to pharmacy]
Xin chao, toi muon mua:
- Smecta (diosmectite) x 2 hop - cho dau bung
- Oresol x 5 goi - cho bu nuoc
Ban co the chuan bi giup toi khong? Toi se den cua hang.
Cam on.

----------------------------------------------
[Send via WhatsApp]  [Send via Zalo]  [Copy Text]
----------------------------------------------
```

**Message Templates:**

| Scenario            | Template                                       |
| ------------------- | ---------------------------------------------- |
| Product inquiry     | "Do you have [product] in stock?"              |
| Purchase request    | "I would like to buy [product list]"           |
| Delivery request    | "Can you deliver to [address]? [product list]" |
| Symptom description | "I have [symptom]. What do you recommend?"     |
| Price confirmation  | "How much does [product] cost?"                |
| Stock check         | "Is [product] available right now?"            |

### 5.6 Pharmacy Locator

Help customers find the nearest open pharmacy.

- **Map view** with pharmacy pins (Google Maps integration)
- **List view** sorted by distance from user
- **Filters:** Open now, delivery available, GUDBRO partner
- **Each pharmacy shows:**
  - Name, address, phone number
  - Distance from user (GPS)
  - Operating hours with "Open Now" / "Closes in 2h" status
  - Services: delivery available, WhatsApp/Zalo contact
  - GUDBRO partner badge (if applicable)
  - GPP certification badge
  - Rating (Phase 2)

### 5.7 Delivery Request Form

Not an ordering system -- a structured request sent to the pharmacy via messaging.

- Product list (from browsing/selection)
- Delivery address (manual or auto-filled from accommodation)
- Preferred time window
- Contact phone number
- Special notes
- **Delivery method:** Pharmacy staff or Grab
- **Sent via:** WhatsApp or Zalo as a formatted message
- **Payment:** On delivery (cash or card, handled by pharmacy)

### 5.8 Dosage & Usage Instructions

Multilingual dosage information for common OTC products.

- Standard dosage (adults/children)
- Frequency (e.g., "2 tablets every 6 hours")
- Warnings (e.g., "Do not take with alcohol")
- Storage instructions
- Displayed in customer's language after "purchase" or "save"

> **Disclaimer:** "This information is for reference only. Always consult a licensed pharmacist for dosage guidance."

---

## 6. Technical Architecture

### Tech Stack

| Layer          | Technology                                                              |
| -------------- | ----------------------------------------------------------------------- |
| Framework      | Next.js 14 (App Router)                                                 |
| Styling        | Tailwind CSS                                                            |
| Icons          | Phosphor Icons (duotone weight)                                         |
| Database       | Supabase (PostgreSQL) - Phase 2                                         |
| PWA            | next-pwa / service worker                                               |
| Messaging      | WhatsApp Business API, Zalo OA                                          |
| Multi-language | next-intl or custom i18n                                                |
| Multi-currency | Static rates (Phase 1), live API (Phase 2)                              |
| Maps           | Google Maps JavaScript API                                              |
| Search         | Client-side fuzzy search (Phase 1), Supabase Full-Text Search (Phase 2) |

### Project Structure

```
apps/pharmacy/
+-- frontend/
|   +-- app/
|   |   +-- page.tsx                    # Landing / Pharmacy directory
|   |   +-- [slug]/
|   |   |   +-- page.tsx                # Pharmacy page (catalog + info)
|   |   +-- services/
|   |   |   +-- [slug]/
|   |   |       +-- page.tsx            # Product detail page
|   |   +-- search/
|   |   |   +-- page.tsx                # Symptom & product search
|   |   +-- promotions/
|   |   |   +-- page.tsx                # Active promotions / seasonal
|   |   +-- robots.txt/
|   |   |   +-- route.ts                # SEO robots
|   |   +-- sitemap.xml/
|   |       +-- route.ts                # SEO sitemap
|   +-- components/
|   |   +-- catalog/
|   |   |   +-- ProductCard.tsx         # Product display with translations
|   |   |   +-- ProductGrid.tsx         # Grid layout for products
|   |   |   +-- CategoryNav.tsx         # Category navigation
|   |   |   +-- SymptomSearch.tsx       # Search by symptom interface
|   |   |   +-- GenericNameBadge.tsx    # Shows generic/molecule name
|   |   |   +-- OtcRxBadge.tsx          # OTC/Prescription/Controlled badge
|   |   |   +-- BannedWarning.tsx       # Country-specific ban warnings
|   |   |   +-- PriceDisplay.tsx        # Multi-currency price display
|   |   +-- pharmacy/
|   |   |   +-- PharmacyCard.tsx        # Pharmacy info card
|   |   |   +-- PharmacyLocator.tsx     # Map + list of pharmacies
|   |   |   +-- HoursDisplay.tsx        # Operating hours with status
|   |   |   +-- ContactButton.tsx       # WhatsApp/Zalo contact
|   |   +-- contact/
|   |   |   +-- TranslatedMessage.tsx   # Pre-translated message builder
|   |   |   +-- DeliveryForm.tsx        # Delivery request form
|   |   |   +-- MessagePreview.tsx      # Bilingual message preview
|   |   +-- shared/
|   |       +-- Header.tsx
|   |       +-- BottomNav.tsx
|   |       +-- CurrencyToggle.tsx
|   |       +-- LanguageSelector.tsx
|   |       +-- WhatsAppButton.tsx
|   |       +-- ZaloButton.tsx
|   +-- config/
|   |   +-- products.ts                 # Product catalog data
|   |   +-- symptoms.ts                 # Symptom-to-product mapping
|   |   +-- pharmacies.ts              # Pharmacy directory data
|   |   +-- translations.ts            # UI string translations
|   |   +-- currencies.ts              # Exchange rates (static)
|   |   +-- warnings.ts                # Banned substance data
|   +-- lib/
|   |   +-- types.ts                    # TypeScript interfaces
|   |   +-- utils.ts                    # Utility functions
|   |   +-- search.ts                   # Search/filter logic
|   |   +-- message-builder.ts          # Pre-translated message generator
|   |   +-- currency.ts                 # Currency conversion logic
|   +-- public/
|       +-- icons/                      # Category and symptom icons
|       +-- images/                     # Product and pharmacy photos
+-- PRD.md                              # This document
```

### Data Model

```typescript
interface Pharmacy {
  id: string;
  slug: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  address: string;
  addressVi: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  whatsapp?: string;
  zalo?: string;

  // Operating
  operatingHours: OperatingHours[];
  isOpen24h: boolean;
  deliveryAvailable: boolean;
  deliveryRadius: number; // meters

  // Credentials
  gppCertified: boolean;
  pharmacistOnDuty: boolean;
  licenseNumber?: string;

  // Display
  photos: string[];
  rating: number;
  reviewCount: number;
  isGudbroPartner: boolean;

  // Status
  isActive: boolean;
  createdAt: Date;
}

interface PharmacyProduct {
  id: string;
  pharmacyId: string;

  // Names
  nameVi: string; // Vietnamese name (primary)
  nameEn: string; // English name
  nameKo?: string; // Korean name
  nameZh?: string; // Chinese name
  nameJa?: string; // Japanese name
  genericName: string; // International Non-proprietary Name (INN)
  brandName?: string; // Brand name if applicable
  activeIngredient: string; // e.g., "Paracetamol 500mg"

  // Classification
  category: ProductCategory;
  subcategory?: string;
  dosageForm: DosageForm;
  packSize: string; // e.g., "10 tablets", "100ml", "1 tube 30g"

  // Regulatory
  otcStatus: 'otc' | 'prescription' | 'controlled';
  bannedInCountries?: BannedSubstanceWarning[];
  requiresPharmacist: boolean;

  // Pricing
  priceVnd: number;
  currency: 'VND';

  // Content
  description: string;
  descriptionVi: string;
  commonUse: string[]; // e.g., ["headache", "fever", "body pain"]
  symptoms: string[]; // Symptom tags for search
  dosageInstructions?: DosageInstruction;

  // Display
  photo?: string;
  isPopular: boolean;
  sortOrder: number;

  // Status
  inStock: boolean;
  isActive: boolean;
}

interface BannedSubstanceWarning {
  countries: string[]; // ISO country codes
  severity: 'banned' | 'restricted' | 'requires_certificate';
  warningTextEn: string;
  warningTextVi: string;
}

interface DosageInstruction {
  adultDose: string; // e.g., "1-2 tablets every 4-6 hours"
  childDose?: string; // e.g., "Not recommended under 12"
  maxDaily: string; // e.g., "Max 8 tablets per day"
  frequency: string; // e.g., "Every 4-6 hours"
  withFood: boolean;
  warnings: string[]; // e.g., ["Do not take with alcohol"]
  storageTemp?: string; // e.g., "Below 30C"
}

interface DeliveryRequest {
  id: string;
  pharmacyId: string;

  // Customer
  customerName: string;
  customerPhone: string;
  customerWhatsApp?: string;
  customerLanguage: string;

  // Accommodation link (if from GUDBRO Stays)
  accommodationSlug?: string;
  roomNumber?: string;
  bookingId?: string;

  // Products requested
  items: RequestItem[];

  // Delivery
  deliveryAddress: string;
  deliveryMethod: 'pharmacy_staff' | 'grab';
  preferredTimeSlot?: string;
  specialNotes?: string;

  // Pricing (estimated from catalog)
  estimatedTotal: number;
  deliveryFee: number;
  currency: 'VND';

  // Status
  status: 'sent' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  sentAt: Date;
  sentVia: 'whatsapp' | 'zalo';

  // Commission (for partner orders)
  commission?: {
    pharmacyAmount: number; // 85%
    partnerAmount: number; // 10% (accommodation)
    gudbroAmount: number; // 5%
  };
}

interface RequestItem {
  productId: string;
  productNameVi: string;
  productNameEn: string;
  genericName: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

type ProductCategory =
  | 'pain_relief'
  | 'stomach_digestive'
  | 'allergy'
  | 'cold_flu'
  | 'skin_care'
  | 'sun_protection'
  | 'first_aid'
  | 'eye_care'
  | 'vitamins_supplements'
  | 'antibiotics'
  | 'antifungal'
  | 'muscle_joint'
  | 'motion_sickness'
  | 'oral_care'
  | 'feminine_care'
  | 'baby_child'
  | 'insect_repellent'
  | 'other';

type DosageForm =
  | 'tablet'
  | 'capsule'
  | 'syrup'
  | 'cream'
  | 'gel'
  | 'ointment'
  | 'drops'
  | 'sachet'
  | 'spray'
  | 'patch'
  | 'suppository'
  | 'injection'
  | 'powder'
  | 'lozenge'
  | 'other';

interface OperatingHours {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  openTime: string; // "07:00"
  closeTime: string; // "22:00"
  isClosed: boolean;
}

interface SymptomMapping {
  symptomKey: string; // e.g., "headache"
  nameEn: string;
  nameVi: string;
  nameKo: string;
  nameZh: string;
  nameJa: string;
  icon: string; // Phosphor icon name
  relatedProductIds: string[];
  severity: 'mild' | 'moderate' | 'severe';
  seeDoctor: boolean; // If true, show "Consider seeing a doctor"
}
```

---

## 7. Design System

### Design Principles

- **Mobile-first:** 95%+ users will access via phone (tourists on the go)
- **Trust-first:** Clean, medical-grade UI that feels safe and professional (not flashy)
- **Icon-driven:** Symptom icons and visual categories reduce text dependency
- **Clarity over density:** One product per card, large readable text, high-contrast badges
- **Safety-conscious:** OTC/Rx badges and warnings must be impossible to miss
- **Offline-capable:** PWA with service worker for basic catalog browsing (critical for tourists with poor connectivity)
- **Fast:** Target < 2s first contentful paint

### Color System

| Element            | Color   | Tailwind   | Usage                            |
| ------------------ | ------- | ---------- | -------------------------------- |
| Primary            | #0D9488 | teal-600   | Medical trust, GUDBRO brand      |
| Primary Light      | #CCFBF1 | teal-100   | Backgrounds, highlights          |
| OTC Badge          | #16A34A | green-600  | Safe to buy without prescription |
| Prescription Badge | #EAB308 | yellow-500 | Caution, needs prescription      |
| Controlled Badge   | #DC2626 | red-600    | Controlled substance             |
| Warning Badge      | #F97316 | orange-500 | Country-specific ban warning     |
| Background         | #F8FAFC | slate-50   | Light, clean, medical-grade      |
| Surface            | #FFFFFF | white      | Cards, panels                    |
| Text Primary       | #1E293B | slate-800  | High contrast, readable          |
| Text Secondary     | #64748B | slate-500  | Supporting information           |
| Border             | #E2E8F0 | slate-200  | Card borders, dividers           |

### Typography

| Element         | Size    | Weight    | Notes                               |
| --------------- | ------- | --------- | ----------------------------------- |
| Product names   | 16-18px | Semi-bold | High contrast                       |
| Generic names   | 14px    | Regular   | Teal color (medical emphasis)       |
| Prices          | 18-20px | Bold      | Dark, prominent                     |
| Badges          | 12px    | Semi-bold | Uppercase, white text on colored bg |
| Dosage info     | 14px    | Regular   | Clear spacing                       |
| Section headers | 20-24px | Bold      | Slate-800                           |
| Body text       | 14-16px | Regular   | Slate-600                           |

### Key UI Patterns

- **Symptom grid:** 3x5 icon grid on landing page for quick symptom selection
- **Product card:** Photo left, info right (or stacked on mobile), with OTC badge prominent
- **Search bar:** Persistent at top, placeholder cycles through example symptoms ("headache", "stomach ache", "allergy")
- **Contact button:** Sticky bottom bar with WhatsApp/Zalo buttons (always visible)
- **Language/Currency selectors:** Top-right header, flag icons for quick recognition
- **Safety badges:** Always visible on product card, never hidden behind a tap
- **Disclaimer banner:** Fixed subtle banner at bottom reminding this is informational only

---

## 8. Information Architecture

### Pages & Routes

```
pharmacy.gudbro.com/
|
+-- /                              # Homepage: Pharmacy directory + symptom grid
|   +-- Hero: "Find Medicine in Your Language"
|   +-- Symptom grid (15 icons)
|   +-- Search bar (symptom + product + generic name)
|   +-- Nearby pharmacies list
|   +-- Popular products carousel
|   +-- Legal disclaimer
|
+-- /search                        # Search results page
|   +-- Query parameter: ?q=headache or ?symptom=stomach_ache
|   +-- Product results with pharmacy availability
|   +-- Filter: category, OTC only, price range
|   +-- Sort: relevance, price low-high, popularity
|
+-- /[pharmacy-slug]               # Individual pharmacy page
|   +-- Pharmacy info (name, address, hours, GPP badge)
|   +-- Map with pin
|   +-- Product catalog (filterable by category)
|   +-- Contact buttons (WhatsApp/Zalo)
|   +-- Delivery info (availability, radius)
|   +-- QR code for sharing
|
+-- /services/[product-slug]       # Product detail page
|   +-- Full product info (all languages)
|   +-- Generic name + brand mapping
|   +-- OTC/Rx/Controlled badge
|   +-- Banned substance warnings (if applicable)
|   +-- Price in VND + selected currency
|   +-- Dosage instructions (multilingual)
|   +-- "Contact Pharmacy" CTA
|   +-- Related products (same symptom)
|
+-- /promotions                    # Seasonal health tips + popular products
|   +-- Rainy season essentials
|   +-- Tourist health kit
|   +-- Sunburn/beach safety products
|   +-- Featured pharmacy spotlights
|
+-- /browse                        # Deep-link entry from accommodations
|   +-- Query params: ?guest=...&room=...&hotel=...&lang=...&currency=...
|   +-- Pre-filled language, currency, delivery address
|   +-- Nearest partner pharmacy auto-selected
|   +-- Same browse experience, pre-configured
|
+-- /robots.txt                    # SEO robots
+-- /sitemap.xml                   # SEO sitemap
```

### Navigation Structure

```
+--------------------------------------------------+
|  HEADER                                          |
|  [Logo]  [Search]  [Lang: EN]  [Currency: USD]  |
+--------------------------------------------------+
|                                                  |
|  PAGE CONTENT                                    |
|                                                  |
+--------------------------------------------------+
|  BOTTOM NAV (sticky)                             |
|  [Home]  [Search]  [Map]  [Contact]              |
+--------------------------------------------------+
```

### Deep Link Parameters (from Accommodations)

| Parameter | Example        | Purpose                       |
| --------- | -------------- | ----------------------------- |
| guest     | Yuki+Tanaka    | Pre-fill customer name        |
| room      | 305            | Pre-fill room for delivery    |
| hotel     | ocean-view-apt | Identify referral source      |
| checkin   | 2026-02-10     | Context for stay duration     |
| checkout  | 2026-02-14     | Context for stay duration     |
| lang      | ja             | Set interface language        |
| currency  | JPY            | Set display currency          |
| source    | accommodation  | Track referral for commission |

---

## 9. Success Metrics (KPIs)

### Phase 1 Metrics (Month 1-3)

| Metric                       | Target            | How Measured          |
| ---------------------------- | ----------------- | --------------------- |
| Pharmacies onboarded         | 5-10              | Partner count         |
| Products cataloged           | 200+ per pharmacy | Catalog entries       |
| PWA page views               | 1,000/month       | Analytics             |
| QR scans (pharmacy window)   | 300/month         | UTM tracking          |
| Symptom searches performed   | 500/month         | Search analytics      |
| WhatsApp/Zalo messages sent  | 100/month         | Message button clicks |
| Average session duration     | > 120 seconds     | Analytics             |
| Unique visitors              | 800/month         | Analytics             |
| Search-to-contact conversion | > 10%             | Funnel tracking       |

### Phase 2 Metrics (Month 4-8)

| Metric                       | Target    |
| ---------------------------- | --------- |
| Delivery requests submitted  | 150/month |
| Delivery completion rate     | > 85%     |
| Repeat customer rate         | > 25%     |
| Average order value          | 150.000d  |
| Customer satisfaction        | > 4.2/5   |
| Products in catalog (total)  | 2,000+    |
| Search-to-contact conversion | > 15%     |

### Phase 3 Metrics (Month 9-14)

| Metric                     | Target       |
| -------------------------- | ------------ |
| Orders from accommodations | 35% of total |
| Monthly GMV                | 80Md         |
| Partner commission revenue | 8Md/month    |
| GUDBRO fee revenue         | 4Md/month    |
| Pharmacies onboarded       | 30+          |
| Tourist NPS                | > 50         |

### North Star Metrics

1. **Monthly Contact Volume** -- Messages sent to pharmacies via PWA (Phase 1 primary metric)
2. **Accommodation Referral %** -- Contacts originating from GUDBRO Stays
3. **Symptom Search Success Rate** -- Searches that lead to a contact/purchase action
4. **Pharmacy Satisfaction** -- Partner pharmacy NPS score

---

## 10. Roadmap

### Phase 1: Informational Catalog PWA (Month 1-3)

**Goal:** Public-facing PWA with product catalog, symptom search, multilingual display, and pharmacy contact. No backend, static data only.

**Features:**

- [ ] Pharmacy landing page with info, photos, operating hours, map
- [ ] Product catalog with multilingual names (EN/VI/KO/ZH/JA)
- [ ] Generic name display for every product
- [ ] Symptom-based search (15+ symptom categories)
- [ ] OTC / Prescription / Controlled badges on every product
- [ ] Banned substance warnings (country-specific, static data)
- [ ] Multi-currency price display (VND/USD/EUR/KRW/JPY)
- [ ] Pre-translated message builder (WhatsApp/Zalo)
- [ ] Delivery request form (sends via messaging)
- [ ] Pharmacy locator with map and distance
- [ ] Operating hours with "Open Now" status
- [ ] Dosage instructions in customer's language (top 50 OTC products)
- [ ] PWA installable (service worker, manifest)
- [ ] QR code for pharmacy window display
- [ ] Mobile-first responsive design
- [ ] Promotions page (seasonal health tips, popular products)
- [ ] SEO optimization (robots.txt, sitemap.xml)
- [ ] Legal disclaimers on every page

**Not included:** Direct ordering, payment processing, real-time stock, accounts, e-prescriptions.

### Phase 2: Digital Ordering + Stock Integration (Month 4-8)

**Goal:** Backend integration with real stock data, delivery tracking, and customer accounts.

**Features:**

- [ ] Supabase backend integration
- [ ] Real-time stock availability (pharmacy updates stock)
- [ ] Customer accounts with order/request history
- [ ] "My Products" saved list for repeat purchases
- [ ] Delivery tracking (basic status updates)
- [ ] Pharmacy dashboard (manage catalog, update stock, view requests)
- [ ] Push notifications (order confirmed, out for delivery)
- [ ] Product reviews and ratings
- [ ] Live currency exchange rates
- [ ] Search analytics (popular symptoms, trending products)
- [ ] Expanded product catalog (2,000+ products)
- [ ] Price comparison across pharmacies
- [ ] Brand vs generic price comparison

### Phase 3: E-Commerce + Accommodation Integration (Month 9-14)

**Goal:** Full digital ordering (aligned with Pharmacy Law), accommodation deep-link integration, and commission model.

**Features:**

- [ ] Digital order submission (compliant with Pharmacy Law 44/2024/QH15)
- [ ] E-prescription upload/verification (pharmacy validates)
- [ ] Deep link from accommodation in-stay dashboard
- [ ] Guest data pre-fill from booking
- [ ] Commission tracking (85/10/5 model)
- [ ] Partner dashboard in accommodation backoffice
- [ ] Payment integration (VNPay, Momo, card)
- [ ] Loyalty program (health points, repeat purchase discounts)
- [ ] AI-powered symptom checker (triage to OTC vs see-a-doctor)
- [ ] Pharmacist chat (in-app, translated)
- [ ] Insurance/travel insurance integration
- [ ] Controlled substance compliance workflows

---

## 11. Risks & Mitigations

| Risk                                            | Impact | Likelihood | Mitigation                                                                                       |
| ----------------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------ |
| Regulatory ambiguity (what's allowed digitally) | High   | Medium     | Phase 1 is catalog/contact only, not e-commerce; legal review before launch                      |
| Pharmacies don't see value in digital catalog   | High   | Medium     | Phase 1 is free for pharmacies; GUDBRO team builds catalog for them                              |
| Incorrect drug translations/warnings            | High   | Low        | Licensed pharmacist review of all product data; liability disclaimers                            |
| Medical liability if wrong product recommended  | High   | Low        | Disclaimers on every page; "consult pharmacist" always shown; no medical advice given            |
| Tourists self-diagnose incorrectly              | Medium | Medium     | Severity indicators; "see a doctor" recommendations for serious symptoms                         |
| Drug data becomes outdated                      | Medium | Medium     | Pharmacy dashboard for updates (Phase 2); quarterly manual review by GUDBRO team                 |
| Low adoption by pharmacies                      | Medium | Medium     | Zero friction Phase 1 (GUDBRO builds everything); target pharmacies near tourist areas first     |
| Pharmacy Law enforcement stricter than expected | Medium | Low        | Conservative approach: information only, pharmacist always in loop; legal counsel on Law 44/2024 |
| Competition from Long Chau/Pharmacity apps      | Low    | Medium     | We serve independent pharmacies, not chains; different market segment                            |
| Poor connectivity for tourists                  | Low    | Medium     | PWA offline mode for catalog browsing                                                            |
| Counterfeit drugs at partner pharmacies         | High   | Low        | Only onboard GPP-certified pharmacies; periodic verification                                     |

### Legal Disclaimers (Required on PWA)

1. "This platform is for informational purposes only. Always consult a licensed pharmacist before purchasing medication."
2. "GUDBRO does not sell or dispense medication. All purchases are made directly from the pharmacy."
3. "Product availability, pricing, and stock may vary. Contact the pharmacy to confirm."
4. "Banned substance warnings are for general guidance. Verify regulations for your specific country before purchasing."
5. "GUDBRO does not provide medical advice. If you are experiencing severe symptoms, visit a hospital or clinic."

---

## 12. Business Model Details

### Commission Structure (GUDBRO Ecosystem Standard)

| Party         | Share | When Applied                               |
| ------------- | ----- | ------------------------------------------ |
| Pharmacy      | 85%   | All referred purchases                     |
| Accommodation | 10%   | Only when referral comes from GUDBRO Stays |
| GUDBRO        | 5%    | All referred purchases                     |

**Example A: Referred from GUDBRO Stays:**

```
Customer buys medicine worth 500.000d
Referred from accommodation in-stay dashboard:

  Pharmacy receives:    425.000d  (85%)
  Accommodation receives: 50.000d  (10%)
  GUDBRO receives:       25.000d  (5%)
```

**Example B: Direct visit / QR scan:**

```
Customer buys medicine worth 500.000d
Direct visit or QR scan at pharmacy:

  Pharmacy receives:    475.000d  (95%)
  GUDBRO receives:       25.000d  (5%)
```

### Additional Revenue Streams

| Stream                             | Model                 | Phase | Estimated Revenue          |
| ---------------------------------- | --------------------- | ----- | -------------------------- |
| Commission on delivery/orders      | 10-15% of order       | 2+    | Variable, based on volume  |
| Hotel/accommodation referral       | 10% of referred sales | 3+    | Passive, per accommodation |
| Premium listing                    | Monthly fee           | 2+    | 500.000-1.000.000d/month   |
| Cross-selling from other verticals | Referral fee          | 3+    | Variable                   |

### Revenue Tracking

**Phase 1 (Manual):**

- Pharmacy reports referred sales monthly
- GUDBRO tracks contact messages sent via PWA
- Accommodation referrals tracked via deep-link parameters (UTM)

**Phase 2+ (Automated):**

- Digital orders tracked automatically via platform
- Commission calculated and settled via dashboard
- All parties have visibility into earnings

### Pricing for Pharmacies

| Tier              | Cost             | Includes                                              |
| ----------------- | ---------------- | ----------------------------------------------------- |
| Basic (Phase 1)   | Free             | Digital catalog, QR code, messaging, pharmacy locator |
| Pro (Phase 2)     | Commission-based | Stock management, delivery tracking, analytics        |
| Premium (Phase 3) | Commission-based | E-commerce, loyalty, AI features, priority placement  |

---

## 13. Cross-Vertical Integration

### With GUDBRO Accommodations (Primary Integration)

```
+--------------------------------------------------------------------+
|  GUDBRO STAYS (In-Stay Dashboard)                                  |
|                                                                    |
|  Guest taps "Pharmacy" or "Feeling unwell?" in services            |
|          |                                                         |
|          v                                                         |
|  +--- Deep Link -----------------------------------------------+  |
|  |  pharmacy.gudbro.com/browse                                  |  |
|  |    ?guest=Yuki+Tanaka                                        |  |
|  |    &room=305                                                 |  |
|  |    &hotel=ocean-view-apt                                     |  |
|  |    &checkin=2026-02-10                                       |  |
|  |    &checkout=2026-02-14                                      |  |
|  |    &lang=ja                                                  |  |
|  |    &currency=JPY                                             |  |
|  |    &source=accommodation                                    |  |
|  +--------------------------------------------------------------+  |
|          |                                                         |
|          v                                                         |
|  +--------------------------------------------------------------+  |
|  |  GUDBRO PHARMACY PWA                                         |  |
|  |                                                              |  |
|  |  - Guest data pre-filled                                     |  |
|  |  - Nearest partner pharmacy auto-selected                    |  |
|  |  - Delivery address = hotel (pre-filled)                     |  |
|  |  - Language & currency inherited from stays                  |  |
|  |  - Products shown in Japanese with JPY prices                |  |
|  +--------------------------------------------------------------+  |
|          |                                                         |
|          v                                                         |
|  +--------------------------------------------------------------+  |
|  |  COMMISSION MODEL (per referred sale)                        |  |
|  |                                                              |  |
|  |  Customer pays:   500.000d                                   |  |
|  |  Pharmacy:        425.000d  (85%)                            |  |
|  |  Accommodation:    50.000d  (10%)                            |  |
|  |  GUDBRO:           25.000d  (5%)                             |  |
|  +--------------------------------------------------------------+  |
|                                                                    |
+--------------------------------------------------------------------+
```

### With GUDBRO Tours

- Tour guides recommend partner pharmacies for common tourist needs
- **Pre-tour health checklist** with links to pharmacy products:
  - Sunscreen and sun protection (beach/island tours)
  - Motion sickness tablets (boat tours, Ba Na Hills cable car)
  - Insect repellent (jungle/countryside tours)
  - First aid basics (adventure/motorbike tours)
- "First aid kit" products bundle highlighted for adventure/outdoor tours
- QR code in tour confirmation email: "Prepare for your tour -- essentials at the nearest pharmacy"

### With GUDBRO Wellness

- **Post-treatment care products:**
  - Aftercare creams for tattoo (tattoo studios)
  - Skincare products post-facial (spa/wellness)
  - Pain relief post-deep tissue massage
- Wellness center links to pharmacy for supplements and vitamins
- Shared customer profile for holistic health/wellness experience (Phase 3)

### With GUDBRO Laundry

- Minimal direct integration
- Shared accommodation referral system and commission model
- Shared platform infrastructure and design system

### Data Flow (Accommodation Integration)

| Data Point     | Source          | Passed Via |
| -------------- | --------------- | ---------- |
| Guest name     | Booking         | URL params |
| Room number    | Booking         | URL params |
| Hotel slug     | Property        | URL params |
| Check-in/out   | Booking         | URL params |
| Language pref  | Guest settings  | URL params |
| Currency pref  | Guest settings  | URL params |
| Source channel | Referral origin | URL params |

---

## 14. Open Questions

1. **Product data source:** Who creates the initial product catalog? Decision: GUDBRO team manually for Phase 1, pharmacy self-service in Phase 2.
2. **Medical review:** Should a licensed pharmacist review all product descriptions and translations before publishing? Recommended: Yes, mandatory before launch.
3. **Liability:** What disclaimers are legally required in Vietnam for a pharmacy catalog platform? Action: Legal counsel needed.
4. **Dosage data:** Can we source standardized dosage instructions, or must each pharmacy provide their own? Research needed.
5. **Stock updates:** In Phase 1 (static), how often should we update product availability? Proposal: Quarterly, or when pharmacy notifies via Zalo.
6. **Banned substances list:** What is the authoritative source for country-specific banned medication lists? Research needed per target nationality.
7. **Multi-pharmacy:** Should a tourist see products from multiple nearby pharmacies (comparison) or one pharmacy per QR code? Decision: QR = single pharmacy; search/map = multiple.
8. **Insurance:** Is there demand for travel insurance integration for medication purchases? Phase 3 consideration.
9. **Telemedicine bridge:** Should Phase 3 include connecting tourists with English-speaking doctors for prescriptions? High value, requires separate regulatory analysis.
10. **Pharmacy Law compliance:** Do we need legal counsel specific to Law 44/2024/QH15 before launching even the catalog version? Recommended: Yes.

---

**Document History**

| Version | Date       | Author      | Changes                                                                                                                                                                                                                                                                                                                   |
| ------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-01-27 | GUDBRO Team | Initial PRD - Vision, market analysis, regulatory context, features, architecture, MVP roadmap                                                                                                                                                                                                                            |
| 2.0     | 2026-01-27 | GUDBRO Team | Complete rewrite: added pharmacy owner & hotel partner personas, pharmacy onboarding journey, information architecture section, expanded business model details, cross-vertical integration specifics, enhanced design system with Tailwind mappings, Da Nang market focus, Decree 163/2025 & Circular 31/2025 references |
