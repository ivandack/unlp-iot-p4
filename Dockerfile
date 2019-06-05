FROM node:carbon-alpine

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
COPY . ./

ENTRYPOINT [ "node", "coap-cli.js" ]