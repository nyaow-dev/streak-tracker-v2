# 1. Use the official Node.js image as the "Kitchen"
FROM node:20-alpine AS base

# 2. Set the working directory
WORKDIR /app

# 3. Install dependencies first (so layer can be cached)
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your code (do NOT bake NEXT_PUBLIC_ values at build time)
COPY . .

# NOTE:
# We intentionally DO NOT run `npm run build` at image build time.
# Instead we build on container start so NEXT_PUBLIC_* environment variables
# provided at runtime (via docker-compose env_file / environment) are used
# when Next builds client assets.

# 6. Expose the port (Next.js defaults to 3000)
EXPOSE 3000

# 7. Build at container start (so runtime envs are available) then start
CMD ["sh", "-lc", "npm run build && npm start"]