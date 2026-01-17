# Prima Task Guidata

> Una task completa per familiarizzare con il workflow.
> Tempo stimato: 2-3 ore.

---

## Obiettivo

Aggiungere un nuovo campo **"Note per lo staff"** alla pagina delle prenotazioni, che permette al merchant di aggiungere note interne su una prenotazione.

Questa task ti farà toccare:

- ✅ Database (migration)
- ✅ API Route (GET/PATCH)
- ✅ UI Component (form field)
- ✅ TypeScript types
- ✅ Git workflow

---

## Step 1: Comprendi il Contesto

### 1.1 Esplora la Feature Esistente

```bash
# Avvia il server
pnpm dev:backoffice

# Apri nel browser
open http://localhost:3023/reservations
```

Naviga alla pagina prenotazioni e osserva:

- Come sono visualizzate le prenotazioni
- Cosa succede quando clicchi su una prenotazione
- Quali campi sono già presenti

### 1.2 Leggi il Codice Esistente

```bash
# Pagina prenotazioni
cat apps/backoffice/app/\(dashboard\)/reservations/page.tsx

# Componente dettaglio
ls apps/backoffice/components/reservations/

# API route
cat apps/backoffice/app/api/reservations/route.ts
```

---

## Step 2: Crea Branch

```bash
# Assicurati di essere su main aggiornato
git checkout main
git pull origin main

# Crea branch per la feature
git checkout -b feature/reservation-staff-notes
```

---

## Step 3: Database Migration

### 3.1 Crea il File Migration

La tabella `reservations` esiste già. Dobbiamo aggiungere una colonna.

```bash
# Crea il file migration
touch shared/database/migrations/schema/059-reservation-staff-notes.sql
```

### 3.2 Scrivi la Migration

```sql
-- ============================================================================
-- Migration 059: Add staff_notes to reservations
-- ============================================================================
-- Purpose: Allow merchants to add internal notes to reservations
-- Author: [Il tuo nome]
-- Date: [Data]
-- ============================================================================

ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS staff_notes TEXT;

COMMENT ON COLUMN reservations.staff_notes IS 'Internal notes visible only to staff';
```

### 3.3 Applica la Migration

Usa il tool MCP Supabase (se usi Claude Code):

```
mcp__supabase__apply_migration(
  name: "add_staff_notes_to_reservations",
  query: "ALTER TABLE reservations ADD COLUMN IF NOT EXISTS staff_notes TEXT;"
)
```

Oppure esegui manualmente su Supabase Dashboard → SQL Editor.

### 3.4 Verifica

```sql
-- Verifica che la colonna esista
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'reservations' AND column_name = 'staff_notes';
```

---

## Step 4: Aggiorna i Types

### 4.1 Trova il Type Esistente

```bash
# Cerca dove è definito il tipo Reservation
grep -r "interface Reservation" apps/backoffice/
```

### 4.2 Aggiungi il Campo

Trova il file con l'interface `Reservation` e aggiungi:

```typescript
interface Reservation {
  // ... campi esistenti
  staff_notes?: string | null; // Aggiungi questo
}
```

---

## Step 5: Aggiorna API Route

### 5.1 GET - Includi il Campo

Apri `apps/backoffice/app/api/reservations/route.ts`.

Nel SELECT, assicurati che `staff_notes` sia incluso:

```typescript
const { data } = await supabase.from('reservations').select(`
    *,
    staff_notes,  // Dovrebbe già essere incluso con *
    ...
  `);
```

### 5.2 PATCH - Permetti Update

Se esiste un endpoint PATCH, aggiungi `staff_notes` ai campi aggiornabili:

```typescript
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, staff_notes, ...otherFields } = body;

  const { data, error } = await supabase
    .from('reservations')
    .update({ staff_notes, ...otherFields })
    .eq('id', id)
    .select()
    .single();

  // ...
}
```

---

## Step 6: Aggiorna UI

### 6.1 Trova il Componente

