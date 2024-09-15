const deleteNestedProperty = (
  path: string,
  mutableObj: Record<string, any> | null
): void => {
  const pathParts = path.split('/');
  let current = mutableObj || {};

  if (pathParts[0] === '') {
    pathParts.shift();
  }

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (current === null || current[part] === undefined) {
      return;
    }

    if (i === pathParts.length - 1) {
      delete current[part];
    } else {
      current = current[part];
    }
  }
};

export default deleteNestedProperty;
