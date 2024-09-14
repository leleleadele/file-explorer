import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, createFile, createFolder } from '../app/slice';
import styles from './index.module.css';
import { useEffect, useRef, useState } from 'react';

const CreateDialog = () => {
  const dialog = useSelector((state: RootState) => state.fileTree.dialog);
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (dialog) dialogRef.current?.showModal();
  }, [dialog]);

  if (!dialog) {
    return null;
  }

  const handleSubmit = () => {
    dispatch(
      dialog?.type === 'file'
        ? createFile(`${dialog.path}/${inputValue}`)
        : createFolder(`${dialog.path}/${inputValue}`)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <p>Enter {dialog.type} name:</p>
      <input
        type="text"
        placeholder="write something"
        value={inputValue}
        onChange={handleChange}
      ></input>
      <div>
        <button
          className={styles.closeButton}
          onClick={() => dispatch(closeDialog())}
        >
          Close
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </dialog>
  );
};

export default CreateDialog;
