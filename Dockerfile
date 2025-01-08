
FROM node:18-alpine
WORKDIR /app
# Copy package.json and package-lock.json to cache the dependencies
COPY package.json package-lock.json ./
#Install openssl to fix prisma errors on EC2 instance
RUN apk add --no-cache openssl \
    && npm install
 
# Copy the rest of the application
COPY . .

EXPOSE 3000

