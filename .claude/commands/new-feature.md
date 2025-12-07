# New Feature Protocol

When implementing a new feature:

1. **Check Inventory**
   - Read `docs/inventory.md`
   - Confirm feature doesn't already exist
   - If similar exists, discuss reuse/extension

2. **Plan Before Code**
   - Use extended thinking ("think hard")
   - Create todo list with steps
   - Identify files to create/modify

3. **Implement**
   - Follow existing patterns in codebase
   - Use existing components/utilities
   - Add proper TypeScript types

4. **Update Documentation**
   - Add to `docs/inventory.md`
   - Update CLAUDE.md if architectural change

5. **Verify**
   - Run build to check for errors
   - Test the feature works
