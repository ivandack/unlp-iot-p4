const coap = require('coap');
const params = require('./param-parser');

const coapUrl = `coap://${params.host}:${params.port}`;
if (params.verbose) console.log(`Host destino: ${coapUrl}`);

const req = coap.request(coapUrl);

req.on('response', function(res) {
  res.pipe(process.stdout);
  res.on('end', function() {
    process.exit(0);
  });
});
req.end();
