import FileIcon from '../../icons/File';
import { IDirectoryItem } from '../../types';
import DeleteButton from '../DeleteButton';
import styles from './index.module.css';
const paddingStep = 24;

interface IProps {
  file: IDirectoryItem;
  level: number;
}
const File: React.FC<IProps> = ({ file, level }) => {
  return (
    <div
      className={styles.directoryItem}
      key={file.path}
      style={{ paddingLeft: `${(level + 1) * paddingStep}px` }}
    >
      <FileIcon />
      {file.name}
      <div className={styles.actionButtons}>
        <DeleteButton path={file.path} />
      </div>
    </div>
  );
};

export default File;
