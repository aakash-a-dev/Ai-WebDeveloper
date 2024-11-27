import React from 'react';
import { PanelLeftClose, PanelLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isExplorerCollapsed: boolean;
  onToggleExplorer: () => void;
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  isExplorerCollapsed,
  onToggleExplorer,
  children
}) => {
  return (
    <motion.div 
      className="h-14 glass border-b border-gray-700/50 flex items-center px-4 sticky top-0 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleExplorer}
        className="p-2 hover:bg-gray-700/50 rounded-lg text-gray-400 transition-colors duration-200"
      >
        {isExplorerCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </motion.button>
      <div className="ml-4 flex-1 flex items-center">
        <div className="flex items-center space-x-2 mr-6">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="font-medium text-gray-200">AI Website Builder</span>
        </div>
        {children}
      </div>
    </motion.div>
  );
};