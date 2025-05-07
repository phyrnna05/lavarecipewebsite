# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Expose the default Vite dev server port
EXPOSE 5173

# Set environment variable to allow Vite dev server to work in Docker
ENV HOST=0.0.0.0

# Run the dev server
CMD ["npm", "run", "dev"]
