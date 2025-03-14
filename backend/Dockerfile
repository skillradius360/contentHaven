# Use Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose port 5000 (or the port your app uses)
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "dev"]
