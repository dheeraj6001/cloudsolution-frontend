
import {
  Clock,
  Target,
  Users,
  Star,
} from 'lucide-react';

const seriesData = [
  {
    title: 'Full-Length Mock Tests',
    description: 'Simulate the real exam environment with our timed full-length tests.',
    tests: 10,
    duration: '90 mins',
    image: 'https://source.unsplash.com/400x300/?exam,online',
  },
  {
    title: 'Topic-Wise Practice Sets',
    description: 'Focus on weak areas with subject-specific question banks.',
    tests: 50,
    duration: '30 mins',
    image: 'https://source.unsplash.com/400x300/?books,study',
  },
  {
    title: 'Past Year Papers',
    description: 'Practice previous years’ real exam papers with instant scoring.',
    tests: 20,
    duration: '60 mins',
    image: 'https://source.unsplash.com/400x300/?paper,test',
  },
];

const features = [
  {
    icon: <Clock className="text-blue-600" size={28} />,
    title: 'Flexible Timing',
    desc: 'Take tests anytime, anywhere at your convenience.',
  },
  {
    icon: <Target className="text-blue-600" size={28} />,
    title: 'Personalized Feedback',
    desc: 'Get detailed analysis and suggestions after each test.',
  },
  {
    icon: <Users className="text-blue-600" size={28} />,
    title: 'Compete Globally',
    desc: 'Compare scores with thousands of aspirants across the country.',
  },
  {
    icon: <Star className="text-blue-600" size={28} />,
    title: 'Curated by Experts',
    desc: 'Test series created by top educators & exam toppers.',
  },
];

const TestSeries = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero */}
      <section className="bg-gray-100 py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Practice Smarter with Our Test Series</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Mock exams, subject-wise practice sets, and past papers — everything you need to crack the real test.
        </p>
      </section>

      {/* Test Series Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {seriesData.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4">
              <img src={item.image} alt={item.title} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>📝 {item.tests} Tests</span>
                <span>⏱ {item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Our Test Series?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {features.map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="mb-4">{feat.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-600">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-4">Start Practicing Today</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Sign up and get access to a free mock test. Improve your performance with every attempt.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Try a Free Test
        </a>
      </section>
    </div>
  );
};

export default TestSeries;
