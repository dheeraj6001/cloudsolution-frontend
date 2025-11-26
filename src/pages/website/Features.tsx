
import {
  Rocket,
  ShieldCheck,
  BarChart,
  Users,
  Smartphone,
  Cloud,
} from 'lucide-react';

const features = [
  {
    icon: <Rocket size={28} className="text-blue-600" />,
    title: 'Blazing Fast Performance',
    description: 'Experience top-tier speed with our optimized architecture built for scale and reliability.',
  },
  {
    icon: <ShieldCheck size={28} className="text-blue-600" />,
    title: 'Enterprise Security',
    description: 'We follow the latest security standards to ensure your data is always protected.',
  },
  {
    icon: <Users size={28} className="text-blue-600" />,
    title: 'Team Collaboration',
    description: 'Powerful tools for seamless collaboration and team management.',
  },
  {
    icon: <BarChart size={28} className="text-blue-600" />,
    title: 'Advanced Analytics',
    description: 'Make data-driven decisions with real-time insights and visual reports.',
  },
  {
    icon: <Smartphone size={28} className="text-blue-600" />,
    title: 'Mobile First',
    description: 'Enjoy a fully responsive, mobile-optimized experience on any device.',
  },
  {
    icon: <Cloud size={28} className="text-blue-600" />,
    title: 'Cloud Powered',
    description: 'Reliable infrastructure with 99.99% uptime across global data centers.',
  },
];

const Features = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero */}
      <section className="py-24 bg-gray-100 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features That Drive Results</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Built for teams and individuals who want speed, flexibility, and performance — without compromise.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img src="https://source.unsplash.com/600x400/?dashboard,analytics" alt="Analytics" className="rounded-xl shadow" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Visualize Insights in Real Time</h2>
              <p className="text-gray-600 text-lg">
                With built-in analytics, track performance and usage metrics across your projects effortlessly.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
            <img src="https://source.unsplash.com/600x400/?security,server" alt="Security" className="rounded-xl shadow" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Bank-Level Security, Always On</h2>
              <p className="text-gray-600 text-lg">
                Enjoy peace of mind with end-to-end encryption, SSO, and role-based access control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-20 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg italic text-gray-600">“This platform helped us increase our workflow efficiency by 3x. The support team is outstanding!”</p>
          <div className="mt-6">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">David Mason</p>
            <p className="text-sm text-gray-500">COO, GrowthTech</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white text-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Workflow?</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Start your free trial today or schedule a demo with one of our product experts.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default Features;
