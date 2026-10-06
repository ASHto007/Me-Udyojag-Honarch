# Node.js 20 LTS Alpine base
FROM node:20-alpine AS base
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts

# Copy application source
COPY src ./src

# Non-root security user
USER node

# Expose API port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

# Start production server
CMD ["node", "src/server.js"]
