import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, createFile, createFolder } from '../../store/slice';
import styles from './index.module.css';
import { useEffect, useRef, useState } from 'react';

const CreateDialog: React.FC = () => {
  const dialog = useSelector((state: RootState) => state.fileTree.dialog);
  const dispatch = useDispatch<AppDispatch>();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const message = `Enter ${dialog?.type} name:`;

  const handleClose = (): void => {
    setInputValue('');
    dispatch(closeDialog());
  };

  const handleSubmit = (): void => {
    if (dialog) {
      setInputValue('');
      dispatch(
        dialog.type === 'file'
          ? createFile(`${dialog.path}/${inputValue}`)
          : createFolder(`${dialog.path}/${inputValue}`)
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (dialog) dialogRef.current?.showModal();
  }, [dialog]);

  if (!dialog) {
    return null;
  }

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <p>{message}</p>
      <input
        type="text"
        placeholder="Write something..."
        value={inputValue}
        onChange={handleChange}
      ></input>
      <div className={styles.buttonPanel}>
        <button className={styles.closeButton} onClick={handleClose}>
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
