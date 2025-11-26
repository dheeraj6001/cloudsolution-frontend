import { useState, useRef, useEffect, MouseEvent } from "react";

interface TestActionMenuProps {
  onEdit: () => void;
  onAddQuestions: () => void;
  onViewQuestions: () => void;
  onTakeTest: () => void;
  onDelete: () => void;
}

export default function TestActionMenu({
  onEdit,
  onAddQuestions,
  onViewQuestions,
  onTakeTest,
  onDelete,
}: TestActionMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent | MouseEventInit | any) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-2 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200"
      >
        Actions
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Edit Test
          </button>

          <button
            onClick={onAddQuestions}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Add Questions
          </button>

          <button
            onClick={onViewQuestions}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            View Questions
          </button>

          <button
            onClick={onTakeTest}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Take Test
          </button>

          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
