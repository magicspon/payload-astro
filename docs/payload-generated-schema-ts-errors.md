# Bug: `payload generate:db-schema` produces TypeScript errors on circular table references

**Repository:** payloadcms/payload
**Labels:** bug, db-postgres, typescript

## Description

Running `payload generate:db-schema` generates a `payload-generated-schema.ts` file that contains circular foreign key references between tables (e.g. `media → teams → organizations → media`). TypeScript cannot infer the types for these tables and raises implicit `any` errors, even though `AnyPgColumn` is already imported in the generated file.

## Steps to reproduce

1. Create a Payload project with `@payloadcms/db-postgres`
2. Define collections with cross-referencing relationships, e.g.:
   - `media` has a `team` relationship field → `teams`
   - `organizations` has an `image` relationship field → `media`
   - `teams` has an `organization` relationship field → `organizations`
3. Run `payload generate:db-schema`
4. Run `tsc --noEmit`

## Errors

```
src/payload-generated-schema.ts(2195,14): error TS7022: 'media' implicitly has type 'any' because it does not
  have a type annotation and is referenced directly or indirectly in its own initializer.
src/payload-generated-schema.ts(2205,36): error TS7024: Function implicitly has return type 'any' because it
  does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
src/payload-generated-schema.ts(3562,14): error TS7022: 'organizations' implicitly has type 'any' because it
  does not have a type annotation and is referenced directly or indirectly in its own initializer.
src/payload-generated-schema.ts(3569,38): error TS7024: Function implicitly has return type 'any' because it
  does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
src/payload-generated-schema.ts(3596,14): error TS7022: 'teams' implicitly has type 'any' because it does not
  have a type annotation and is referenced directly or indirectly in its own initializer.
src/payload-generated-schema.ts(3601,52): error TS7024: Function implicitly has return type 'any' because it
  does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
```

## Root cause

The generated code uses deferred `.references(() => otherTable.id)` callbacks to handle forward references, but TypeScript still cannot resolve the types when tables form a cycle. The `AnyPgColumn` type is imported but not applied to the circular reference columns.

The offending pattern looks like:

```ts
export const media = pgTable('media', {
  // ...
  team: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
  //                                  ^^^^ 'teams' not yet typed → implicit any
})

export const organizations = pgTable('organizations', {
  // ...
  image: uuid('image_id').references(() => media.id, { onDelete: 'set null' }),
})

export const teams = pgTable('teams', {
  // ...
  organization: uuid('organization_id').references(() => organizations.id, { onDelete: 'set null' }),
})
```

## Expected behaviour

The generated file should either:

1. **Use `AnyPgColumn` type annotations** on circular reference columns (the import is already present):
   ```ts
   team: uuid('team_id').references((): AnyPgColumn => teams.id, { onDelete: 'set null' }),
   ```
2. **Or prepend `// @ts-nocheck`** to the generated file, consistent with the existing `/* tslint:disable */` / `/* eslint-disable */` directives already present.

## Workaround

Prepend `// @ts-nocheck` to the generated file after each run. We do this via a wrapper script in `package.json`:

```json
"generate:db-schema": "payload generate:db-schema && node -e \"const fs=require('fs');const f='src/payload-generated-schema.ts';fs.writeFileSync(f,'// @ts-nocheck\\n'+fs.readFileSync(f,'utf8'))\""
```

## Environment

- `payload`: `^3.77.0`
- `@payloadcms/db-postgres`: `^3.77.0`
- `typescript`: `^5.9.3`
- Node: 22
