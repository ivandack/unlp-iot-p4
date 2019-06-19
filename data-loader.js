const commander = require('commander');
const Influx = require('influx');
const coap = require('./lib/coap-lib');
const utils = require('./lib/utils');

const MEASUREMENT = 'temperature';
const IPV6_LOCALHOST = 'localhost';
const DEFAULT_DATABASE = 'grupo_ivandack'

async function writePoints(targetIp, tempValue) {
  if (params.verbose) console.log(`Guardando temperatura (${tempValue}) de mota ${targetIp}`);
  try {
    await influx.writePoints([{
      measurement: MEASUREMENT,
      tags: {
        ipv6: targetIp
      },
      fields: {
        value: tempValue
      },
    }]);
  } catch (err) {
    utils.exitWithError(`Error guardando datos en InfluxDB: ${err.stack}`);
  };
}

commander
  .version('1.0.0')
  .option('-h, --host <str>', 'Host donde se encuentra la base de datos InfluxDB', IPV6_LOCALHOST)
  .option('-d, --database <str>', 'Base de datos a usar', DEFAULT_DATABASE)
  .option('-m, --mote <ipv6>', 'Dirección de la mota a consultar')
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0)
commander.parse(process.argv);

if (!commander.mote) utils.exitWithError(`Se debe indicar la mota objetivo`);

const params = {
  verbose: commander.verbose,
  host: commander.host,
  database: commander.database,
  mote: commander.mote,
};

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

function checkDatabaseExists() {
  return influx.getDatabaseNames()
    .catch(err => utils.exitWithError(`Error connecting to InfluxDB: ${err}`))
    .then(databaseNames => {
      if (!databaseNames.includes(params.database)) {
        return influx.createDatabase(params.database);
      }
    })
    .catch(err => utils.exitWithError(`Error creating Influx database "${params.database}"!`));
}

async function execution() {
  const val = await coap.sendReq(params.mote, null, '/environment/temperature', 'get', params.verbose);
  return writePoints(params.mote, val);
};

checkDatabaseExists();
execution();
setInterval(execution, 10000);