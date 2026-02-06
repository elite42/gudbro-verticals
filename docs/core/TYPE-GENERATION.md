# Type Generation Workflow

> Come generare e aggiornare i tipi TypeScript dal database Supabase.

**Last Updated:** 2026-02-06

---

## Stato Attuale

| Aspetto         | Dettaglio                                                                      |
| --------------- | ------------------------------------------------------------------------------ |
| File tipi       | `shared/types/supabase.ts` (405 righe)                                         |
| Metodo          | **Manuale** — scritto a mano, NON auto-generato                                |
| Comando gen     | `pnpm generate:types` (root) o `pnpm --filter=@gudbro/types generate:supabase` |
| Project ID      | `vnaonebbuezrzvjekqxs`                                                         |
| Schema          | `public`                                                                       |
| Tabelle coperte | ~15 (accounts, points, badges, subscriptions, notifications, ecc.)             |
| Tabelle in DB   | 76+ (da 76 migrations)                                                         |

**Problema:** Il file `supabase.ts` copre solo ~15 tabelle su 76+. Molte tabelle aggiunte nelle migration 027-076 non hanno tipi TypeScript.

---

## Come Rigenerare i Tipi

### Prerequisiti

```bash
# 1. Login a Supabase (una tantum)
npx supabase login

# 2. Verifica accesso al progetto
npx supabase projects list
```

### Generazione

```bash
# Dalla root del monorepo:
pnpm generate:types

# Oppure direttamente:
cd shared/types
npx supabase gen types typescript --project-id vnaonebbuezrzvjekqxs --schema public > supabase.ts
```

### Dopo la Generazione

1. **Verifica il file** — controlla che `supabase.ts` contenga tutte le tabelle attese
2. **Typecheck** — `pnpm turbo typecheck` per verificare compatibilità
3. **Fix breaking changes** — i tipi auto-generati potrebbero avere nomi diversi da quelli manuali
4. **Aggiorna custom.ts/domain.ts** — se necessario per nuovi tipi

---

## Struttura dei Tipi

```
shared/types/
├── index.ts        # Re-export di tutti i tipi
├── supabase.ts     # Tipi database (attualmente manuali, da auto-generare)
├── custom.ts       # Tipi custom non-DB (MenuItem, MenuCategory, UI types)
└── domain.ts       # Tipi dominio (Order, MerchantCharge)
```

### Chi importa cosa

| Package        | Import                                                     |
| -------------- | ---------------------------------------------------------- |
| Backoffice     | `@gudbro/types` → `Database`, custom types                 |
| Coffeeshop     | `@gudbro/types` → `MenuItem`, `MenuCategory`, domain types |
| Shared modules | `@gudbro/types` → vari                                     |

---

## Rischi della Migrazione a Auto-Generazione

| Rischio                        | Mitigazione                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| Nomi colonne diversi           | Diff pre/post generazione                                            |
| Tipi `Insert`/`Update` diversi | I manuali usano `Omit<Row, ...>`, gli auto-gen usano pattern diverso |
| Breaking changes in import     | Grep tutti gli usi di `Database['public']['Tables']`                 |
| Tipi custom persi              | `custom.ts` e `domain.ts` restano separati, non toccati              |

---

## TODO

- [ ] Eseguire `pnpm generate:types` e confrontare output con file manuale
- [ ] Mappare gap tra tipi manuali (15 tabelle) e DB reale (76+ tabelle)
- [ ] Pianificare migrazione graduale a tipi auto-generati
