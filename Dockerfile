# Use a base image with Node.js and npm pre-installed
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json /app/

# Install the dependencies
RUN npm ci

# Copy the entire project to the container
COPY . /app

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js listens on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]