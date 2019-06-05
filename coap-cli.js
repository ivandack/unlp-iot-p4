const commander = require('commander');
const coap = require('./coap-lib');
const utils = require('./utils');
const colors = require('colors/safe');

commander
  .version('1.0.0');

// GET
commander
  .command('get <host> [path]')
  .description('ejecuta el método GET en el path indicado')
  .option('-p, --port <number>', 'Puerto del servidor CoAP', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action((host, path, options) => {
    path = path || '/';
    const port = options.port;
    path = path.startsWith('/') ? path : '/' + path;
    if (options.verbose) console.log(`Host destino: "coap://${host}:${port}${path}"`);
    coap.sendReq(host, port, path, 'get', options.verbose);
  });

// POST
commander
  .command('post <host> [path]')
  .description('ejecuta el método POST en el path indicado')
  .option('-b, --body <payload>', 'El payload a enviar', '')
  .option('-p, --port <number>', 'Puerto del servidor CoAP', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action((host, path, options) => {
    path = path || '/';
    const port = options.port;
    path = path.startsWith('/') ? path : '/' + path;
    if (options.verbose) console.log(`Host destino: "coap://${host}:${port}${path}"`);
    coap.sendReq(host, port, path, 'post', options.verbose);
  });

// Comando erroneo
commander
  .command('*')
  .action((cmd) => {
    console.error(colors.red(`El comando ${cmd} no es válido.`));
    commander.help();
  });

if (process.argv.length === 2) commander.help();
commander.parse(process.argv);