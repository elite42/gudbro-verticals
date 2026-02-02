# Lessons: TypeScript & Types

## Errori Comuni

| Errore                         | Causa                               | Soluzione                                   |
| ------------------------------ | ----------------------------------- | ------------------------------------------- |
| Import types sbagliati         | Path relativi errati                | Usa `@/types/`                              |
| Type union incompleta          | Manca valore combinato              | Include `'both'` quando dominio lo richiede |
| `useState<any[]>` implicit any | Locale passa, CI fallisce           | Definire sempre interface tipizzata         |
| Export duplicati               | `export interface` + default export | Mai duplicare                               |

## Patterns Corretti

| Area        | Pattern Corretto                               | Anti-Pattern                   |
| ----------- | ---------------------------------------------- | ------------------------------ |
| Imports     | `import { X } from '@/lib/...'`                | Path relativi profondi         |
| Type unions | Include tutti i valori validi                  | Dimenticare `'both'` etc       |
| React state | `useState<MyInterface[]>([])` sempre tipizzato | `useState<any[]>([])` implicit |
