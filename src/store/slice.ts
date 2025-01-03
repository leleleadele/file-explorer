import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDialog, ITree } from '../types';
import setNestedProperty from '../helpers/setNestedProperty';
import deleteNestedProperty from 'helpers/deleteNestedProperty';
import { initialData } from 'consts';
import pathsToFileTree from 'helpers/pathsToFileTree';

export interface IFileTreeSlice {
  tree: ITree | null;
  dialog: IDialog | null;
  openDirectories: Record<string, boolean>;
}

const initialState: IFileTreeSlice = {
  tree: pathsToFileTree(initialData),
  dialog: null,
  openDirectories: {},
};

export const counterSlice = createSlice({
  name: 'file-tree',
  initialState,
  reducers: {
    hydrate: (_, action: PayloadAction<IFileTreeSlice>) => {
      return action.payload;
    },

    createFile: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      setNestedProperty(path, null, state.tree);
      
      state.dialog = null;
    },

    createFolder: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      setNestedProperty(path, {}, state.tree);

      state.dialog = null;
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      deleteNestedProperty(action.payload, state.tree);
    },

    openDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },

    closeDialog: (state) => {
      state.dialog = null;
    },

    toggleExpandedDirectories: (state, action: PayloadAction<string>) => {
      const path = action.payload;

      state.openDirectories = {
        ...state.openDirectories,
        [path]: !state.openDirectories[path],
      }
    }
  },
});

export const {
  deleteItem,
  createFile,
  createFolder,
  openDialog,
  closeDialog,
  toggleExpandedDirectories,
  hydrate,
} = counterSlice.actions;

export default counterSlice.reducer;