```bash
# Cerca il form/dialog di modifica prenotazione
ls apps/backoffice/components/reservations/
```

### 6.2 Aggiungi il Campo Form

Trova il componente che mostra i dettagli prenotazione e aggiungi:

```tsx
import { Textarea } from '@/components/ui/textarea';

// Nel form/dialog
<div className="space-y-2">
  <label className="text-sm font-medium">Note per lo Staff</label>
  <Textarea
    placeholder="Note interne (non visibili al cliente)"
    value={reservation.staff_notes || ''}
    onChange={(e) => handleFieldChange('staff_notes', e.target.value)}
    rows={3}
  />
  <p className="text-xs text-gray-500">
    Queste note sono visibili solo allo staff, non al cliente.
  </p>
</div>;
```

---

## Step 7: Testa

### 7.1 Test Manuale

1. Vai su http://localhost:3023/reservations
2. Crea una nuova prenotazione (o seleziona esistente)
3. Aggiungi note nello staff notes field
4. Salva
5. Ricarica la pagina
6. Verifica che le note siano persistite

### 7.2 Checklist

- [ ] Campo visibile nel form
- [ ] Salvataggio funziona
- [ ] Valore persiste dopo reload
- [ ] Campo vuoto gestito correttamente
- [ ] Nessun errore in console

---

## Step 8: Commit & PR

### 8.1 Commit

```bash
# Verifica cosa hai modificato
git status
git diff

# Stage dei file
git add .

# Commit con messaggio descrittivo
git commit -m "feat(reservations): add staff_notes field

- Add staff_notes column to reservations table
- Update API to handle staff_notes in GET/PATCH
- Add Textarea field in reservation detail view
- Notes are internal, not visible to customers

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

### 8.2 Push

```bash
git push -u origin feature/reservation-staff-notes
```

### 8.3 Crea PR

```bash
gh pr create --title "feat(reservations): add staff notes field" --body "## Summary
- Added staff_notes column to reservations table
- Merchants can now add internal notes to reservations
- Notes are visible only to staff

## Test Plan
- [x] Manual testing: create, edit, save reservation with notes
- [x] Verified notes persist after page reload
- [x] Empty notes handled correctly

## Screenshots
[Aggiungi screenshot del campo]"
```

---

## Step 9: Code Review

### Cosa Aspettarsi

Il reviewer controllerà:

- Migration SQL corretta
- Types aggiornati
- API sicura (auth check, validation)
- UI accessibile e consistente
- Nessun errore TypeScript

### Se Ricevi Feedback

1. Leggi i commenti con attenzione
2. Chiedi chiarimenti se non capisci
3. Fai le modifiche richieste
4. Committa con messaggio `fix: address review feedback`
5. Push e notifica il reviewer

---

## Step 10: Merge

Una volta approvata:

```bash
# Su GitHub
# Click "Merge pull request"
# Delete branch after merge
```

---

## Hai Completato!

Congratulazioni! Hai:

- ✅ Modificato il database
- ✅ Aggiornato l'API
- ✅ Aggiornato la UI
- ✅ Seguito il workflow Git
- ✅ Creato la tua prima PR

---

## Prossimi Passi

1. Prendi una task vera da `docs/backlog/1-TODO.md`
2. Leggi la spec (se esiste in `docs/backlog/specs/`)
3. Ripeti il processo!

### Task Semplici per Iniziare

Cerca task con label "good first issue" o effort "Low" nel backlog.

---

## Troubleshooting

### "Migration failed"

Verifica la sintassi SQL. Usa `IF NOT EXISTS` per idempotenza.

### "TypeScript error"

Rigenera i types:

```bash
pnpm generate:types
```

### "Campo non appare"

1. Verifica che il componente stia ricevendo i dati aggiornati
2. Controlla la response API nel Network tab
3. Assicurati che la migration sia stata applicata

### "PR bloccata"

Chiedi aiuto al team. Non è un problema - è normale avere domande!
