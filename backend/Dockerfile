# Multi-stage production Dockerfile for Mi Udyojak Honarach Backend
FROM node:20-alpine AS base

# Install curl/wget for health checks if needed (Alpine includes wget)
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies only with cache mounting
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts

# Copy application source code and assets
COPY src ./src

# Switch to standard unprivileged user for container security
USER node

# Expose HTTP port
EXPOSE 5000

# Container healthcheck using liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health/live || exit 1

# Graceful termination signal
STOPSIGNAL SIGTERM

# Start production server
CMD ["node", "src/server.js"]
