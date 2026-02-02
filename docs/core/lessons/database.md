# Lessons: Database & Supabase

## Errori Comuni

| Errore                      | Causa                          | Soluzione                                   |
| --------------------------- | ------------------------------ | ------------------------------------------- |
| UUID con lettere g-z        | Generazione manuale            | Solo 0-9, a-f                               |
| Array `[]` invece `{}`      | Sintassi JS vs PG              | PostgreSQL usa `'{"a","b"}'`                |
| RLS policy `true`           | Permette accesso a tutti       | `auth.role() = 'service_role'` per backend  |
| Policies "dev\_\*" in prod  | Lasciate da sviluppo           | Rimuovere o sostituire                      |
| function search_path        | Vulnerabilità injection        | `ALTER FUNCTION x SET search_path = public` |
| anon_key bloccata da RLS    | Script usa anon_key per INSERT | Serve service_role_key                      |
| Weather cache RLS violation | Service usa client anon key    | Usare `supabaseAdmin`                       |

## Patterns Corretti

| Area            | Pattern Corretto                                    | Anti-Pattern                  |
| --------------- | --------------------------------------------------- | ----------------------------- |
| SQL Arrays      | `'{"a","b"}'`                                       | `'["a","b"]'`                 |
| UUID            | `a1b2c3d4-...` (solo hex)                           | `ghij-klmn-...`               |
| RLS Backend     | `auth.role() = 'service_role'`                      | `WITH CHECK (true)`           |
| RLS User        | `auth.uid() = user_id`                              | `USING (true)`                |
| RLS Public Read | `FOR SELECT USING (true)` OK                        | `FOR ALL USING (true)` NO     |
| Schema inspect  | `information_schema.columns` per tabelle specifiche | `list_tables` su schema large |
| RLS bypass      | Script→SQL output→MCP execute                       | Cercare service_role_key      |
| Server cache    | Services che scrivono cache usano `supabaseAdmin`   | `supabase` bloccato da RLS    |

## Quick Reference Errori SQL

| Errore                               | Causa              | Fix               |
| ------------------------------------ | ------------------ | ----------------- |
| `invalid input syntax for type uuid` | Caratteri g-z      | Solo 0-9, a-f     |
| `column "X" does not exist`          | Colonna sbagliata  | Verifica schema   |
| `violates check constraint`          | Valore non ammesso | Leggi CHECK       |
| `malformed array literal`            | `[]` invece `{}`   | Usa `'{"a","b"}'` |
