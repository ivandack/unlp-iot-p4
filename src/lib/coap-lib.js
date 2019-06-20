const coap = require('coap');
const logger = require('./logger');
const coreParser = require('./core-parser');

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 5683;
const DEFAULT_PATH = '/';
const GET_METHOD = 'get';
const POST_METHOD = 'post';
const DISCOVERY_PATH = '/.well-known/core';

function getStatusCode(res) {
  return parseInt(res.code.replace('.', ''), 10);
}

function sendReq(host, port, path, method, body) {
  const params = {
    method: method || GET_METHOD,
    hostname: host || DEFAULT_HOST,
    port: port || DEFAULT_PORT,
    pathname: path || DEFAULT_PATH,
  };
  return new Promise((resolve, reject) => {
    const req = coap.request(params);
    const url = `coap://${params.hostname}:${params.port}${params.pathname}`;
    logger.debug(`Enviando requerimiento ${params.method.toUpperCase()} a ${url}}`);

    req.on('response', (res) => {
      logger.debug(`HTTP Status: ${getStatusCode(res)}`);
      if (getStatusCode(res) === 404) {
        reject(new Error('No se encontró la operación especificada'));
      }
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        logger.debug(`Respuesta: ${responseBody}`);
        resolve(responseBody);
      });
    });
    req.end(body);
  });
}

function discover(host, port) {
  const params = {
    hostname: host || DEFAULT_HOST,
    port: port || DEFAULT_PORT,
    method: GET_METHOD,
    pathname: DISCOVERY_PATH,
  };
  return new Promise((resolve, reject) => {
    const req = coap.request(params);
    const url = `coap://${params.hostname}:${params.port}${params.pathname}`;
    logger.debug(`Enviando requerimiento de descubrimiento (GET ${url})`);

    req.on('response', (res) => {
      logger.debug(`HTTP Status: ${getStatusCode(res)}`);
      if (getStatusCode(res) === 404) {
        reject(new Error('No se encontró la operación especificada'));
      }
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        const response = coreParser.parseCoreResponse(responseBody.trim());
        logger.debug(`Respuesta: ${responseBody}`);
        resolve(response);
      });
    });
    req.end();
  });
}

module.exports = {
  discover,
  get: (host, port, path) => sendReq(host, port, path, GET_METHOD),
  post: (host, port, path, body) => sendReq(host, port, path, POST_METHOD, body),
};
