export interface ITree {
  [key: string]: ITree | null;
}

export interface IDirectoryItem {
  name: string;
  path: string;
}

export interface IDirectoryFolder extends IDirectoryItem {
  contents: ITree;
}

export interface IDialog {
  type: 'file' | 'folder';
  path: string;
}
