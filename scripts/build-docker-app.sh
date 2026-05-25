#!/bin/bash

# Docker Build Script for Apps
# Builds production Docker images for apps in the monorepo
# Usage: ./scripts/build-docker-app.sh <app-dir> [options]
# Example: ./scripts/build-docker-app.sh cms
# Example: ./scripts/build-docker-app.sh web

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Check if app directory argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: App directory argument required${NC}"
    echo -e "${YELLOW}Usage: $0 <app-dir>${NC}"
    echo -e "${YELLOW}Example: $0 cms${NC}"
    echo -e "${YELLOW}Example: $0 web${NC}"
    exit 1
fi

APP_DIR="$1"
APP_PATH="$PROJECT_ROOT/apps/$APP_DIR"
ENV_FILE="$APP_PATH/.env"
DOCKERFILE="$APP_PATH/Dockerfile"

# Validate app directory exists
if [ ! -d "$APP_PATH" ]; then
    echo -e "${RED}Error: App directory not found: $APP_PATH${NC}"
    exit 1
fi

# Validate Dockerfile exists
if [ ! -f "$DOCKERFILE" ]; then
    echo -e "${RED}Error: Dockerfile not found: $DOCKERFILE${NC}"
    exit 1
fi

echo -e "${GREEN}Building production Docker image for apps/$APP_DIR...${NC}"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Error: .env file not found at $ENV_FILE${NC}"
    echo -e "${YELLOW}Please create apps/$APP_DIR/.env file first${NC}"
    exit 1
fi

# Load environment variables from .env file
echo -e "${YELLOW}Loading configuration from $ENV_FILE${NC}"
export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)

# App-specific configurations
case "$APP_DIR" in
    "cms")
        DEFAULT_IMAGE_NAME="spon-payload"
        DEFAULT_PORT="3000"
        BUILD_ARG_NAME="NEXT_PUBLIC_FRONTEND_URL"
        BUILD_ARG_VALUE="${NEXT_PUBLIC_FRONTEND_URL:-$CMS_URL}"
        CLEANUP_DIR=".next"
        ;;
    "web")
        DEFAULT_IMAGE_NAME="spon-web"
        DEFAULT_PORT="4321"
        BUILD_ARG_NAME="CMS_URL"
        BUILD_ARG_VALUE="${CMS_URL}"
        CLEANUP_DIR="dist"
        ;;
    *)
        echo -e "${RED}Error: Unknown app directory: $APP_DIR${NC}"
        echo -e "${YELLOW}Supported apps: cms, web${NC}"
        exit 1
        ;;
esac

# Default image name and tag (can be overridden by env vars)
IMAGE_NAME="${IMAGE_NAME:-$DEFAULT_IMAGE_NAME}"
IMAGE_TAG="${IMAGE_TAG:-latest}"

echo -e "${GREEN}Building image: $IMAGE_NAME:$IMAGE_TAG${NC}"
echo -e "${YELLOW}Build argument: $BUILD_ARG_NAME=$BUILD_ARG_VALUE${NC}"

# Clean up build artifacts before building
if [ -n "$CLEANUP_DIR" ] && [ -d "$APP_PATH/$CLEANUP_DIR" ]; then
    echo -e "${YELLOW}Cleaning up $CLEANUP_DIR folder...${NC}"
    rm -rf "$APP_PATH/$CLEANUP_DIR"
fi

# Build the Docker image
# Note: Only public/build-time variables are passed as build args
docker build \
  --build-arg "$BUILD_ARG_NAME=$BUILD_ARG_VALUE" \
  -t "$IMAGE_NAME:$IMAGE_TAG" \
  -f "$DOCKERFILE" \
  "$PROJECT_ROOT"

echo -e "${GREEN}✓ Build completed successfully!${NC}"
echo -e "${GREEN}Image: $IMAGE_NAME:$IMAGE_TAG${NC}"
echo ""
echo -e "${YELLOW}To run the container:${NC}"

# App-specific run instructions
case "$APP_DIR" in
    "cms")
        echo -e "  pnpm docker:run"
        echo -e "  # OR"
        echo -e "  docker run -p 3000:3000 --env-file apps/$APP_DIR/.env \\"
        echo -e "    -e DATABASE_URL=postgres://postgres:postgres@host.docker.internal:35435/spon \\"
        echo -e "    -e S3_ENDPOINT=http://host.docker.internal:9000 \\"
        echo -e "    --add-host=host.docker.internal:host-gateway \\"
        echo -e "    --name spon-payload-app --rm $IMAGE_NAME:$IMAGE_TAG"
        ;;
    "web")
        echo -e "  pnpm docker:run:web"
        echo -e "  # OR"
        echo -e "  docker run -p 4321:3000 --env-file apps/$APP_DIR/.env \\"
        echo -e "    --add-host=host.docker.internal:host-gateway \\"
        echo -e "    --name spon-web-app --rm $IMAGE_NAME:$IMAGE_TAG"
        ;;
esac

echo ""
echo -e "${YELLOW}To customize the build:${NC}"
echo -e "  IMAGE_NAME=myapp IMAGE_TAG=v1.0.0 $0 $APP_DIR"
