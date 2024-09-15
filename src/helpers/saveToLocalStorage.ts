const saveToLocalStorage = (key: string, value: any): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error('Error saving state: ', e);
  }
};

export default saveToLocalStorage;
