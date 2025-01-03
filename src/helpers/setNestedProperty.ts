const setNestedProperty = (
  path: string,
  value: null | {},
  mutableObj: Record<string, any> | null
): void => {
  let objReference = mutableObj || {};
  const parts = path.split('/');

  if (parts[0] === '') {
    parts.shift();
  }

  for (let i = 0; i < parts.length - 1; i++) {
    var parameter = parts[i];

    if (!objReference[parameter]) {
      objReference[parameter] = {};
    }
    objReference = objReference[parameter];
  }

  objReference[parts[parts.length - 1]] = value;
};

export default setNestedProperty;
