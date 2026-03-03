# 1. Use the official Node.js image as the "Kitchen"
ARG NODE_VERSION=24.13.0-slim
# ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS base

# 2. Set the working directory
WORKDIR /app

# 3. Install dependencies first (so layer can be cached)
COPY package.json package-lock.json* pnpm-lock.yaml* .npmrc* ./

# 3a. Use pnpm for faster installs and better caching

# 4. Build
FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# 5. Final image 
FROM node:${NODE_VERSION} AS runner

# Set working directory
WORKDIR /app

# Copy standalone build output 
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# NOTE:
# We intentionally DO NOT run `npm run build` at image build time.
# Instead we build on container start so NEXT_PUBLIC_* environment variables
# provided at runtime (via docker-compose env_file / environment) are used
# when Next builds client assets.

# 6. Expose the port (Next.js defaults to 3000)
EXPOSE 3000

# 7. Build at container start (so runtime envs are available) then start
# CMD ["sh", "-lc", "npm run build && npm start"]
CMD ["node", "server.js"]