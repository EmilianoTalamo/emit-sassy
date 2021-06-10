FROM node:14

# Container dependencies
RUN apt-get update -y
RUN apt-get install libnotify-bin -y

# Get default directory
WORKDIR /var/www

COPY ./package*.json ./

COPY * ./

# Remove current node_modules folder
RUN rm -rf node_modules

# Install NodeJS dependencies
RUN npm i
RUN npm install --global gulp-cli