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
      console.log('creating file', action.payload);
      const path = action.payload;
      const parts = path.split('/');

      if (parts[0] === '') {
        parts.shift();
      }

      let current = { ...state.tree };

      for (let i = 0; i < parts.length; i++) {
        console.log('current within iteration', current);
        const part = parts[i];

        if ((!!current || current === null) && current[part] === undefined) {
          if (i === parts.length - 1) {
            console.log('case A');
            current[part] = null;
          }
        } else {
          console.log('case B');
          current[part] = {};
        }

        // @ts-ignore
        current = current[part];
      }

      state.dialog = null;
      state.tree = current;
    },

    createFolder: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      const parts = path.split('/');
      let current = state.tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (current[part] === undefined) {
          current[part] = {};
        } // @ts-ignore

        current = current[part];
      }

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
} = counterSlice.actions;

export default counterSlice.reducer;
