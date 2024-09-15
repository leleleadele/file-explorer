import { configureStore } from '@reduxjs/toolkit';
import fileTreeReducer from './slice';
import { sliceStorageKey } from '../consts';
import debounce from '../helpers/debounce';
import saveState from '../helpers/saveToLocalStorage';

export const store = configureStore({
  reducer: {
    fileTree: fileTreeReducer,
  },
});

store.subscribe(
  debounce(() => {
    saveState(sliceStorageKey, store.getState().fileTree);
  }, 800)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
