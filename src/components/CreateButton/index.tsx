import styles from './index.module.css';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../store/slice';

interface IProps {
  path: string;
  type: 'file' | 'folder';
}

const CreateButton: React.FC<IProps> = ({ type, path }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    dispatch(openDialog({ type, path }));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      +{type}
    </button>
  );
};

export default CreateButton;
