const commander = require('commander');
const Influx = require('influx');
const coap = require('./lib/coap-lib');
const utils = require('./lib/utils');
const logger = require('./lib/logger');

const MEASUREMENT = 'temperature';
const IPV6_LOCALHOST = 'localhost';
const DEFAULT_DATABASE = 'grupo_ivandack';

async function writePoints(influx, targetIp, tempValue) {
  logger.debug(`Guardando temperatura (${tempValue}) de mota ${targetIp}`);
  try {
    await influx.writePoints([
      {
        measurement: MEASUREMENT,
        tags: {
          ipv6: targetIp,
        },
        fields: {
          value: tempValue,
        },
      },
    ]);
  } catch (err) {
    utils.exitWithError(`Error guardando datos en InfluxDB: ${err.stack}`);
  }
}

commander
  .version('1.0.0')
  .option('-h, --host <str>', 'Host donde se encuentra la base de datos InfluxDB', IPV6_LOCALHOST)
  .option('-d, --database <str>', 'Base de datos a usar', DEFAULT_DATABASE)
  .option('-m, --mote <ipv6>', 'Dirección de la mota a consultar')
  .option('-v, --verbose', 'Muestra más información al ejecutar el programa', () => 1, 0);
commander.parse(process.argv);

if (!commander.mote) utils.exitWithError('Se debe indicar la mota objetivo');

const {
  verbose, host, database, mote,
} = commander;
logger.setVerbose(verbose);

const influx = new Influx.InfluxDB({
  host,
  database,
  schema: [
    {
      measurement: MEASUREMENT,
      tags: ['ipv6'],
      fields: {
        value: Influx.FieldType.INTEGER,
      },
    },
  ],
});

function checkDatabaseExists() {
  return influx
    .getDatabaseNames()
    .catch(err => utils.exitWithError(`Error connecting to InfluxDB: ${err}`))
    .then((databaseNames) => {
      if (!databaseNames.includes(database)) {
        influx.createDatabase(database);
      }
    })
    .catch(() => utils.exitWithError(`Error creating Influx database "${database}"!`));
}

async function execution() {
  const val = await coap.get(mote, null, '/environment/temperature');
  return writePoints(influx, mote, val);
}

checkDatabaseExists();
execution();
setInterval(execution, 10000);
