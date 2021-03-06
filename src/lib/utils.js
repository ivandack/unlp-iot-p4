const logger = require('./logger');

function exitWithError(message, code = -1) {
  logger.error(message);
  process.exit(code);
}

function parseIntParam(value) {
  const result = parseInt(value, 10);
  if (value.match(/[^\-0-9]/g) || Number.isNaN(result)) {
    throw new Error(`El valor "${value}" no es un número entero.`);
  }
  return result;
}

function parsePort(value) {
  const result = parseIntParam(value);
  if (result < 1 || result > 65535) {
    throw new Error(`El valor "${result}" no es un puerto. Está fuera de rango.`);
  }
  return result;
}

module.exports = {
  exitWithError,
  parseIntParam,
  parsePort,
};
