# unlp-iot-p4

Cliente CoAP para motas Z1 de la práctica 4 de IoT

## Requerimientos

* Para ejecutar el cliente usando Node.js, se debe la versión 8+. Se recomienda instalar usando [Node Version Manager](https://github.com/nvm-sh/nvm)
* Para ejecutar el cliente usando Docker, se recomienda tener la versión *18.x.x* o más nueva.

## Para usar el cliente (Entrega CoAP)

### Usando Node.js

```bash
git clone git@github.com:ivandack/unlp-iot-p4.git coap-cli
cd coap-cli
npm install --production
```

Las formas para ejecutar el cliente son:

```bash
node coap-cli.js --help
node coap-cli.js get localhost /url/path -v
node coap-cli.js post ::1 /url/path -b body -p 8080
```

### Usando Docker
Teniendo instalado Docker solo hay que ejecutar (No pude hacer funcionar esto en InstantContiki):

```bash
docker run --rm --network=host ivandack/coap-cli --help
docker run --rm --network=host ivandack/coap-cli get localhost /url/path -v
docker run --rm --network=host ivandack/coap-cli post ::1 /url/path body -p 8080
```

## Para usar el data loader (Entrega InfluxDB/Grafana)

### Usando Node.js

```bash
git clone git@github.com:ivandack/unlp-iot-p4.git coap-cli
cd coap-cli
npm install --production
```

Las formas para ejecutar el cliente son:

```bash
node src/data-loader --help
node src/data-loader -t <host de InfluxDB> -d <database> -m <ip de la mota>
node src/data-loader -t localhost -d grupo_ivandack -m fd00::c30c:0:0:2
```

### Usando Docker

Teniendo instalado Docker solo hay que ejecutar (No pude hacer funcionar esto en InstantContiki):

```bash
docker run --rm --network=host ivandack/coap-cli data-loader --help
docker run --rm --network=host ivandack/coap-cli data-loader -t <host de InfluxDB> -d <database> -m <ip de la mota>
```

Por ejemplo:

```bash
docker run --rm --network=host ivandack/coap-cli data-loader -t localhost -d grupo_ivandack -m fd00::c30c:0:0:2
```
