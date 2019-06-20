const commander = require('commander');
const coap = require('./lib/coap-lib');
const utils = require('./lib/utils');
const logger = require('./lib/logger');

commander.version('1.0.0');

commander
  .command('discover <host>')
  .option('-p, --port <number>', 'Puerto del servidor CoAP', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action((host, options) => {
    const { port } = options;
    coap
      .discover(host, port)
      .then(logger.info)
      .catch(utils.exitWithError);
  });

// GET
commander
  .command('get <host> [path]')
  .description('ejecuta el método GET en el path indicado')
  .option('-p, --port <number>', 'Puerto del servidor CoAP', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action((host, path = '/', options) => {
    const { port } = options;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    logger.debug(`Host destino: "coap://${host}:${port}${normalizedPath}"`);
    coap
      .get(host, port, normalizedPath)
      .then(logger.info)
      .catch(utils.exitWithError);
  });

// POST
commander
  .command('post <host> [path]')
  .description('ejecuta el método POST en el path indicado')
  .option('-b, --body <payload>', 'El payload a enviar', '')
  .option('-p, --port <number>', 'Puerto del servidor CoAP', utils.parsePort, 5683)
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
  .action((host, path = '/', options) => {
    const { port, body } = options;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    logger.debug(`Host destino: "coap://${host}:${port}${normalizedPath}"`);
    coap
      .post(host, port, normalizedPath, body)
      .then(logger.info)
      .catch(utils.exitWithError);
  });

// Comando erroneo
commander.command('*').action((cmd) => {
  logger.error(`El comando ${cmd} no es válido.`);
  commander.help();
});

if (process.argv.length === 2) commander.help();
commander.parse(process.argv);
logger.setVerbose(commander.verbose);
