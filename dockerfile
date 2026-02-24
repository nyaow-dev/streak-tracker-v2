# 1. Use the official Node.js image as the "Kitchen"
FROM node:20-alpine AS base

# 2. Set the working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your code
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Expose the port (Next.js defaults to 3000)
EXPOSE 3000

# 7. Start the app
CMD ["npm", "start"]