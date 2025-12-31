# Node js version
FROM node:20-alpine

# working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
