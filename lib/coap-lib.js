const coap = require('coap');

function getStatusCode(res) {
  return parseInt(res.code.replace('.', ''));
}

function sendReq(host = 'localhost', port = 5683, path = '/', method = 'get', verbose = false, body) {
  const reqParams = {
    hostname: host,
    port: port || 5683,
    method: method,
    pathname: path
  };
  return new Promise((resolve, reject) => {
    const req = coap.request(reqParams);
    if (verbose) console.log(`Enviando request ${method.toUpperCase()} a coap://${host}:${port}${path}`);

    req.on('response', (res) => {
      if (getStatusCode(res) === 404) {
        reject('No se encontró el método especificado');
      }
      if (verbose) console.log(`HTTP Status: ${getStatusCode(res)}`);
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (verbose) console.log(`Respuesta:`);
        resolve(body);
      });
    });
    req.end(body);
  });
}

module.exports = {
  sendReq: sendReq,
};