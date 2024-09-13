import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, createFile, createFolder } from '../app/slice';
import styles from './index.module.css';
import { useEffect, useRef } from 'react';

const CreateDialog = () => {
  const dialog = useSelector((state: RootState) => state.fileTree.dialog);
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef(null)



  useEffect(() => {
    // @ts-ignore
    if (dialog) dialogRef.current?.showModal();
}, [dialog])

if (!dialog) {
    return null;
  }

  const handleSubmit = () => {
    dispatch(
      dialog?.type === 'file'
        ? createFile(`${dialog.path}\${input}`)
        : createFolder(`${dialog.path}\${input}`)
    );
  };
  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <p>Enter {dialog.type} name:</p>
      <input type="text" placeholder='write something'></input>
      <div>
        <button className={styles.closeButton} onClick={() => dispatch(closeDialog())}>Close button</button>
        <button className={styles.submitButton} onClick={handleSubmit}>button text</button>
      </div>
    </dialog>
  );
};

export default CreateDialog;
