
FROM node:18-alpine
WORKDIR /app
# Copy package.json and package-lock.json to cache the dependencies (dependencies doesn't change often)
COPY package.json package-lock.json ./

RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

