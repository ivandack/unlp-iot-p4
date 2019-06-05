const coap = require('coap');
const utils = require('./utils');

function sendReq(host, port, path, method, verbose = false) {
  const reqParams = {
    hostname: host,
    port: port,
    method: method,
    pathname: path
  };
  const req = coap.request(reqParams);
  if (verbose) console.log(`Enviando request ${method.toUpperCase()} a coap://${host}:${port}${path}`);
  
  req.on('response', function(res) {
    if (res.status === 404) {
      utils.exitWithError('No se encontró el método especificado');
    }
    if (verbose) console.log(`Resultado exitoso\nRespuesta:`);
    console.log(res.body);
    res.end();
  });
}

module.exports = {
  sendReq: sendReq,
};
