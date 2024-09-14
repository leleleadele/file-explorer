import { IFolderPops } from '../../types';
import CreateButton from '../CreateButton';
import DeleteButton from '../DeleteButton';
import styles from './index.module.css';
const paddingStep = 24;

const Folder: React.FC<IFolderPops> = ({
  name,
  structureTree,
  path,
  level,
  renderChildren,
  isOpen,
  onClick,
}) => {
  const children = renderChildren(structureTree, path, level + 1);

  return (
    <div className={styles.wrapper}>
      <span
        className={styles.directoryItem}
        onClick={onClick}
        style={{ paddingLeft: `${(level + 1) * paddingStep}px` }}
      >
        <div className={styles.arrowContainer}>
          <span
            className={`${isOpen ? styles.arrowDown : styles.arrowRight}`}
          ></span>
        </div>
        {name}
        <div className={styles.actionButtons}>
          <CreateButton type="file" path={path} />
          <CreateButton type="folder" path={path} />
          <DeleteButton path={path} />
        </div>
      </span>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <div className={`${styles.folderContents} ${isOpen && styles.open}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
