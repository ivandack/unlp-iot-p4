const fs = require('fs');
const coap = require('coap');
const utils = require('./utils');

function getStatusCode(res) {
  return parseInt(res.code.replace('.', ''));
}

function sendReq(host, port, path, method, verbose = false) {
  const reqParams = {
    hostname: host,
    port: port,
    method: method,
    pathname: path
  };
  const req = coap.request(reqParams);
  if (verbose) console.log(`Enviando request ${method.toUpperCase()} a coap://${host}:${port}${path}`);

  req.on('response', (res) => {
    if (getStatusCode(res) === 404) {
      utils.exitWithError('No se encontró el método especificado');
    }
    if (verbose) console.log(`Resultado exitoso\nRespuesta:`);
    res.pipe(process.stdout);
    res.on('end', () => {
      console.log();
    });
  });
  req.end();
}

module.exports = {
  sendReq: sendReq,
};
