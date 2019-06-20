const { createLogger, format, transports } = require('winston');

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const logger = createLogger({
  format: format.prettyPrint(),
  transports: [new transports.Console(options.console)],
  exitOnError: true,
});

logger.setVerbose = (verbose = false) => {
  logger.transports[0].level = verbose ? 'debug' : 'info';
};

module.exports = logger;
