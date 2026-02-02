# Lessons: AI System

## Errori Comuni

| Errore                      | Causa                                  | Soluzione                                |
| --------------------------- | -------------------------------------- | ---------------------------------------- |
| MCP/API timeout misterioso  | Query complesse senza diagnostica      | Debug incrementale: semplice → complessa |
| list_tables blocca Claude   | Schema public troppo grande (~100 tab) | Query mirata su tabelle specifiche       |
| Pieces MCP timeout          | Server non ancora sincronizzato        | Aspetta sincronizzazione                 |
| Tentato save manuale Pieces | Pieces cattura tutto automaticamente   | Solo `ask_pieces_ltm` per query          |

## Patterns Corretti

| Area          | Pattern Corretto              | Anti-Pattern                |
| ------------- | ----------------------------- | --------------------------- |
| Debug API/MCP | Query semplice → incrementale | Query complessa subito      |
| Pieces MCP    | Query only (`ask_pieces_ltm`) | `create_memory` (auto-save) |
