# unlp-iot-p4
Cliente CoAP para motas Z1 de la práctica 4 de IoT

# Para usar el data loader (Entrega InfluxDB/Grafana)

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
node src/data-loader --help
node src/data-loader -t <host de InfluxDB> -d <database> -m <ip de la mota>
node src/data-loader -t localhost -d grupo_ivandack -m fd00::c30c:0:0:2
```

## Usando Docker
Teniendo instalado Docker solo hay que ejecutar (No pude hacer funcionar esto en InstantContiki):

```
docker run --rm ivandack/coap-cli data-loader --help
docker run --rm ivandack/coap-cli data-loader -t <host de InfluxDB> -d <database> -m <ip de la mota>
```

Por ejemplo:

```
docker run --rm ivandack/coap-cli data-loader -t localhost -d grupo_ivandack -m fd00::c30c:0:0:2
```
