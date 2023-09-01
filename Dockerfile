# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

