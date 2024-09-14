import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import { AppDispatch } from '../app/store';
import { deleteItem } from '../app/slice';

interface IProps {
  path: string;
}

const DeleteButton: React.FC<IProps> = ({ path }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(deleteItem(path));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      &times;
    </button>
  );
};

export default DeleteButton;
