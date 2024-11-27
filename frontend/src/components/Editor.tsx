import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  content: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, language, onChange }) => {
  return (
    <MonacoEditor
      height="100%"
      language={language}
      theme="vs-dark"
      value={content}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};