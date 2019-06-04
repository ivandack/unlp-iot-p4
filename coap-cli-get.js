const parser = require('./param-parser');

const params = parser.parseGet();
if (params.verbose) console.log(`Host destino: "coap://${params.host}:${params.port}${params.path}"`);

