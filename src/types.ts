export interface ITree {
  [key: string]: ITree | null;
}

export interface IDirectoryItem {
  name: string;
  path: string;
  contents?: ITree;
}

export interface IDialog {
  type: 'file' | 'folder';
  path: string;
}

export interface IFolderPops {
  name: string;
  path: string;
  level: number;
  structureTree: ITree;
  renderChildren: (
    structureTree: ITree,
    path: string,
    level: number
  ) => JSX.Element;
  isOpen: boolean;
  onClick: () => void;
}
