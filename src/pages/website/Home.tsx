import BannerSlider from './components/BannerSlider';
import NewsTicker from './components/NewsTicker';
import Testomonial from './components/Testomonial';


const Home = () => {

  return (
    <div>
      <BannerSlider/>
      <NewsTicker/>
      <Testomonial/>
      <section className="bg-blue-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Connect. Grow. Advance.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            A modern professional network for students and professionals. Create your profile, build your brand, and discover real opportunities.
          </p>
          <a
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Build a Personal Brand</h3>
            <p className="text-gray-600">Your digital resume: showcase projects, achievements, and aspirations.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Network Smarter</h3>
            <p className="text-gray-600">Connect with like-minded peers, mentors, and industry leaders.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Find Real Opportunities</h3>
            <p className="text-gray-600">Internships, gigs, and full-time roles tailored to your profile.</p>
          </div>
        </div>
      </section>

      {/* SCREENSHOT PREVIEW */}
      <section className="py-20 bg-gray-100 px-4"><div className="max-w-6xl mx-auto text-center"><h2 className="text-3xl font-bold mb-10">Why Choose Our Test Series?</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left"><div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"><div className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock text-blue-600" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg></div><h3 className="font-semibold text-lg mb-2">Flexible Timing</h3><p className="text-sm text-gray-600">Take tests anytime, anywhere at your convenience.</p></div><div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"><div className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-target text-blue-600" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></div><h3 className="font-semibold text-lg mb-2">Personalized Feedback</h3><p className="text-sm text-gray-600">Get detailed analysis and suggestions after each test.</p></div><div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"><div className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users text-blue-600" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg></div><h3 className="font-semibold text-lg mb-2">Compete Globally</h3><p className="text-sm text-gray-600">Compare scores with thousands of aspirants across the country.</p></div><div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"><div className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star text-blue-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg></div><h3 className="font-semibold text-lg mb-2">Curated by Experts</h3><p className="text-sm text-gray-600">Test series created by top educators &amp; exam toppers.</p></div></div></div></section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-8">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic">
                "Lindlin helped me land my first internship. The connections I made here are game-changers!"
              </p>
              <p className="mt-4 font-semibold text-gray-900">— Priya, CS Student</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic">
                "A beautifully simple platform for networking and showing off my portfolio."
              </p>
              <p className="mt-4 font-semibold text-gray-900">— Ahmed, UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
          <p className="mb-6">Get updates on features, job alerts, and success stories straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-2 rounded-md w-full sm:w-2/3 text-black"
            />
            <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;


