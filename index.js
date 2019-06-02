const commander = require('commander');
const coap = require('coap');

function exitWithError(message, code = -1) {
  console.error(`Error: ${message}`);
  process.exit(code);
}

function parseIntParam(value) {
  const result = parseInt(value);
  if (value.match(/[^0-9]/g) || isNaN(result)) {
    exitWithError(`El valor "${value}" no es un número entero.`);
  }
  return result;
}

function parsePort(value) {
  const result = parseIntParam(value);
  if (result < 1 || result > 65535) {
    exitWithError(`El valor "${result}" no es un puerto. Está fuera de rango.`);
  }
  return result;
}

commander
  .usage('[OPTIONS]...')
  .option('-h, --host <string>', 'URL o IP (IPv4 o IPV6) del host destino')
  .option('-p, --port <number>', 'Puerto del servidor CoAP (por defecto 5683)', parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa',  () => 1, 0)
  .option('-c, --crocodile', 'Use crocodile instead of alligator')
  .option('-n, --name <name>', 'Your name', 'human')
  .parse(process.argv);

if (!commander.host) exitWithError(`No se especificó el host destino.`);

const coapUrl = `coap://${commander.host}:${commander.port}`;
if (commander.verbose) console.log(`Host destino: ${coapUrl}`);

const req = coap.request(coapUrl);

req.on('response', function(res) {
  res.pipe(process.stdout);
  res.on('end', function() {
    process.exit(0);
  });
});
req.end();
