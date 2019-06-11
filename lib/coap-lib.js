const colors = require('colors/safe');
const coap = require('coap');
const utils = require('./utils');

function getStatusCode(res) {
  return parseInt(res.code.replace('.', ''));
}

function getLogger(verbose) {
  if (verbose) {
    return (str) => console.log(colors.green(str));
  } else {
    return console.log;
  }
}

function sendReq(host, port, path, method, verbose = false, body) {
  const responseLogger = getLogger(verbose);
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
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      if (verbose) console.log(`Resultado exitoso\nRespuesta:`);
      responseLogger(body);
    });
  });
  req.end(body);
}

module.exports = {
  sendReq: sendReq,
};
