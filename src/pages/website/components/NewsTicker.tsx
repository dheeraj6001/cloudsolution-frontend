import './NewsTicker.css';

const NewsTicker = () => {
  return (
    <>
    <style>{`
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
  `}</style>
    <div className="relative w-full overflow-hidden bg-gray-900 text-white">
      <div className="ticker-track flex whitespace-nowrap animate-marquee">
        <span className="px-4 py-2 text-sm font-medium">
          🚨 Breaking News: Market hits all-time high! — 📣 New product launch coming soon! — ⚡ Flash Sale ends at midnight! —
        </span>
        <span className="px-4 py-2 text-sm font-medium">
          🚨 Breaking News: Market hits all-time high! — 📣 New product launch coming soon! — ⚡ Flash Sale ends at midnight! —
        </span>
      </div>
    </div>
    </>
  );
};

export default NewsTicker;
