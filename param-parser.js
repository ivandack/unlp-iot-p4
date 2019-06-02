const commander = require('commander');

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

function main() {
  commander
      .usage('[OPTIONS]...')
      .option('-d, --dest <string>', 'URL o IP (IPv4 o IPV6) del host destino')
      .option('-p, --port <number>', 'Puerto del servidor CoAP (por defecto 5683)', parsePort, 5683)
      .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
      .parse(process.argv);

  if (!commander.dest) exitWithError(`No se especificó el host destino.`);

  const params = {
    host: commander.dest,
    port: commander.port,
    verbose: commander.verbose,
  };
  return params;
}
module.exports = main();