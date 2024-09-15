import { ReactNode, useCallback, useEffect, useState } from 'react';
import getFilesData from '../../api/getFilesData';
import { ITree, IDirectoryItem, IDirectoryFolder } from '../../types';
import Folder from '../../components/Folder';
import File from '../../components/File';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setTree } from '../../store/slice';
import CreateDialog from '../../components/CreateDialog';
import styles from './index.module.css';
import CreateButton from '../../components/CreateButton';
import pathsToFileTree from '../../helpers/pathsToFileTree';

const FileTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tree } = useSelector((store: RootState) => store.fileTree);
  const [openDirectories, setOpenDirectories] = useState<
    Record<string, boolean>
  >({});

  const fetchData = async (): Promise<void> => {
    const data = await getFilesData();

    dispatch(setTree(pathsToFileTree(data)));
  };

  const toggleExpanded = (path: string): void => {
    setOpenDirectories((prev: Record<string, boolean>) => {
      return {
        ...prev,
        [path]: !prev[path],
      };
    });
  };

  const traverseFileTree = useCallback((): ReactNode => {
    if (tree) {
      const renderFileStructure = (
        structureTree: ITree,
        path: string,
        level: number
      ) => {
        const foldersInLevel: IDirectoryFolder[] = [];
        const filesInLevel: IDirectoryItem[] = [];

        Object.entries(structureTree).map(([key, value]) => {
          if (value) {
            foldersInLevel.push({
              name: key,
              contents: value,
              path: `${path}/${key}`,
            });
          } else {
            filesInLevel.push({
              name: key,
              path: `${path}/${key}`,
            });
          }
        });

        return (
          <div>
            {foldersInLevel.map((folder) => {
              return (
                <div key={folder.path}>
                  <Folder
                    name={folder.name}
                    structureTree={folder.contents}
                    path={folder.path}
                    level={level}
                    renderChildren={renderFileStructure}
                    isOpen={!!openDirectories[folder.path]}
                    onClick={() => toggleExpanded(folder.path)}
                  />
                </div>
              );
            })}
            {filesInLevel.map((file) => {
              return <File key={file.path} file={file} level={level} />;
            })}
          </div>
        );
      };

      return renderFileStructure(tree, '', 0);
    }
  }, [tree, openDirectories]);

  useEffect(() => {
    !tree && fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.rootButtons}>
        <div className={styles.actionButtons}>
          <CreateButton type="file" path="" />
          <CreateButton type="folder" path="" />
        </div>
      </div>

      {traverseFileTree()}

      <CreateDialog />
    </div>
  );
};

export default FileTree;
