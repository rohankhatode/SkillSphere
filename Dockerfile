FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source
COPY server/ .

# Expose port (adjust if your server uses a different port)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

