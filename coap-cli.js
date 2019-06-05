const commander = require('commander');
const coap = require('./coap-lib');
const utils = require('./utils');

commander
  .command('get <host> <path>')
  .description('ejecuta el método GET en el path indicado')
  .option('-p, --port <number>', 'Puerto del servidor CoAP (por defecto 5683)', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action(function (host, path, options) {
    const port = options.port;
    path = path.startsWith('/') ? path : '/' + path;
    if (options.verbose) console.log(`Host destino: "coap://${host}:${port}${path}"`);
    coap.sendReq(host, port, path, 'get', options.verbose);
  });

commander.parse(process.argv);