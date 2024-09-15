const debounce = (
  fn: Function,
  ms: number
): ((this: any, ...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default debounce;
