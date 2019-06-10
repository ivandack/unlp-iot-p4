const coap = require('coap');
const server = coap.createServer({ type: 'udp6' });

server.on('request', function(req, res) {
  res.end(`Method: ${req.method}\nURL: ${req.url}\nBody: ${req.payload}`);
});

// the default CoAP port is 5683
server.listen(() => {
  console.log('Escuchando con el servidor de pruebas...');
});