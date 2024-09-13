import styles from './index.module.css';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { openDialog } from '../app/slice';

interface IProps {
  path: string;
  type: 'file' | 'folder';
}

const CreateButton: React.FC<IProps> = ({ type, path }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(openDialog({ type, path }));
  };

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        + {type}
      </button>
    </>
  );
};

export default CreateButton;
