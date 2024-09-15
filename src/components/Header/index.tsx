import CreateButton from 'components/CreateButton';
import styles from './index.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        <CreateButton type="file" path="" />
        <CreateButton type="folder" path="" />
      </div>
    </div>
  );
};

export default Header;
