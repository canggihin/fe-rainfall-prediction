# Use the official Node.js 18 image as a parent image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN yarn build

EXPOSE 3030
# Command to run your app using Vite preview
CMD ["yarn", "start"]
