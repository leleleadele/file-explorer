import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDialog, ITree } from '../types';

export interface FileTreeState {
  tree: ITree;
  dialog: IDialog | null;
}

const initialState: FileTreeState = {
  tree: {},
  dialog: null,
};

export const counterSlice = createSlice({
  name: 'file-tree',
  initialState,
  reducers: {
    setTree: (state, action: PayloadAction<ITree>) => {
      state.tree = action.payload;
    },

    createFile: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      const parts = path.split('/');
      let current = state.tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!current) {
          return;
        }
        if (current[part] === undefined) {
          if (i === parts.length - 1) {
            current[part] = null;
          }
        } else {
          current[part] = {};
        }

        // @ts-ignore
        current = current[part];
      }

      state.dialog = null;
    },

    createFolder: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      const parts = path.split('/');
      let current = state.tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (current[part] === undefined) {
          current[part] = {};
        }        // @ts-ignore

        current = current[part];
      }

      state.dialog = null;
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const pathParts = action.payload.split('/');
      let current = state.tree;

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
        } else {        // @ts-ignore

          current = current[part];
        }
      }
    },

    openDialog: (state, action: PayloadAction<IDialog>) => {
        state.dialog = action.payload;
    },

    closeDialog: (state) => {
        state.dialog = null
    }
  },
});

// Action creators are generated for each case reducer function
export const { setTree, deleteItem, createFile, createFolder, openDialog, closeDialog } = counterSlice.actions;

export default counterSlice.reducer;
