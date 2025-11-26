import { useState } from 'react';
import { Menu, X, FileText, Clock, Users, Monitor, Shield, CheckCircle, Globe, CreditCard, MessageSquare, Mail, Upload,  Settings, ChevronRight, Play } from 'lucide-react';

export default function ExamRankers() {
  const [menuOpen, setMenuOpen] = useState(false);

  const conventionalFeatures = [
    { icon: FileText, text: 'Create Question Paper' },
    { icon: Clock, text: 'Reach Center @ Fixed Date/Time' },
    { icon: Users, text: 'Physical Invigilation' },
    { icon: FileText, text: 'Take Pen & Paper Exam' },
    { icon: Clock, text: 'Results After Months' },
    { icon: CheckCircle, text: 'Manual Grading' },
  ];

  const modernFeatures = [
    { icon: Monitor, text: 'Configure Online Exam' },
    { icon: Shield, text: 'Online Invigilation & Proctoring' },
    { icon: CheckCircle, text: 'Automatic Grading' },
    { icon: Globe, text: 'Take Exam Anytime, Anywhere' },
    { icon: Clock, text: 'Real-time Results' },
    { icon: CreditCard, text: 'Cost Effective' },
  ];

  const softwareFeatures = [
    { icon: Globe, title: 'Access anywhere', desc: 'Being online allows you and your respondents to access, administer and take your quizzes from anywhere at anytime.' },
    { icon: Settings, title: 'End-to-end Exam Management', desc: 'An all-in-one platform to conduct, invigilate and evaluate exams.' },
    { icon: CheckCircle, title: 'Auto-grading', desc: 'ExamRankers can automatically mark and grade your assessments, saving you the time to concentrate on whats important.' },
    { icon: Upload, title: 'Subjective Questions Support', desc: 'Upload long answer type questions PDF and Images Formats.' },
    { icon: Clock, title: 'Timed tests', desc: 'With ExamRankers it is easy to set a time limit or allow your learners an unlimited amount of time to complete your assessment.' },
    { icon: Users, title: 'Public and Private quizzes', desc: 'Tests can either be published privately to a select group or open them up to everyone with a single link and registration page.' },
  ];

  const antiCheatFeatures = [
    { title: 'Student Authentication', desc: 'Multi-factor authentication technology to eliminate the risk of student impersonation.' },
    { title: 'Proctoring Technology', desc: 'A comprehensive human-based and AI-based proctoring technology – Live proctoring, auto proctoring and record and review proctoring.' },
    { title: 'Secure Exam Browser', desc: 'Secure browser lockdown technology that sanitizes students\' computers by disabling additional tabs, browsers, external ports, etc.' },
  ];

  const additionalFeatures = [
    { icon: Monitor, title: 'White label software', desc: 'We offer software that features your name and brand.' },
    { icon: CreditCard, title: 'Payment Gateway Integration', desc: 'A custom payment gateway integrates.' },
    { icon: Globe, title: 'Custom Domain & Subdomain', desc: 'We use your Branded Domain or Subdomain.' },
    { icon: MessageSquare, title: 'Push Messaging', desc: 'Push messages are text messages sent to your device.' },
    { icon: Mail, title: 'Mail and SMS Integration', desc: 'Mail and SMS API Integration Option Available.' },
    { icon: Upload, title: 'Easy Question Handling', desc: 'We provide easiest uploading question technique.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">ExamRankers</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About Us', 'Features', 'Online Exam', 'Pricing', 'Contact Us'].map(item => (
              <a key={item} href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">{item}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-2">
            {['Home', 'About Us', 'Features', 'Online Exam', 'Pricing', 'Contact Us'].map(item => (
              <a key={item} href="#" className="block py-2 text-gray-600">{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All in One - Education ERP for Schools, Colleges and Universities</h1>
            <p className="text-xl text-orange-400 font-semibold mb-2">Campus Management Software</p>
            <p className="text-xl text-orange-400 font-semibold mb-6">Learning Management Systems</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2">
              <Play className="w-4 h-4" /> TRY FOR FREE
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-20 absolute -top-4 -right-4"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <Monitor className="w-24 h-24 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">A Comparison of Conventional Testing and The Modern Online Testing Systems</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-gray-400">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-700">Conventional Testing</h3>
              <div className="grid grid-cols-2 gap-4">
                {conventionalFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <f.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-center mb-6 text-orange-600">Modern Online Testing</h3>
              <div className="grid grid-cols-2 gap-4">
                {modernFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <f.icon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-700">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">Our Online Exams Software Features</h2>
          <p className="text-center text-gray-600 mb-12">Use Our Robust Exam Software With Integrated Tools And Industry-leading Features</p>
          <div className="grid md:grid-cols-3 gap-6">
            {softwareFeatures.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group hover:border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <f.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">A platform designed for education</h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="space-y-4">
              {[
                'You can easily administer and take exams using online exam software and an internet browser.',
                'Many universities are using more and more online exam software. According to a study published in the Journal of Higher Education, more than 40% of Indian postsecondary institutions using online exam software.',
                'Online exam software is the best choice if you\'re a teacher looking for something to help you evaluate students online.',
                'The online exam software from ExamRankers provides all the features you require without any of the disadvantages.',
                'ExamRankers has made sure that exams are compatible with a variety of devices, including computers, tablets, and smart phones.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">{text}</p>
                </div>
              ))}
            </div>
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              GET A DEMO
            </button>
          </div>
        </div>
      </section>

      {/* Anti-cheating Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">Our Online Examination System Features New-Age Anti-cheating Technology</h2>
          <p className="text-center text-gray-600 mb-12">Our Suite of Online Proctoring Services Ensures Cheating-Free Online Exams</p>
          <div className="grid md:grid-cols-3 gap-6">
            {antiCheatFeatures.map((f, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-orange-100 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a href="#" className="text-orange-500 font-semibold hover:underline flex items-center justify-center gap-2">
              EXPLORE OUR PROCTORING FEATURES <ChevronRight className="w-4 h-4" />
            </a>
          </p>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">When You Signup With Us, You Get Many Other Features Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalFeatures.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-500 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Trusted by More Than 1000 Clients Worldwide</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="text" placeholder="Enter Your Name" className="px-4 py-3 rounded-lg w-full md:w-auto" />
            <input type="text" placeholder="Enter Your Mobile" className="px-4 py-3 rounded-lg w-full md:w-auto" />
            <input type="email" placeholder="Enter Your Email" className="px-4 py-3 rounded-lg w-full md:w-auto" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">Submit</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Teaching App</a></li>
              <li><a href="#" className="hover:text-orange-500">LMS Software</a></li>
              <li><a href="#" className="text-orange-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">PRODUCTS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Online Exam Software</a></li>
              <li><a href="#" className="hover:text-orange-500">Recruitment Assessments</a></li>
              <li><a href="#" className="hover:text-orange-500">Psychometric Tests</a></li>
              <li><a href="#" className="hover:text-orange-500">Programming Tests</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">OTHERS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Online Learning</a></li>
              <li><a href="#" className="hover:text-orange-500">Help & Support</a></li>
              <li><a href="#" className="hover:text-orange-500">Test Library</a></li>
              <li><a href="#" className="text-orange-500">Test Store</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">RESOURCES</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Gallery</a></li>
              <li><a href="#" className="hover:text-orange-500">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500">Ebooks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">CALL US</h4>
            <p className="text-sm mb-2">Email id:</p>
            <p className="text-orange-500 text-sm mb-4">info@examrankers.com</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold text-sm">TAKE TEST</button>
          </div>
        </div>
      </footer>
    </div>
  );
}