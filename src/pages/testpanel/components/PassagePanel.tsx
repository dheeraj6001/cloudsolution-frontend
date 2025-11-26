// PassagePanel.tsx

import React from 'react';

interface PassagePanelProps {
  passage: string;
}


const PassagePanel: React.FC<PassagePanelProps> = ({ passage }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <div dangerouslySetInnerHTML={{ __html: passage }} />
    </div>
  );
};

export default PassagePanel;