# Dockerfile
# Adapted from https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# Modified for pnpm monorepo with apps/cms structure

FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy workspace configuration files
COPY pnpm-lock.yaml package.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy workspace package.json files for proper dependency resolution
COPY apps/cms/package.json ./apps/cms/
COPY packages/email/package.json ./packages/email/
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/payload-types/package.json ./packages/payload-types/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages

# Copy all source code
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Build using turbo (builds apps/cms)
# Note: Server-side environment variables are loaded from .env at runtime
ENV SKIP_ENV_VALIDATION=true
RUN pnpm run build --filter=@spon/cms

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets from apps/cms
COPY --from=builder /app/apps/cms/public ./apps/cms/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static

# Copy migration files (migrations run automatically via prodMigrations)
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/src/migrations ./apps/cms/src/migrations

# Copy entrypoint script
COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run migrations and start server
ENTRYPOINT ["docker-entrypoint.sh"]
