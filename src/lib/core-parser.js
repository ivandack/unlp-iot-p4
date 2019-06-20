/**
 * Implementación parcial de "Constrained RESTful Environments (CoRE) Link
 * Format" [RFC6690].
 */

const resourceRegex = /^<(.+)>((?:;.+=.+)*)$/;

function parseCoreResponse(response) {
  const resources = [];
  const resourcesStrList = response.split(',');
  resourcesStrList.forEach((resourceStr) => {
    const line = resourceStr.match(resourceRegex);
    if (!line) {
      throw new Error('Invalid input');
    }
    const resource = {
      path: line[1],
    };
    if (line[2]) {
      line[2]
        .substring(1)
        .split(';')
        .forEach((param) => {
          const p = param.trim().split('=');
          resource[p[0]] = p[1].replace(/"/g, '');
        });
    }
    resources.push(resource);
  });
  return resources;
}

module.exports = {
  parseCoreResponse,
};
