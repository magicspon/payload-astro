# Dockerfile for Astro SSR app
# Adapted for pnpm monorepo with apps/web structure

FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy workspace configuration files
COPY pnpm-lock.yaml package.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy all package.json files for proper dependency resolution
COPY apps/web/package.json ./apps/web/
COPY packages/payload-types/package.json ./packages/payload-types/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build the source code
FROM base AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy workspace files and installed dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages ./packages

# Copy workspace configuration
COPY pnpm-lock.yaml package.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy all source code
COPY apps/web ./apps/web
COPY packages/payload-types ./packages/payload-types
COPY packages/tailwind-config ./packages/tailwind-config
COPY packages/typescript-config ./packages/typescript-config
COPY packages/ui ./packages/ui
COPY packages/utils ./packages/utils

# Build the Astro app
RUN pnpm run build --filter=@spon/web

# Create production deployment with pnpm deploy
RUN pnpm --filter=@spon/web --prod deploy /tmp/deploy

# Production image
FROM base AS runtime

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

WORKDIR /app

# Copy the deployed app from builder (includes prod deps and workspace packages)
COPY --from=builder --chown=astro:nodejs /tmp/deploy ./

# Copy built application
COPY --from=builder --chown=astro:nodejs /app/apps/web/dist ./dist

USER astro

EXPOSE 4321

ENV HOST=0.0.0.0
ENV PORT=4321

CMD ["node", "./dist/server/entry.mjs"]
