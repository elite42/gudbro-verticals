---
phase: quick
plan: 001
type: execute
wave: 1
depends_on: []
files_modified:
  - apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts
autonomous: true

must_haves:
  truths:
    - 'useful-numbers route selects post-081 column names (country, contact_phone)'
    - 'Emergency numbers query receives correct country value from property'
    - 'City numbers query receives correct country value from property'
    - 'Property contact phone falls back to contact_phone (not host_phone)'
  artifacts:
    - path: 'apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts'
      provides: 'Useful numbers API endpoint with corrected column names'
      contains: 'country, city, host_name, contact_phone, emergency_phone'
  key_links:
    - from: 'useful-numbers/route.ts'
      to: 'accom_properties'
      via: 'supabase .select()'
      pattern: 'select.*country, city, host_name, contact_phone, emergency_phone'
---

<objective>
Fix the useful-numbers API route to use post-migration-081 column names.

Purpose: Migration 081 renamed `country_code` to `country` and `host_phone` to `contact_phone` on accom_properties. The useful-numbers route was missed during Phase 8 alignment, causing NULL values for country lookups and property contact phone. This is the last gap from the v1.1 milestone audit.

Output: Working useful-numbers route that correctly queries post-081 schema.
</objective>

<execution_context>
@/Users/gianfrancodagostino/.claude/get-shit-done/workflows/execute-plan.md
@/Users/gianfrancodagostino/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/v1.1-MILESTONE-AUDIT.md
@apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update pre-081 column names in useful-numbers route</name>
  <files>apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts</files>
  <action>
  Make exactly 4 line changes in the useful-numbers route:

1. Line 47 — Change the SELECT columns from `country_code` and `host_phone` to `country` and `contact_phone`:
   BEFORE: `'country_code, city, host_name, host_phone, emergency_phone'`
   AFTER: `'country, city, host_name, contact_phone, emergency_phone'`

2. Line 61 — Change the property value reference from `property.country_code` to `property.country`:
   BEFORE: `.eq('country_code', property.country_code)`
   AFTER: `.eq('country_code', property.country)`
   NOTE: The emergency_numbers table column IS still called `country_code` — only the VALUE passed changes.

3. Line 65 — Same fix for city_useful_numbers query:
   BEFORE: `.eq('country_code', property.country_code)`
   AFTER: `.eq('country_code', property.country)`
   NOTE: Same as above — table column name stays, value reference changes.

4. Line 94 — Change the fallback phone from `host_phone` to `contact_phone`:
   BEFORE: `phone: property.emergency_phone || property.host_phone || '',`
   AFTER: `phone: property.emergency_phone || property.contact_phone || '',`

Do NOT change any other lines. The `host_name` and `emergency_phone` columns were NOT renamed and remain correct.
</action>
<verify>
Run TypeScript compilation to confirm no type errors:

```
cd apps/accommodations/frontend && npx tsc --noEmit
```

Grep the file to confirm all 4 changes applied:

```
grep -n "country_code\|host_phone" apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts
```

Expected: zero matches (all old column references removed from this file).
</verify>
<done>

- Line 47 selects `country, city, host_name, contact_phone, emergency_phone`
- Lines 61, 65 pass `property.country` as value to `.eq('country_code', ...)`
- Line 94 uses `property.contact_phone` as fallback
- No references to `country_code` or `host_phone` remain in the property-related code of this file
- TypeScript compiles without errors
  </done>
  </task>

</tasks>

<verification>
1. `grep -n "country_code\|host_phone" apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts` returns NO matches
2. `grep -n "property\.country\b" apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts` returns 2 matches (lines ~61, ~65)
3. `grep -n "contact_phone" apps/accommodations/frontend/app/api/stay/[code]/useful-numbers/route.ts` returns 2 matches (SELECT + fallback)
4. TypeScript compiles cleanly
</verification>

<success_criteria>

- The useful-numbers route uses only post-081 column names when querying accom_properties
- Emergency and city number lookups receive the correct `country` value
- Property contact phone uses `contact_phone` fallback
- v1.1 milestone audit gap is fully closed (22/22 integration, 8/8 flows)
  </success_criteria>

<output>
After completion, create `.planning/quick/001-fix-useful-numbers-pre081-columns/001-SUMMARY.md`
Update `.planning/v1.1-MILESTONE-AUDIT.md` status from `gaps_found` to `complete` and mark Flow 8 as COMPLETE.
</output>
