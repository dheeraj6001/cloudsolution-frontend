import React from 'react';
import {  Subject } from '@/types/test';


interface SectionTabsProps {
  subjects: Subject[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}



const SectionTabs: React.FC<SectionTabsProps> = ({ subjects, selectedIndex, onSelect }) => {
  return (
    <div className="flex space-x-4 bg-gray-200 p-2">
      {subjects.map((subj, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded ${
            selectedIndex === i ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
          onClick={() => onSelect(i)}
        >
          {subj.name}
        </button>
      ))}
    </div>
  );
};


export default SectionTabs;