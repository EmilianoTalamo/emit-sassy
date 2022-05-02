FROM debian:bullseye-slim

WORKDIR /sass
COPY . .

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install dependencies
RUN apt-get update -y \
	&& apt-get install -y -q libnotify-bin curl git python3 build-essential

# Install NVM (Node Version Manager)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN source ~/.bashrc && nvm install 14 && npm i --global gulp-cli

# Execution, modify as you please
ENTRYPOINT source ~/.bashrc \
	&& rm -rf node_modules package-lock.json \
	&& npm i && npm run prod
	# && npm i && npm run dev
