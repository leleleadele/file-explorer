import { paddingStep } from 'consts';
import { ITree } from '../../types';
import CreateButton from '../CreateButton';
import DeleteButton from '../DeleteButton';
import styles from './index.module.css';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExpandedDirectories } from 'store/slice';

interface IProps {
  name: string;
  path: string;
  level: number;
  structureTree: ITree;
  renderChildren: (
    structureTree: ITree,
    path: string,
    level: number
  ) => JSX.Element;
}

const Folder: React.FC<IProps> = ({
  name,
  structureTree,
  path,
  level,
  renderChildren,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openDirectories } = useSelector((state: RootState) => state.fileTree);
  const isOpen = !!openDirectories[path];
  const children = renderChildren(structureTree, path, level + 1);

  const toggleExpanded = (): void => {
    dispatch(toggleExpandedDirectories(path));
  };

  return (
    <div className={styles.wrapper}>
      <span
        className={styles.directoryItem}
        onClick={toggleExpanded}
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
