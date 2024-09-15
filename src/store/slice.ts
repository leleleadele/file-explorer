import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDialog, ITree } from '../types';
import setNestedProperty from '../helpers/setNestedProperty';
import deleteNestedProperty from 'helpers/deleteNestedProperty';

export interface IFileTreeSlice {
  tree: ITree | null;
  dialog: IDialog | null;
}

const initialState: IFileTreeSlice = {
  tree: null,
  dialog: null,
};

export const counterSlice = createSlice({
  name: 'file-tree',
  initialState,
  reducers: {
    hydrate: (_, action: PayloadAction<IFileTreeSlice>) => {
      return action.payload;
    },
    setTree: (state, action: PayloadAction<ITree>) => {
      state.tree = action.payload;
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
  },
});

export const {
  setTree,
  deleteItem,
  createFile,
  createFolder,
  openDialog,
  closeDialog,
  hydrate,
} = counterSlice.actions;

export default counterSlice.reducer;
