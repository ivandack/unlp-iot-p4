const coap = require('coap');
const commander = require('commander');
const logger = require('./lib/logger');

const server = coap.createServer({ type: 'udp6' });

commander.version('1.0.0');

// GET
commander.option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0);
commander.parse(process.argv);

logger.setVerbose(commander.verbose);

function sendMethodNotAllowed(res) {
  logger.error(`Método desconocido para ${res.method} ${res.url}`);
  res.writeHead(405).end();
}

function defaultResponse(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    if (commander.verbose) {
      res.write(`Method: ${req.method}\n`);
      res.write(`URL: ${req.url}\n`);
      if (req.method) res.write('Body: ');
    }
    res.end(body);
  });
}

function wellKnownResponse(req, res) {
  if (req.method === 'GET') {
    const responses = [
      '</environment/temperature>;title="Temperature"',
      '</light>;rt="Toogle light"',
    ];
    const result = responses.reduce((prev, cur) => `${prev},${cur}`);
    logger.debug(result);
    res.end(result);
  } else {
    sendMethodNotAllowed(res);
  }
}

function temperatureResponse(req, res) {
  if (req.method === 'GET') {
    const temp = 12 + Math.floor(Math.random() * (10 - 1)) + 1;
    logger.debug(`Enviando temperatura ${temp}`);
    res.end(`${temp}`);
  } else {
    sendMethodNotAllowed(res);
  }
}

const validPaths = {
  '/environment/temperature': temperatureResponse,
  '/.well-known/core': wellKnownResponse,
};

server.on('request', (req, res) => {
  const handler = validPaths[req.url] || defaultResponse;
  handler(req, res);
});

// the default CoAP port is 5683
server.listen(() => {
  logger.debug('Escuchando con el servidor de pruebas...');
});
