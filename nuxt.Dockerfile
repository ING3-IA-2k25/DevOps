FROM node:20.18.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json . 
RUN npm install && npm cache clean --force

# Copy app source code
COPY . .
COPY .env.docker .env

# Build app
RUN npm run build

# Expose port and start application
EXPOSE 3000


