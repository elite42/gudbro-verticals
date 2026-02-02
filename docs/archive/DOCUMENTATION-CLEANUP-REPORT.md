# Report Pulizia Documentazione

**Data Analisi:** 2025-12-13
**Totale File MD:** 48
**Autore:** Claude Code

---

## Riepilogo Azioni Consigliate

| Azione | File | Motivo |
|--------|------|--------|
| 🗑️ ELIMINARE | 6 file | Obsoleti/Duplicati |
| 📦 ARCHIVIARE | 4 file | Storico utile ma non attivo |
| ✏️ AGGIORNARE | 3 file | Contenuto datato |
| ✅ MANTENERE | 35 file | Documentazione attiva |

---

## 🗑️ FILE DA ELIMINARE (6)

### 1. `docs/CLAUDE-archive-2025-12-07.md` (930 righe)
**Motivo:** Archivio obsoleto del CLAUDE.md principale. Contenuto già incorporato nel CLAUDE.md attuale o superato.
**Azione:** Eliminare

### 2. `shared/database/MILESTONE-71-INGREDIENTS.md`
**Motivo:** Milestone storico (Nov 2025). Database ora ha 100+ ingredienti. Non più rilevante.
**Azione:** Eliminare

### 3. `shared/database/MILESTONE-74-INGREDIENTS-13-PRODUCTS.md`
**Motivo:** Milestone storico superato. Prodotti ora sono 90+.
**Azione:** Eliminare

### 4. `apps/rentals/TEST-RESULTS.md`
**Motivo:** Report test di una singola sessione (Nov 2025). Non documentazione permanente.
**Azione:** Eliminare

### 5. `apps/rentals/TEST-RESULTS-V2-MULTI-VENUE.md`
**Motivo:** Come sopra - report test sessione singola.
**Azione:** Eliminare

### 6. `REPOSITORY-SPLIT-MIGRATION-2025-11-28.md`
**Motivo:** Documentazione migrazione completata. Non più necessaria per operazioni quotidiane.
**Azione:** Eliminare

---

## 📦 FILE DA ARCHIVIARE (4)

Spostare in `docs/_archive/` per riferimento storico:

### 1. `apps/coffeeshop/Analisi_Completa_20_Concorrenti_QR_Code.md`
**Motivo:** Analisi competitiva di valore ma non documentazione operativa.
**Azione:** Spostare in `docs/_archive/competitor-analysis-2025-11.md`

### 2. `apps/coffeeshop/frontend/CHATBOT-AI-INTEGRATION.md`
**Motivo:** Chatbot è stato archiviato (vedi CLAUDE.md coffeeshop). Documentazione non più attiva.
**Azione:** Spostare in `docs/_archive/chatbot-integration.md`

### 3. `apps/coffeeshop/BACKLOG.md`
**Motivo:** Verificare se ancora usato. Se no, archiviare.
**Azione:** Verificare → Archiviare se obsoleto

### 4. `shared/menu-template/MIGRATION_GUIDE.md`
**Motivo:** Guida migrazione probabilmente completata.
**Azione:** Verificare → Archiviare se completata

---

## ✏️ FILE DA AGGIORNARE (3)

### 1. `CLAUDE.md` (root)
**Problema:** Sezione "Sessione Corrente" datata 2025-12-11. Manca riferimento a:
- Sistema 5 Dimensioni
- Category Taxonomy
- Product Search API
**Azione:** Aggiornare con riferimenti ai nuovi sistemi

### 2. `apps/coffeeshop/frontend/CLAUDE.md`
**Problema:** 991 righe - molto lungo. Sezioni datate.
**Azione:** Condensare, rimuovere sessioni storiche

### 3. `docs/inventory.md`
**Problema:** Potrebbe non essere aggiornato con ultimi sviluppi.
**Azione:** Verificare e aggiornare

---

## ✅ FILE DA MANTENERE (35)

### Documentazione Core
- `CLAUDE.md` (root) - Context principale
- `ARCHITECTURE.md` - Architettura sistema
- `README.md` - Intro progetto
- `docs/SISTEMA-FILTRI.md` - 5 Dimensioni (SOURCE OF TRUTH)
- `docs/inventory.md` - Feature inventory
- `docs/ACTION-PLAN-2025-12-12.md` - Piano azioni attivo

### CLAUDE.md per App
- `apps/coffeeshop/frontend/CLAUDE.md`
- `apps/rentals/CLAUDE.md`
- `apps/wellness/CLAUDE.md`

### README Tecnici
- `shared/database/README.md`
- `shared/core/README.md`
- `shared/seo/README.md`
- `shared/menu-template/README.md`
- `shared/database/customizations/README.md`
- `apps/backoffice/README.md`
- `apps/website/README.md`
- `apps/rentals/README.md`
- `apps/rentals/frontend/README.md`
- `apps/coffeeshop/frontend/components/ui/README.md`
- `apps/coffeeshop/frontend/public/products/README.md`
- `apps/wellness/frontend/lib/seo/README.md`

### Documentazione Specifica
- `apps/coffeeshop/frontend/ICON-MAPPING-REFERENCE.md`
- `apps/coffeeshop/frontend/docs/CATEGORY-SYSTEM.md`
- `apps/rentals/DEPLOYMENT-GUIDE.md`
- `apps/rentals/SEO-INTEGRATION.md`
- `docs/sprints/SPRINT-PLAN-2025-12.md`

### Claude Agents & Commands
- `.claude/agents/*.md` (7 file)
- `.claude/commands/*.md` (5 file)

---

## Script di Pulizia

```bash
# Eseguire dalla root del progetto

# 1. Eliminare file obsoleti
rm docs/CLAUDE-archive-2025-12-07.md
rm shared/database/MILESTONE-71-INGREDIENTS.md
rm shared/database/MILESTONE-74-INGREDIENTS-13-PRODUCTS.md
rm apps/rentals/TEST-RESULTS.md
rm apps/rentals/TEST-RESULTS-V2-MULTI-VENUE.md
rm REPOSITORY-SPLIT-MIGRATION-2025-11-28.md

# 2. Creare cartella archivio
mkdir -p docs/_archive

# 3. Archiviare file storici
mv "apps/coffeeshop/Analisi_Completa_20_Concorrenti_QR_Code.md" docs/_archive/competitor-analysis-2025-11.md
mv apps/coffeeshop/frontend/CHATBOT-AI-INTEGRATION.md docs/_archive/chatbot-integration.md

# 4. Commit
git add -A
git commit -m "docs: cleanup obsolete documentation (6 deleted, 2 archived)"
```

---

## Note Finali

### Cosa NON Eliminare
- File `.claude/` - Configurazione Claude Code attiva
- README.md in qualsiasi cartella - Documentazione essenziale
- CLAUDE.md per app - Context specifico per AI
- docs/SISTEMA-FILTRI.md - SOURCE OF TRUTH per 5 dimensioni

### Convenzioni Future
1. **Milestone completati** → Eliminare dopo 30 giorni
2. **Report test** → Non committare (usare CI/CD)
3. **Archivi** → Spostare in `docs/_archive/` non nella root
4. **Sessioni storiche** → Rimuovere da CLAUDE.md dopo 7 giorni

---

**Prossimo Step:** Approvazione utente → Esecuzione script pulizia
