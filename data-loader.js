const commander = require('commander');
const colors = require('colors/safe');
const Influx = require('influx');
const coap = require('./lib/coap-lib');

const MEASUREMENT = 'temperature';

function writePoints(targetIp, tempValue) {
  if (params.verbose) console.log(`Guardando temperatura (${tempValue}) de mota ${targetIp}`);
  influx.writePoints([{
    measurement: MEASUREMENT,
    tags: {
      ipv6: targetIp
    },
    fields: {
      value: tempValue
    },
  }]).catch(err => {
    console.error(colors.red(`Error guardando datos en InfluxDB: ${err.stack}`));
  });
}

commander
  .version('1.0.0')
  .option('-h, --host <str>', 'Host donde se encuentra la base de datos InfluxDB', 'localhost')
  .option('-d, --database <str>', 'Base de datos a usar', 'grupo_ivandack')
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
commander.parse(process.argv);
const params = {
  verbose: commander.verbose,
  host: commander.host,
  database: commander.database
};
console.log(params);
const influx = new Influx.InfluxDB({
  host: params.host,
  database: params.database,
  schema: [{
    measurement: MEASUREMENT,
    tags: [
      'ipv6'
    ],
    fields: {
      value: Influx.FieldType.INTEGER
    }
  }]
});

const execution = new Promise((resolve, reject) => {
  return coap.sendReq('localhost', null, '/environment/temperature', 'get', params.verbose, '123')
    .then(val => writePoints('localhost', val));
});

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes(params.database)) {
      return influx.createDatabase(params.database);
    }
  }).catch(err => {
    console.error(`Error creating Influx database!`);
  }).then(() => {
    execution.then();
  });