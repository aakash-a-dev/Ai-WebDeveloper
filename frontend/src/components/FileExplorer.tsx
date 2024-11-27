import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileCode, Folder } from 'lucide-react';
import { File } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FileExplorerProps {
  files: File[];
  onFileSelect: (file: File) => void;
  isCollapsed: boolean;
}

const FileItem: React.FC<{ file: File; onFileSelect: (file: File) => void }> = ({
  file,
  onFileSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    if (file.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <motion.div
        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
        className="flex items-center px-3 py-1.5 rounded-lg cursor-pointer text-gray-300 transition-colors duration-150 group"
        onClick={() => {
          toggleFolder();
          if (file.type === 'file') {
            onFileSelect(file);
          }
        }}
      >
        <span className="mr-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          {file.type === 'folder' ? (
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.span>
          ) : null}
        </span>
        {file.type === 'folder' ? (
          <Folder size={16} className="mr-2 text-blue-400" />
        ) : (
          <FileCode size={16} className="mr-2 text-green-400" />
        )}
        <span className="text-sm font-medium">{file.name}</span>
      </motion.div>
      <AnimatePresence>
        {file.type === 'folder' && isOpen && file.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 overflow-hidden"
          >
            {file.children.map((child, index) => (
              <FileItem key={index} file={child} onFileSelect={onFileSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  isCollapsed,
}) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isCollapsed ? '50px' : '280px',
        opacity: isCollapsed ? 0.8 : 1
      }}
      className="h-full glass border-r border-gray-700/50 overflow-y-auto transition-opacity duration-200"
    >
      {!isCollapsed && (
        <div className="p-3">
          {files.map((file, index) => (
            <FileItem key={index} file={file} onFileSelect={onFileSelect} />
          ))}
        </div>
      )}
    </motion.div>
  );
};