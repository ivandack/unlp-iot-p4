const coap = require('coap');
const utils = require('./utils');

function sendReq(host, port, path, method) {
  const reqParams = {
    hostname: host,
    port: port,
    method: method,
    pathname: path
  };
  const req = coap.request(reqParams);
  
  req.on('response', function(res) {
    if (res.status === 404) {
      utils.exitWithError('No se encontró el método especificado');
    }
    console.log(´Respuesta: \n${res.body}´);
  });
}

module.exports = {
  sendReq: sendReq,
};
