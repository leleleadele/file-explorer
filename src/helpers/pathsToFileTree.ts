import { ITree } from '../types';

const pathsToFileTree = (data: Array<string>): ITree => {
  const filesInTree = {};

  data.forEach((item: string) => {
    const levels = item.split('/');

    let current: ITree = filesInTree;

    levels.forEach((level, index) => {
      if (!current[level]) {
        if (index === levels.length - 1) {
          current[level] = null;
        } else {
          current[level] = {};
        }
      }

      current = current[level] as ITree;
    });
  });

  return filesInTree;
};

export default pathsToFileTree;
