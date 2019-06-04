const commander = require('commander');
const utils = require('./utils');


function parseCommon(c) {
  c
      .option('-p, --port <number>', 'Puerto del servidor CoAP (por defecto 5683)', utils.parsePort, 5683)
      .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0);
  return c;
}

function finishParse(c) {
  c.parse(process.argv);

  if (!c.dest) utils.exitWithError(`No se especificó el host destino.`);

  const params = {
    host: c.host,
    port: c.port,
    path: c.path,
    verbose: c.verbose,
  };
  return params;
}

function parseMain() {
  commander.usage('<cmd> [OPTIONS]...')
      .command('get <host> <path>', 'ejecuta un método GET')
      .command('post', 'ejecuta un método POST')
      .parse(process.argv);
      console.log(commander);
}

function parseGet() {
  const c = commander.usage('[OPTIONS]...');
  parseCommon(c);
  return finishParse(c);
}

module.exports = {
  parseMain: parseMain,
  parseGet: parseGet,
};
