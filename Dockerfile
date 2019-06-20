FROM node:carbon-alpine

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
COPY . ./
WORKDIR /app/src

ENTRYPOINT [ "node" ]
CMD [ "coap-cli" ]
