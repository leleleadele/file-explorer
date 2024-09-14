const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Error loading state: ', e);

    return undefined;
  }
};

export default loadFromLocalStorage;
