FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install Python and requests
RUN apt-get update || : && apt-get install python3 python3-pip curl -y
RUN pip3 install requests

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]