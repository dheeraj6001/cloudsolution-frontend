
import {
  Users,
  Rocket,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';

const team = [
  {
    name: 'Alice Johnson',
    role: 'Founder & CEO',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Mark Thompson',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Sofia Lee',
    role: 'Lead Designer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'James Clark',
    role: 'Marketing Head',
    image: 'https://randomuser.me/api/portraits/men/63.jpg',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero */}
      <section className="relative bg-[url('https://source.unsplash.com/1600x900/?team,office')] bg-cover bg-center h-[60vh] flex items-center justify-center text-white">
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0" />
        <div className="z-10 relative text-center px-4">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Empowering innovation and connection through technology.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <Rocket className="text-blue-600 mx-auto mb-4" size={36} />
              <h3 className="font-semibold text-lg">Innovation</h3>
              <p className="text-sm text-gray-500">We innovate to shape the future of digital experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <Users className="text-blue-600 mx-auto mb-4" size={36} />
              <h3 className="font-semibold text-lg">Community</h3>
              <p className="text-sm text-gray-500">We build tools for people and with people.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <HeartHandshake className="text-blue-600 mx-auto mb-4" size={36} />
              <h3 className="font-semibold text-lg">Integrity</h3>
              <p className="text-sm text-gray-500">Honesty and trust drive our decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <ShieldCheck className="text-blue-600 mx-auto mb-4" size={36} />
              <h3 className="font-semibold text-lg">Security</h3>
              <p className="text-sm text-gray-500">Protecting data and users is a top priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          What began as a two-person startup in a small apartment quickly grew into a team of passionate thinkers,
          builders, and problem-solvers. Our journey is defined by curiosity, determination, and the belief that technology
          can uplift communities and reshape the way we connect.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          <div>
            <p className="text-4xl font-bold text-blue-600">5M+</p>
            <p className="text-sm text-gray-500">Users Worldwide</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">150+</p>
            <p className="text-sm text-gray-500">Countries Served</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">8 Years</p>
            <p className="text-sm text-gray-500">In Business</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600">24/7</p>
            <p className="text-sm text-gray-500">Customer Support</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-center text-white px-4">
        <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
        <p className="mb-6 text-lg">We’re always looking for talented, curious people to join our team.</p>
        <a
          href="/careers"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          View Careers
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
