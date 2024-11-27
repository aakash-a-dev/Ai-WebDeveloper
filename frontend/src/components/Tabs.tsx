import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex bg-gray-800/30 rounded-xl p-1 backdrop-blur-xl border border-gray-700/30">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={clsx(
            'relative flex items-center px-4 py-2 space-x-2 rounded-lg text-sm font-medium transition-all duration-200',
            'hover:text-white',
            activeTab === tab.id ? 'text-white' : 'text-gray-400'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-gray-700/50 rounded-lg backdrop-blur-sm"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.icon}</span>
          <span className="relative z-10">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};