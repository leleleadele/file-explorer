import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDialog, ITree } from '../types';
import setNestedProperty from '../helpers/setNestedProperty';

export interface FileTreeState {
  tree: ITree | null;
  dialog: IDialog | null;
}

const initialState: FileTreeState = {
  tree: null,
  dialog: null,
};

export const counterSlice = createSlice({
  name: 'file-tree',
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<FileTreeState>) => {
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
      const pathParts = action.payload.split('/');
      let current = { ...state.tree };

      if (pathParts[0] === '') {
        pathParts.shift();
      }

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];

        if (current[part] === undefined) {
          return;
        }

        if (i === pathParts.length - 1) {
          delete current[part];
        } else {
          // @ts-ignore

          current = current[part];
        }
      }

      state.tree = current;
    },

    openDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },

    closeDialog: (state) => {
      state.dialog = null;
    },
  },
});

// Action creators are generated for each case reducer function
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
