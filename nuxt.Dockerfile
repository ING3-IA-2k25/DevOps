FROM node:20.17.0-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json . 
RUN npm install && npm cache clean --force

# Copy app source code
COPY . .

# Build app
RUN npm run build

# Expose port and start application
EXPOSE 3000

# run the build project with node
#CMD ["npm", "run", "start"]
ENTRYPOINT ["node", ".output/server/index.mjs"]


