

interface SubjectTabsProps {
  subjects: { sub_id: string; name: string }[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}

export default function SubjectTabs({ subjects, activeIndex, setActiveIndex }: SubjectTabsProps) {
  return (
    <div className="border-b mb-6">
      <nav className="flex overflow-x-auto space-x-4 scrollbar-hide px-2">
        {subjects.map((subject, idx) => (
          <button
            key={subject.sub_id}
            onClick={() => setActiveIndex(idx)}
            className={`whitespace-nowrap px-4 py-2 border-b-2 transition-all ${
              activeIndex === idx
                ? "border-orange-500 text-orange-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-orange-500 hover:border-orange-300"
            }`}
          >
            {subject.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
