#node version
FROM node:20.0.0-alpine3.17

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port running the app
EXPOSE 3000

# Build the application
RUN npm run build


# command Start the app
CMD ["npm", "run", "start"]    