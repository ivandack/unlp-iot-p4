# unlp-iot-p4
Cliente CoAP para motas Z1 de la práctica 4 de IoT

## Usando Node.js
Para instalar Node.js se recomienda usar [Node Version Manager](https://github.com/nvm-sh/nvm)

Teniendo Node.js (8+) instalado en el sistema: 

```
git clone git@github.com:ivandack/unlp-iot-p4.git coap-cli
cd coap-cli
npm install --production
```

Las formas para ejecutar el cliente son:

```
node coap-cli.js --help
node coap-cli.js get localhost /url/path -v
node coap-cli.js post ::1 /url/path -b body -p 8080
```

## Usando Docker
Teniendo instalado Docker solo hay que ejecutar (No pude hacer funcionar esto en InstantContiki):

```
docker run --rm ivandack/coap-cli --help
docker run --rm ivandack/coap-cli get localhost /url/path -v
docker run --rm ivandack/coap-cli post ::1 /url/path body -p 8080
```