import React from 'react';

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="w-full h-full bg-white">
      <iframe
        title="preview"
        srcDoc={content}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </div>
  );
};