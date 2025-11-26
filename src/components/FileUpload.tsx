import React from "react";

type Props = {
  onFileUpload: (file: File) => void;
  disabled?: boolean;
};

export default function FileUpload({ onFileUpload, disabled }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".docx,.xlsx"
        onChange={handleChange}
        disabled={disabled}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-orange-500 file:text-white
                   hover:file:bg-orange-600"
      />
    </div>
  );
}
