# Lessons Learned - Index

**Last Updated:** 2026-01-25

> **Principio Boris Cherny:** "Ogni volta che Claude fa qualcosa di sbagliato, lo aggiungiamo qui."
> Questi file crescono nel tempo, Claude impara e non ripete gli stessi errori.

---

## Quick Reference

| Se lavori su...         | Leggi file...      |
| ----------------------- | ------------------ |
| Database/Supabase/RLS   | `database.md`      |
| Deploy/Vercel/CI        | `vercel.md`        |
| TypeScript/Types        | `typescript.md`    |
| Git/GitHub Actions      | `git.md`           |
| Traduzioni/i18n         | `i18n.md`          |
| AI Services             | `ai-system.md`     |
| General patterns        | `patterns.md`      |

---

## Come Aggiungere Nuove Lezioni

Quando Claude fa un errore, l'utente può dire:

- "questa è una nuova lezione"
- "ricordati questo errore"
- "non farlo più"
- "lesson learned"

Claude deve:

1. Aggiungere al file appropriato in `docs/core/lessons/`
2. Confermare: "Aggiunto a lessons/[file].md"
3. Evitare di ripetere l'errore
