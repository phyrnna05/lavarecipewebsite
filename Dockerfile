# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Expose port 8080 instead of 5173
EXPOSE 8080

# Set environment variable to allow Vite dev server to work in Docker
ENV HOST=0.0.0.0
ENV VITE_PORT=8080

# Run the dev server
CMD ["npm", "run", "dev"]
