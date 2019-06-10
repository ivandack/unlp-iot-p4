const colors = require('colors');

function exitWithError(message, code = -1) {
  console.error(colors.red(`Error: ${message}`));
  process.exit(code);
}

function parseIntParam(value) {
  const result = parseInt(value);
  if (value.match(/[^0-9]/g) || isNaN(result)) {
    exitWithError(`El valor "${value}" no es un número entero.`);
  }
  return result;
}

function parsePort(value) {
  const result = parseIntParam(value);
  if (result < 1 || result > 65535) {
    exitWithError(`El valor "${result}" no es un puerto. Está fuera de rango.`);
  }
  return result;
}

module.exports = {
  exitWithError: exitWithError,
  parseIntParam: parseIntParam,
  parsePort: parsePort,
};

