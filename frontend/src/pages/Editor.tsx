import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FileExplorer } from '../components/FileExplorer';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';
import { AISteps, Step } from '../components/AISteps';
import { File } from '../types';
import { Code, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const initialFiles: File[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        name: 'index.html',
        type: 'file',
        path: '/src/index.html',
        content: '<!DOCTYPE html><html><body><h1>Hello World</h1></body></html>',
      },
      {
        name: 'styles.css',
        type: 'file',
        path: '/src/styles.css',
        content: 'body { margin: 0; padding: 20px; }',
      },
    ],
  },
];

const tabs = [
  { id: 'code', label: 'Code', icon: <Code size={18} /> },
  { id: 'preview', label: 'Preview', icon: <Eye size={18} /> },
];

const initialSteps: Step[] = [
  { id: 1, title: 'Analyzing Prompt', status: 'completed', details: 'Processing your requirements...' },
  { id: 2, title: 'Generating Structure', status: 'in-progress', details: 'Creating file structure and components' },
  { id: 3, title: 'Writing Code', status: 'pending', details: 'Implementing the design and functionality' },
  { id: 4, title: 'Optimizing', status: 'pending', details: 'Enhancing performance and accessibility' },
];

export const EditorPage: React.FC = () => {
  const location = useLocation();
  const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false);
  const [isAIStepsCollapsed, setIsAIStepsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  useEffect(() => {
    // Simulate AI progress
    const timers = steps.map((step, index) => {
      if (index === 0) return null;
      return setTimeout(() => {
        setSteps(prev => prev.map(s => {
          if (s.id === step.id) {
            return { ...s, status: 'completed' };
          }
          if (s.id === step.id + 1) {
            return { ...s, status: 'in-progress' };
          }
          return s;
        }));
      }, (index + 1) * 3000);
    });

    return () => timers.forEach(timer => timer && clearTimeout(timer));
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setActiveTab('code');
    }
  };

  const handleContentChange = (newContent: string | undefined) => {
    if (selectedFile && newContent) {
      const updateFiles = (files: File[]): File[] => {
        return files.map(file => {
          if (file.path === selectedFile.path) {
            return { ...file, content: newContent };
          }
          if (file.children) {
            return { ...file, children: updateFiles(file.children) };
          }
          return file;
        });
      };

      setFiles(updateFiles(files));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-gray-900 flex flex-col"
    >
      <Header
        isExplorerCollapsed={isExplorerCollapsed}
        onToggleExplorer={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
      >
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as 'code' | 'preview')}
        />
      </Header>

      <div className="flex-1 flex overflow-hidden">
        <FileExplorer
          files={files}
          onFileSelect={handleFileSelect}
          isCollapsed={isExplorerCollapsed}
        />
        <motion.div 
          className="flex-1 bg-gray-900"
          initial={false}
          animate={{ 
            marginLeft: isExplorerCollapsed ? '50px' : '0px',
            marginRight: isAIStepsCollapsed ? '50px' : '0px'
          }}
        >
          {activeTab === 'code' ? (
            selectedFile ? (
              <Editor
                content={selectedFile.content}
                language={selectedFile.name.endsWith('.html') ? 'html' : 'css'}
                onChange={handleContentChange}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center glass p-8 rounded-2xl max-w-md mx-4"
                >
                  <Code size={40} className="text-gray-500 mb-4 mx-auto" />
                  <p className="text-xl font-medium text-gray-300 mb-2">Select a file to edit</p>
                  <p className="text-gray-500">Choose a file from the explorer to start coding</p>
                </motion.div>
              </div>
            )
          ) : (
            <Preview
              content={
                files
                  .flatMap(f => f.children)
                  .filter(f => f?.type === 'file')
                  .map(f => f?.content)
                  .join('\n') || ''
              }
            />
          )}
        </motion.div>
        <AISteps steps={steps} isCollapsed={isAIStepsCollapsed} />
      </div>
    </motion.div>
  );
};