FROM mongo

# Create app directory
WORKDIR /app

# Copy app source code
COPY ./content /data/db

# Expose port and start application
EXPOSE 27017

