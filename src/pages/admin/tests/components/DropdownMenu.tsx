import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ testId }: { testId: string }) => {
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left">
      <button className="text-sm text-blue-500 hover:underline">Actions</button>
      <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
        <li>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => navigate(`/admin/tests/${testId}/add-question`)}
          >
            ➕ Add Question
          </button>
        </li>
        {/* Add more items if needed */}
      </ul>
    </div>
  );
};

export default DropdownMenu;
