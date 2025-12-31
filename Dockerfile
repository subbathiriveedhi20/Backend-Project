## Node Environment
FROM node:18

## Application path
WORKDIR /usr/src

## Copy package.json
COPY package*.json ./

## Install dependencies
RUN npm install

## Copy the rest of the code
COPY . .

# Expose the port number
EXPOSE 5000

## Start the backend
CMD ["node", "server.js"]


