FROM node:lts-alpine AS BASE

# Update packages
RUN apk update && \
apk upgrade --available && sync

# Create app directory
WORKDIR /app

# Install Node App dependencies
COPY package.json index.js ./
RUN npm install

CMD ["node", "index.js"]
