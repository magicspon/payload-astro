# Spon.

An Astro frontend application with Payload CMS as the backend.

## Table of Contents

- [Development Tools](#development-tools)
  - [Code Quality](#code-quality)
  - [Git Hooks (Husky)](#git-hooks-husky)
  - [Build \& Development](#build--development)
  - [Workflow](#workflow)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
  - [Root Environment Variables](#root-environment-variables)
  - [CMS Environment Variables](#cms-environment-variables)
  - [Web Environment Variables](#web-environment-variables)
- [API Integration](#api-integration)
- [Self-Hosted Services](#self-hosted-services)
  - [UseSend (Email Delivery)](#usesend-email-delivery)
  - [Plausible Analytics](#plausible-analytics)
- [Quick Start](#quick-start)
  - [Local Development (Recommended)](#local-development-recommended)
- [Storybook](#storybook)
- [Docker Development](#docker-development)
- [Database Sync](#database-sync)
- [S3 Asset Sync](#s3-asset-sync)
- [Seeding Dummy Content](#seeding-dummy-content)
- [Generating Component Stubs](#generating-component-stubs)
- [Database Migrations](#database-migrations)
- [Docker Commands](#docker-commands)
  - [Development Services](#development-services)
  - [Production Build](#production-build)
- [Deployment](#deployment)
- [Questions](#questions)

## Development Tools

This project uses a modern development toolchain for code quality and consistency:

### Code Quality

- **[oxlint](https://oxc.rs/)** - Fast, Rust-based linter for JavaScript/TypeScript
- **[styelint](https://stylelint.io/)** - A mighty CSS linter that helps you avoid errors and enforce conventions
- **[Prettier](https://prettier.io/)** - Opinionated code formatter
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with strict checking
- **[lint-staged](https://github.com/lint-staged/lint-staged)** - Run linters on staged git files

### Git Hooks (Husky)

Pre-commit hooks automatically run on `git commit`:

1. **Format** - Prettier formats staged files
2. **Lint** - oxlint checks for code issues (fails on warnings)
3. **Type check** - TypeScript validates types across the entire project
4. **Stylelint** - stylelint checks css for issues

Commit message validation using [commitlint](https://commitlint.js.org/) with conventional commits format.

### Build & Development

- **[Turborepo](https://turbo.build/repo)** - High-performance monorepo build system
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Vitest](https://vitest.dev/)** - Blazing fast unit test framework
- **[Playwright](https://playwright.dev/)** - E2E testing framework
- **[Storybook](https://storybook.js.org/)** - UI component development and documentation

### Workflow

All quality checks run automatically before commits. To bypass (not recommended):

```bash
git commit --no-verify
```

## Architecture

- **Frontend**: Astro - [http://localhost:4321](http://localhost:4321)
  - [Web App Documentation](apps/web/README.md) - Payload SDK
- **Backend**: Payload CMS - [http://localhost:3000/admin](http://localhost:3000/admin)
  - [CMS Documentation](apps/cms/README.md)
- **Storybook**: Component library - [http://localhost:6006](http://localhost:6006)
- **Database**: PostgreSQL (port 35435)
- **Storage**: RustFS (ports 9000-9001)

## Environment Variables

Configuration files are located at the root (`.env.example`), `apps/cms/.env.example`, and `apps/web/.env.example`. Copy these to `.env` and configure as needed.

### Root Environment Variables

These variables are used by development scripts (database sync, S3 sync, etc.) and are located in the root `.env` file.

| Variable                                   | Description                           | Required | Example                                             |
| ------------------------------------------ | ------------------------------------- | -------- | --------------------------------------------------- |
| **Local Database**                         |                                       |          |                                                     |
| `DATABASE_URL`                             | Local PostgreSQL connection string    | Yes      | `postgres://postgres:postgres@localhost:35435/spon` |
| **S3 Storage (for sync scripts)**          |                                       |          |                                                     |
| `S3_BUCKET`                                | S3 bucket name for syncing assets     | No       | `spon-media`                                        |
| `S3_BUCKET_REGION`                         | S3 bucket region                      | No       | `us-east-1`                                         |
| `S3_ACCESS_KEY_ID`                         | S3 access key ID                      | No       | `your-access-key`                                   |
| `S3_SECRET_ACCESS_KEY`                     | S3 secret access key                  | No       | `your-secret-key`                                   |
| `S3_ENDPOINT`                              | S3-compatible endpoint URL            | No       | `http://localhost:9000`                             |
| **Production Database (for sync scripts)** |                                       |          |                                                     |
| `PRODUCTION_HOST`                          | Production server SSH hostname        | No       | `your-server.com`                                   |
| `PRODUCTION_USER`                          | Production server SSH username        | No       | `your-ssh-user`                                     |
| `PRODUCTION_DB_URL`                        | Production database connection string | No       | `postgresql://user:pass@host:port/database`         |
| **Plausible Analytics (Local Docker)**     |                                       |          |                                                     |
| `SECRET_KEY_BASE`                          | Plausible secret key (64+ chars)      | Yes      | Generate with `openssl rand -base64 64`             |
| `PLAUSIBLE_API_KEY`                        | Plausible API key                     | No       | `your-plausible-api-key`                            |
| `PLAUSIBLE_API_HOST`                       | Plausible instance URL                | No       | `http://localhost:8000`                             |

### CMS Environment Variables

| Variable                           | Description                                                 | Required | Example                                       |
| ---------------------------------- | ----------------------------------------------------------- | -------- | --------------------------------------------- |
| **Database**                       |                                                             |          |                                               |
| `DATABASE_URL`                     | PostgreSQL connection string                                | Yes      | `postgresql://user:pass@localhost:35435/spon` |
| **Payload CMS**                    |                                                             |          |                                               |
| `PAYLOAD_SECRET`                   | Secret key for encrypting sensitive data and signing tokens | Yes      | `your-secret-key-here`                        |
| `PAYLOAD_BEARER_TOKEN`             | Bearer token for authenticating API requests                | Yes      | `your-bearer-token`                           |
| **S3 Storage**                     |                                                             |          |                                               |
| `S3_BUCKET`                        | S3 bucket name for media uploads                            | Yes      | `spon-media`                                  |
| `S3_BUCKET_REGION`                 | S3 bucket region                                            | Yes      | `us-east-1`                                   |
| `S3_ACCESS_KEY_ID`                 | S3 access key ID                                            | Yes      | `your-access-key`                             |
| `S3_SECRET_ACCESS_KEY`             | S3 secret access key                                        | Yes      | `your-secret-key`                             |
| `S3_ENDPOINT`                      | S3-compatible endpoint URL                                  | Yes      | `http://localhost:9000`                       |
| **Preview Mode**                   |                                                             |          |                                               |
| `PREVIEW_SECRET`                   | Secret token for enabling draft/preview functionality       | No       | `preview-secret-token`                        |
| **Email (Resend - Legacy)**        |                                                             |          |                                               |
| `RESEND_API_KEY`                   | Resend API key (consider migrating to UseSend)              | No       | `re_xxxxxxxx`                                 |
| **Email (UseSend)**                |                                                             |          |                                               |
| `USE_SEND_API_KEY`                 | UseSend API key for transactional emails                    | Yes      | `your-usesend-api-key`                        |
| `USE_SEND_URL`                     | UseSend instance URL                                        | Yes      | `https://api.usesend.com`                     |
| **Application URLs**               |                                                             |          |                                               |
| `CLIENT_URL`                       | Frontend application URL                                    | Yes      | `http://localhost:4321`                       |
| `CMS_URL`                          | CMS backend URL (server-side)                               | Yes      | `http://localhost:3000`                       |
| `NEXT_PUBLIC_CMS_URL`              | CMS backend URL (client-side)                               | Yes      | `http://localhost:3000`                       |
| **Dokploy Deployment**             |                                                             |          |                                               |
| `DOKPLOY_APPLICATION_ID`           | Dokploy application identifier                              | No       | `app-xxxxxxxx`                                |
| `DOKPLOY_AUTH_TOKEN`               | Dokploy authentication token                                | No       | `your-dokploy-token`                          |
| `DOKPLOY_URL`                      | Dokploy instance URL                                        | No       | `https://dokploy.yourdomain.com`              |
| **Plausible Analytics**            |                                                             |          |                                               |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`     | Your domain for analytics tracking                          | No       | `yourdomain.com`                              |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` | Plausible script URL                                        | No       | `https://plausible.io/js/script.js`           |
| `PLAUSIBLE_API_KEY`                | Plausible API key                                           | No       | `your-plausible-api-key`                      |
| `PLAUSIBLE_API_HOST`               | Plausible instance URL                                      | No       | `https://plausible.io`                        |
| **AWS (Optional)**                 |                                                             |          |                                               |
| `AWS_ACCESS_KEY`                   | AWS access key for additional services                      | No       | `your-aws-key`                                |
| `AWS_SECRET_KEY`                   | AWS secret key for additional services                      | No       | `your-aws-secret`                             |
| **GitHub OAuth (Legacy)**          |                                                             |          |                                               |
| `GITHUB_ID`                        | GitHub OAuth client ID (legacy)                             | No       | `your-github-client-id`                       |
| `GITHUB_SECRET`                    | GitHub OAuth client secret (legacy)                         | No       | `your-github-secret`                          |
| **Better Auth**                    |                                                             |          |                                               |
| `BETTER_AUTH_SECRET`               | Better Auth secret key                                      | Yes      | `your-better-auth-secret`                     |
| `GITHUB_AUTH_CLIENT_ID`            | GitHub OAuth client ID for Better Auth                      | No       | `your-github-client-id`                       |
| `GITHUB_AUTH_CLIENT_SECRET`        | GitHub OAuth client secret for Better Auth                  | No       | `your-github-secret`                          |

### Web Environment Variables

| Variable               | Description                                      | Required | Example                                    |
| ---------------------- | ------------------------------------------------ | -------- | ------------------------------------------ |
| `CMS_URL`              | CMS backend URL for server-side API calls        | Yes      | `http://localhost:3000`                    |
| `PAYLOAD_BEARER_TOKEN` | Bearer token for authenticating with Payload API | Yes      | `your_secret_bearer_token_here`            |
| `PREVIEW_SECRET`       | Secret token for enabling draft/preview mode     | No       | `your_secret_preview_token_here`           |
| `PLAUSIBLE_DOMAIN`     | Domain for Plausible analytics tracking          | No       | `localhost`                                |
| `PLAUSIBLE_SCRIPT`     | Plausible tracking script URL                    | No       | `http://localhost:8000/js/script.local.js` |

## API Integration

The Astro frontend uses the Payload SDK to interact with the CMS:

```ts
import { sdk } from '@/lib/payload'

const pages = await sdk.find({ collection: 'pages' })
```

See the [Web App Documentation](apps/web/README.md) for detailed usage examples.

## Self-Hosted Services

This project uses self-hosted versions of UseSend and Plausible Analytics, deployed via Dokploy templates on a secondary VPS.

### UseSend (Email Delivery)

[UseSend](https://github.com/usesend/useSend) is a self-hosted transactional email delivery service.

**Production Setup:**

1. Deploy UseSend using the Dokploy template on your VPS
2. Create an API key from your UseSend dashboard
3. Add to `apps/cms/.env`:
   ```bash
   USE_SEND_API_KEY=your_api_key_here
   USE_SEND_URL=https://your-usesend-instance.com
   ```

**Usage:**

UseSend is integrated via the `usesend-js` package and used for sending emails through the CMS.

**Local Development:**

The UseSend Docker image cannot be run locally for development due to a [NextAuth OAuth cookie issue](https://github.com/nextauthjs/next-auth/issues/12117). When running in Docker, the `state cookie` required for OAuth authentication is not properly set, causing GitHub login to fail with "State cookie was missing" errors.

The docker-compose includes only the supporting services (PostgreSQL, Redis, MinIO) for UseSend. To run UseSend locally for development:

1. Clone the [UseSend repository](https://github.com/usesend/useSend)
2. Use the supporting services from this project's docker-compose:
   ```bash
   pnpm docker:run:services
   ```
3. Configure UseSend to connect to:
   - Database: `postgres://usesend:usesend@localhost:5432/usesend` (via usesend_db container)
   - Redis: `redis://localhost:6379` (via usesend_redis container)
   - MinIO: `http://localhost:9002` (via usesend_storage container)
4. Run UseSend locally with `pnpm dev`

### Plausible Analytics

[Plausible Analytics](https://plausible.io/self-hosted-web-analytics) is a self-hosted, privacy-friendly web analytics platform.

**Production Setup:**

1. Deploy Plausible using the Dokploy template on your VPS
2. Add your domain to Plausible dashboard
3. Generate an API key from your Plausible settings
4. Add to `apps/cms/.env`:
   ```bash
   PLAUSIBLE_API_KEY=your_api_key_here
   PLAUSIBLE_API_HOST=https://your-plausible-instance.com
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

**Features:**

- View analytics dashboard in the CMS admin panel
- Real-time visitor tracking
- Privacy-focused (no cookies, GDPR compliant)
- Detailed page view statistics and visitor insights
- Full data ownership and control

**Local Development:**

Plausible runs locally via Docker Compose and is available at [http://localhost:8000](http://localhost:8000).

1. Start the services:

   ```bash
   pnpm docker:run:services
   ```

2. On first run, navigate to `http://localhost:8000` to create your admin account

3. Add a site with domain `localhost` (Plausible domains cannot contain ports)

4. Add the tracking script to your Astro app. Use `script.local.js` to enable tracking on localhost:

   ```html
   <script
   	defer
   	data-domain="localhost"
   	src="http://localhost:8000/js/script.local.js"
   ></script>
   ```

5. For tagged events, combine extensions:
   ```html
   <script
   	defer
   	data-domain="localhost"
   	src="http://localhost:8000/js/script.local.tagged-events.js"
   ></script>
   ```

**Required Environment Variables:**

Add these to your root `.env` file:

```bash
# Generate with: openssl rand -base64 64
SECRET_KEY_BASE=<64-character-secret>
```

**Note:** By default, Plausible ignores `localhost` traffic. The `script.local.js` variant overrides this behavior for local development.

## Quick Start

### Local Development (Recommended)

1. Copy the example environment variables:

   ```bash
   cp apps/cms/.env.example apps/cms/.env
   cp apps/web/.env.example apps/web/.env
   ```

2. Configure required services in `apps/cms/.env`:

   **Email (UseSend):**

   ```bash
   USE_SEND_API_KEY=your_usesend_api_key
   USE_SEND_URL=https://api.usesend.com
   ```

   **Analytics (Plausible):**

   ```bash
   PLAUSIBLE_API_KEY=your_plausible_api_key
   PLAUSIBLE_API_HOST=https://plausible.io
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the database and storage services:

   ```bash
   pnpm docker:run:services
   ```

5. Run database migrations:

   ```bash
   pnpm payload migrate
   ```

6. Start the development servers:

   ```bash
   pnpm dev
   ```

7. Access the applications:
   - Astro frontend: [http://localhost:4321](http://localhost:4321)
   - Payload admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Storybook

Storybook provides an isolated environment for developing and documenting UI components.

**Start Storybook:**

```bash
pnpm storybook
```

Access at [http://localhost:6006](http://localhost:6006)

**Features:**

- Develop components in isolation without running the full app
- Document component variants and props
- Visual testing of component states
- Auto-generated documentation from TypeScript types

## Docker Development

Run the entire stack in Docker containers:

```bash
# Start all services (web + cms + postgres + rustfs)
pnpm docker:dev

# Or start in background
pnpm docker:dev -d

# View logs (both web and cms)
pnpm docker:dev:logs

# Stop all services
pnpm docker:dev:down
```

#### Running Commands Inside Docker

When using Docker development mode, you can run Payload commands inside the container:

```bash
# Generate TypeScript types
pnpm docker:generate:types

# Generate import map
pnpm docker:generate:importmap

# Generate database schema
pnpm docker:generate:db-schema

# Run migrations
pnpm docker:migrate

# Create a new migration
pnpm docker:migrate:create

# Check migration status
pnpm docker:migrate:status

# Run any Payload CLI command
pnpm docker:payload -- --help

# Execute any command in the container
pnpm docker:exec -- sh
```

## Database Sync

Sync your local database with production data via SSH.

### Quick Sync

```bash
# Sync from production (reads from .env)
./scripts/sync-db-from-production.sh

# Preview what would be synced (dry run)
./scripts/sync-db-from-production.sh --dry-run
```

### Restore from Backup

```bash
# Restore from a backup file
./scripts/sync-db-from-production.sh --restore-from ./backups/backup_spon_20231225_120000.sql
```

### How it Works

The script automatically:

1. **Backs up** your local database to `./backups/` (unless `--skip-backup`)
2. **Downloads** production database via SSH OR uses an existing dump file
3. **Drops** local database (with confirmation)
4. **Creates** new local database
5. **Restores** production data

### Configuration

Add these to your `.env` file:

```bash
PRODUCTION_HOST=your-server.com
PRODUCTION_USER=your-ssh-user
PRODUCTION_DB_URL=postgresql://user:pass@host:port/database
```

### Advanced Usage

```bash
# Sync with explicit credentials
./scripts/sync-db-from-production.sh --host 72.60.23.3 --user dave

# Restore without creating a backup (not recommended)
./scripts/sync-db-from-production.sh --skip-backup

# Keep the production dump file after sync
./scripts/sync-db-from-production.sh --keep-dump

# Custom backup directory
./scripts/sync-db-from-production.sh --backup-dir ./my-backups

# Get help
./scripts/sync-db-from-production.sh --help
```

### Requirements

- SSH access to production server
- PostgreSQL client tools installed (`brew install postgresql` on macOS)
- Production database credentials
- Local PostgreSQL running (`pnpm db:up`)

### Backups

- Backups are stored in `./backups/` with timestamps
- Backups are kept indefinitely (manual cleanup required)
- Each sync creates a new backup before dropping the local database
- Use `--restore-from` to restore from any backup

## S3 Asset Sync

Sync production assets from s3.spon.host to your local RustFS container.

### Quick Sync

```bash
# Sync all assets from production
pnpm sync-s3

# Preview what would be synced (dry run)
pnpm sync-s3:dry-run
```

### Advanced Usage

```bash
# Sync specific folder only
./scripts/sync-s3-assets.sh images/2024/

# Sync from custom bucket
./scripts/sync-s3-assets.sh --bucket my-bucket

# Get help
./scripts/sync-s3-assets.sh --help
```

### Requirements

- AWS CLI installed (`brew install awscli` on macOS)
- RustFS container running (`pnpm docker:rustfs`)
- S3 credentials configured in `.env`

### RustFS Console

Access the RustFS admin console at [http://localhost:9001](http://localhost:9001)

**Login Credentials:**

- Access Key: `HUyelGbpv0BDsxojzN1a`
- Secret Key: `Y6jhEA4luG7WTVpmUHtKL2vkBSF9PXDQNnas1qOJ`

## Seeding Dummy Content

Generate fake content for development and testing using the seed CLI tool.

### Quick Start

```bash
# Seed media (downloads images from Picsum Photos)
pnpm seed media --count=5

# Seed pages with nested hierarchy and blocks
pnpm seed pages --count=10

# Seed blog posts
pnpm seed posts --count=5

# Seed all collections in dependency order
pnpm seed all --count=3
```

### Options

| Option      | Description                              | Default |
| ----------- | ---------------------------------------- | ------- |
| `--count=N` | Number of documents to create            | 5       |
| `--clean`   | Delete existing documents before seeding | false   |

### Examples

```bash
# Clean existing pages and create 10 new ones
pnpm seed pages --count=10 --clean

# Seed everything fresh
pnpm seed all --count=5 --clean
```

### What Gets Generated

**Media:**

- Downloads random images from Picsum Photos
- Automatically optimizes to WebP format
- Generates alt text

**Pages:**

- Hierarchical structure (30% chance of being nested under another page)
- Random templates: default, article, listing, contact
- Rich block content: hero, textBlock, imageBlock, relatedBlocks
- Lexical richText with headings, lists, bold/italic, links, blockquotes

**Posts:**

- Blog posts with auto-generated slugs
- Linked to admin user as author

### Requirements

- Database must be running (`pnpm db:up`)
- Admin user `hello@spon.io` must exist
- For pages with images, seed media first: `pnpm seed media`

## Generating Component Stubs

Generate static stub files for Payload blocks to use in web components. The CLI tool reads block definitions, executes their seed generators, and outputs fully inlined TypeScript data that matches the Payload type structure.

### Quick Start

```bash
# Generate a stub for TextBlock
pnpm create-stub --input textBlock --output ../web/src/components/TextBlock

# Generate a stub for Hero block
pnpm create-stub --input hero --output ../web/src/components/Hero

# Generate a stub with a specific variant name
pnpm create-stub --input hero --output ../web/src/components/Hero --variant primary
```

### Options

| Option          | Description                                         | Required |
| --------------- | --------------------------------------------------- | -------- |
| `--input, -i`   | Block name (e.g., `textBlock`) or path to file      | Yes      |
| `--output, -o`  | Output directory for the generated stub file        | Yes      |
| `--variant, -v` | Variant name for the export (defaults to `content`) | No       |

### Examples

```bash
# Using block name (looks in apps/cms/src/blocks/)
pnpm create-stub --input textBlock --output ../web/src/components/TextBlock

# Using full path
pnpm create-stub --input ./src/blocks/hero/index.ts --output ../web/src/components/Hero

# Short flags
pnpm create-stub -i imageBlock -o ../web/src/components/ImageBlock

# Generate multiple variants for the same block
pnpm create-stub -i hero -o ../web/src/components/Hero -v primary
pnpm create-stub -i hero -o ../web/src/components/Hero -v secondary
pnpm create-stub -i hero -o ../web/src/components/Hero -v tertiary
```

### Output

The tool generates a `.stub.ts` file with static, inlined data. The export name matches the variant argument (or defaults to `content`):

```typescript
import type { Hero } from '@spon/payload-types'

export const primary: Hero = {
	blockType: 'hero',
	variant: 'primary',
	title: 'Example Title',
	// ... fully generated content
}

export const secondary: Hero = {
	blockType: 'hero',
	variant: 'secondary',
	title: 'Another Title',
	// ... fully generated content
}
```

### Appending to Existing Files

When the stub file already exists, the CLI will:

- **Append** new exports if the variant name doesn't exist
- **Replace** existing exports if the variant name already exists
- **Merge** type imports automatically

This allows you to build up multiple variants in a single stub file by running the command multiple times with different `--variant` values.

### How It Works

1. Reads the Payload block definition from `apps/cms/src/blocks/`
2. If a seed file exists (e.g., `seed.textBlock.ts`), executes the generator to produce faker data
3. Serializes the data as a static TypeScript object
4. If the stub file exists, merges the new export; otherwise creates a new file
5. Uses the `--variant` value as the export name (defaults to `content`)

### Available Blocks

| Block Name   | Folder       | Has Seed Generator |
| ------------ | ------------ | ------------------ |
| `hero`       | `hero`       | Yes                |
| `textBlock`  | `textBlock`  | Yes                |
| `imageBlock` | `imageBlock` | Yes                |
| `related`    | `related`    | Yes                |
| `formBlock`  | `formBlock`  | No                 |
| `group`      | `group`      | No                 |

## Database Migrations

This project uses Payload CMS migrations to manage database schema changes. Auto-push is **disabled** (`push: false`) to ensure all schema changes go through migrations.

### Workflow

**Local Development:**

1. Make schema changes to your collections/globals
2. Generate a migration:
   ```bash
   pnpm payload migrate:create
   ```
3. Run the migration:
   ```bash
   pnpm payload migrate
   ```

**Docker Development:**

1. Make schema changes to your collections/globals
2. Generate a migration:
   ```bash
   pnpm docker:migrate:create
   ```
3. Run the migration:
   ```bash
   pnpm docker:migrate
   ```

### Important Notes

- Never run Payload with auto-push enabled in this project
- Always generate and run migrations for schema changes
- Migration files are located in `apps/cms/src/migrations/`
- The `payload_migrations` table tracks applied migrations

### Migration Commands

**Local:**

- `pnpm payload migrate:create` - Generate a new migration from schema changes
- `pnpm payload migrate` - Run pending migrations
- `pnpm payload migrate:status` - Check migration status

**Docker:**

- `pnpm docker:migrate:create` - Generate a new migration from schema changes
- `pnpm docker:migrate` - Run pending migrations
- `pnpm docker:migrate:status` - Check migration status

## Docker Commands

### Development Services

**Full Stack:**

- `pnpm docker:dev` - Start all services with logs
- `pnpm docker:dev:build` - Rebuild and start all services
- `pnpm docker:dev:down` - Stop all services
- `pnpm docker:dev:logs` - Follow web and CMS logs

**Individual Services:**

- `pnpm docker:web` - Start Astro web app in background
- `pnpm docker:web:down` - Stop web app
- `pnpm docker:web:logs` - Follow web app logs
- `pnpm docker:cms` - Start CMS in background
- `pnpm docker:cms:down` - Stop CMS
- `pnpm docker:cms:logs` - Follow CMS logs
- `pnpm docker:postgres` - Start postgres in background
- `pnpm docker:postgres:down` - Stop postgres
- `pnpm docker:rustfs` - Start rustfs in background
- `pnpm docker:rustfs:down` - Stop rustfs

**Container Commands:**

- `pnpm docker:exec` - Execute any command in CMS container
- `pnpm docker:generate:types` - Generate TypeScript types
- `pnpm docker:generate:importmap` - Generate import map
- `pnpm docker:generate:db-schema` - Generate database schema
- `pnpm docker:payload` - Run Payload CLI commands
- `pnpm docker:migrate` - Run pending migrations
- `pnpm docker:migrate:create` - Create a new migration
- `pnpm docker:migrate:status` - Check migration status

### Production Build

The project uses a unified build script (`scripts/build-docker-app.sh`) that handles building Docker images for both CMS and web apps with dynamic configuration.

**Build CMS:**

```bash
# 1. Start required services (postgres + rustfs)
pnpm docker:run:services

# 2. Build CMS production Docker image
pnpm docker:build

# 3. Run the built image (loads environment variables from apps/cms/.env)
pnpm docker:run

# 4. Stop services when done
pnpm docker:run:services:down
```

**Build Web App:**

```bash
# Build web app production Docker image
pnpm docker:build:web

# Run the built image
pnpm docker:run:web
```

**Direct script usage:**

```bash
# Build CMS
./scripts/build-docker-app.sh cms

# Build web app
./scripts/build-docker-app.sh web

# Customize build with environment variables
IMAGE_NAME=myapp IMAGE_TAG=v1.0.0 ./scripts/build-docker-app.sh cms
```

**How it works:**

- **CMS Build**: Only `NEXT_PUBLIC_FRONTEND_URL` is embedded in the client bundle
- **Web Build**: Only `CMS_URL` is passed as a build argument
- **Runtime**: All secrets are loaded from respective `.env` files via `--env-file`
- **Migrations**: Run automatically via `prodMigrations` in payload.config.ts (CMS only)
- **No secrets in image layers** - clean and secure!
- **Unified script**: Single `build-docker-app.sh` handles both apps with dynamic configuration

**GitHub Actions:**

The CI/CD workflow builds a generic image that can be deployed anywhere:

- Only embeds public `NEXT_PUBLIC_FRONTEND_URL` at build time
- Pushes to GitHub Container Registry (ghcr.io)
- Tags with branch name, SHA, and `latest`

Setup:

1. Go to your repository Settings → Secrets and variables → Actions
2. Add: `NEXT_PUBLIC_FRONTEND_URL` - Your production frontend URL
3. In your deployment platform, create an `.env` file or configure environment variables with all runtime secrets (DATABASE_URL, API keys, etc.)

**Cleanup:**

- `pnpm docker:clean` - Stop all services, remove volumes, and clean Docker system

## Deployment

This project is deployed using [Dokploy](https://dokploy.com/) across two self-hosted VPS instances.

### Infrastructure Architecture

**Main VPS:**

- CMS (Payload) + PostgreSQL database
- Web (Astro frontend)
- Dokploy UI

**Secondary VPS:**

- Plausible Analytics (Dokploy template)
- UseSend (Dokploy template)
- RustFS (Dokploy template)

### Deployment Features

- Multi-stage Docker builds for optimized images
- GitHub Actions CI/CD pipeline
- Environment variable support for all configurations
- Health checks and graceful shutdowns
- Automatic migrations on deployment via `prodMigrations` in [payload.config.ts](apps/cms/src/payload.config.ts)

### Dokploy Templates Used

The following services are deployed using Dokploy's built-in templates:

- **Plausible Analytics** - Privacy-friendly analytics
- **UseSend** - Transactional email delivery
- **RustFS** - S3-compatible object storage

### Alternative Deployment

The built Docker images can also be deployed to other platforms:

- Cloud Run
- Kubernetes
- AWS ECS
- Docker Swarm
- Any container orchestration platform

## Questions

For issues or questions, reach out on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
