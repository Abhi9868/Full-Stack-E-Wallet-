# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (except those in .dockerignore)
COPY . .

# Expose the app port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]