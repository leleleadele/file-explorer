const setNestedProperty = (
  path: string,
  value: null | {},
  obj: Record<string, any>
) => {
  let objReference = obj; // a moving reference to internal objects within obj
  const parts = path.split('/');

  if (parts[0] === '') {
    parts.shift();
  }

  for (var i = 0; i < parts.length - 1; i++) {
    var parameter = parts[i];

    if (!objReference[parameter]) {
      objReference[parameter] = {};
    }
    objReference = objReference[parameter];
  }

  objReference[parts[parts.length - 1]] = value;
};

export default setNestedProperty;
