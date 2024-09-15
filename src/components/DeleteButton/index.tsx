import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import { AppDispatch } from '../../store';
import { deleteItem } from '../../store/slice';

interface IProps {
  path: string;
}

const DeleteButton: React.FC<IProps> = ({ path }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
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
