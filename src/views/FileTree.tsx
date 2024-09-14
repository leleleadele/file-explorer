import { useCallback, useEffect, useState } from 'react';
import getFilesData from '../api/getFilesData';
import { ITree, IDirectoryItem, IDirectoryFolder } from '../types';
import Folder from '../components/Folder';
import File from '../components/File';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setTree } from '../app/slice';
import CreateDialog from '../components/CreateDialog';
import styles from '../components/index.module.css';
import { responseCopy } from '../consts';
import path from 'path';
import CreateButton from '../components/CreateButton';

const FileTree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tree } = useSelector((store: RootState) => store.fileTree);
  const [openDirectories, setOpenDirectories] = useState<
    Record<string, boolean>
  >({});

  const fetchData = async () => {
    //const data = await getFilesData() || [];
    const data = responseCopy;
    const filesInTree = {};

    data.forEach((item: string) => {
      const levels = item.split('/');

      let current: ITree = filesInTree;

      levels.forEach((level, index) => {
        if (!current[level]) {
          if (index === levels.length - 1) {
            current[level] = null;
          } else {
            current[level] = {};
          }
        }
        // @ts-ignore
        current = current[level];
      });
    });

    dispatch(setTree(filesInTree));
  };

  const toggleExpanded = (path: string) => {
    setOpenDirectories((prev: Record<string, boolean>) => {
      return {
        ...prev,
        [path]: !prev[path],
      };
    });
  };

  const traverseFileTree = useCallback(() => {
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
