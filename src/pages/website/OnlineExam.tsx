import {
  Timer,
  FileText,
  ShieldCheck,
  Users,
  BarChart3,
  Layers3,
} from 'lucide-react';

const examFeatures = [
  {
    icon: <Timer size={28} className="text-blue-600" />,
    title: 'Timed Exams',
    description: 'Set flexible or fixed durations to ensure fairness and control over assessments.',
  },
  {
    icon: <FileText size={28} className="text-blue-600" />,
    title: 'Multiple Question Types',
    description: 'Support for MCQs, short answers, essays, file uploads, and coding questions.',
  },
  {
    icon: <ShieldCheck size={28} className="text-blue-600" />,
    title: 'Secure & Anti-Cheat',
    description: 'Browser restrictions, webcam monitoring, and IP tracking to ensure integrity.',
  },
  {
    icon: <Users size={28} className="text-blue-600" />,
    title: 'Live Proctoring',
    description: 'Real-time monitoring and flagging during exams with proctor dashboard.',
  },
  {
    icon: <BarChart3 size={28} className="text-blue-600" />,
    title: 'Instant Reports',
    description: 'Auto-grading for objective questions and downloadable performance reports.',
  },
  {
    icon: <Layers3 size={28} className="text-blue-600" />,
    title: 'Question Bank System',
    description: 'Reuse, categorize, and randomize questions from your central bank.',
  },
];

const OnlineExam = () => {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All-in-One Online Exam Platform
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Everything you need to create, conduct, and evaluate secure online exams—at scale.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {examFeatures.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Highlights */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="https://source.unsplash.com/600x400/?laptop,exam"
              alt="Exam Interface"
              className="rounded-xl shadow"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">Easy to Use Exam Interface</h2>
              <p className="text-gray-600 text-lg">
                Clean and distraction-free UI optimized for students. Real-time timer, question navigation, and progress bar.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
            <img
              src="https://source.unsplash.com/600x400/?analytics,report"
              alt="Analytics"
              className="rounded-xl shadow"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">Detailed Analytics & Scoring</h2>
              <p className="text-gray-600 text-lg">
                Monitor performance, view heatmaps of question difficulty, and auto-grade submissions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-20 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg italic text-gray-600">
            “Switching to this platform cut our exam processing time in half. The integrity features are top-notch.”
          </p>
          <div className="mt-6">
            <img
              src="https://randomuser.me/api/portraits/women/47.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">Dr. Maya Patel</p>
            <p className="text-sm text-gray-500">Dean, BrightFuture University</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-4">Start Conducting Smart Exams Today</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Create your first exam in minutes. Secure. Scalable. Reliable.
        </p>
        <a
          href="/demo"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Book a Demo
        </a>
      </section>
    </div>
  );
};

export default OnlineExam;
