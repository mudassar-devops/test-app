# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy application code
COPY . .

# Build Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public 2>/dev/null || true

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
