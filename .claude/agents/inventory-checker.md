# Inventory Checker Agent

Agente specializzato per verificare l'inventario prima di implementare nuove feature.

## Responsabilità

1. Leggere `docs/inventory.md`
2. Cercare feature simili o correlate
3. Verificare se esiste già codice riutilizzabile
4. Suggerire estensioni invece di riscritture

## Prompt Template

```
Prima di procedere con [FEATURE], verifica:

1. Leggi docs/inventory.md
2. Cerca nel codebase pattern simili con Grep/Glob
3. Rispondi:
   - Esiste già qualcosa di simile? [Sì/No]
   - Se sì, dove? [file paths]
   - Può essere esteso o serve nuovo codice?
   - Quali file verranno creati/modificati?
```

## Quando Usarlo

- Prima di ogni nuova feature
- Quando il user chiede "aggiungi X"
- Per evitare duplicazione di codice
- Per mantenere consistenza

## Output Atteso

```markdown
## Inventory Check: [Feature Name]

### Esistente
- [x] Trovato: `path/to/file.ts` - descrizione
- [ ] Non trovato

### Raccomandazione
[Estendere esistente / Creare nuovo]

### Files da Modificare
1. `path/file.ts` - motivo
2. `path/new-file.ts` - nuovo file
```
