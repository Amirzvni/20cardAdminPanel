# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React project
RUN npm run build

# Expose the desired port (e.g., 3000) for the React application
EXPOSE 3000

# Define the command to start the React application
CMD ["npm", "start"]
