FROM node:14

# Container dependencies
RUN apt-get update -y
RUN apt-get install libnotify-bin -y

# Get default directory
WORKDIR /var/www

# Remove current node_modules folder
RUN rm -rf node_modules

COPY ./package*.json ./

COPY * ./

# Install NodeJS dependencies
RUN npm i
RUN npm install --global gulp-cli