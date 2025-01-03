import { ReactNode, useCallback } from 'react';
import { ITree, IDirectoryItem, IDirectoryFolder } from '../../types';
import Folder from '../../components/Folder';
import File from '../../components/File';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CreateDialog from '../../components/CreateDialog';
import styles from './index.module.css';
import Header from 'components/Header';

const FileTree: React.FC = () => {
  const { tree } = useSelector((store: RootState) => store.fileTree);


  const traverseFileTree = useCallback((): ReactNode => {
    if (tree) {
      const renderFileStructure = (
        structureTree: ITree,
        path: string,
        level: number
      ) => {
        const foldersInLevel: IDirectoryFolder[] = [];
        const filesInLevel: IDirectoryItem[] = [];

        Object.entries(structureTree).forEach(([key, value]) => {
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
            {foldersInLevel
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((folder) => {
                return (
                  <div key={folder.path}>
                    <Folder
                      name={folder.name}
                      structureTree={folder.contents}
                      path={folder.path}
                      level={level}
                      renderChildren={renderFileStructure}
                    />
                  </div>
                );
              })}
            {filesInLevel
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((file) => {
                return <File key={file.path} file={file} level={level} />;
              })}
          </div>
        );
      };

      return renderFileStructure(tree, '', 0);
    }
  }, [tree]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      {traverseFileTree()}
      <CreateDialog />
    </div>
  );
};

export default FileTree;
