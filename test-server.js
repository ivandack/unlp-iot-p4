const coap = require('coap');
const commander = require('commander');
const server = coap.createServer({ type: 'udp6' });

commander
  .version('1.0.0');

// GET
commander
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0);
commander.parse(process.argv);

server.on('request', function(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    if (commander.verbose) {
      res.write(`Method: ${req.method}\n`);
      res.write(`URL: ${req.url}\n`);
      if (req.method) res.write(`Body: `);
    }
    res.end(body);
  });
});

// the default CoAP port is 5683
server.listen(() => {
  if (commander.verbose) console.log('Escuchando con el servidor de pruebas...');
});
