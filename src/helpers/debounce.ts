const debounce = (func: any, timeout = 300) => {
  let timer: any;

  //@ts-ignore
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export default debounce;
