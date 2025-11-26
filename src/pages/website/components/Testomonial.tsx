const Testimonial = () => {
  return (
<section className="bg-white py-12 px-4">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>

    <div className="grid gap-8 md:grid-cols-3">
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">"This platform has completely transformed our business operations. Highly recommended!"</p>
        <div className="flex items-center justify-center space-x-3">
          <img src="https://i.pravatar.cc/50?img=1" alt="User 1" className="w-10 h-10 rounded-full" />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Jane Doe</p>
            <p className="text-xs text-gray-500">CEO, ExampleCorp</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">"Incredible service and support. I feel like I'm part of their team."</p>
        <div className="flex items-center justify-center space-x-3">
          <img src="https://i.pravatar.cc/50?img=2" alt="User 2" className="w-10 h-10 rounded-full" />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">John Smith</p>
            <p className="text-xs text-gray-500">Marketing Manager</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">"The UI is intuitive and the performance is great. 10/10 experience!"</p>
        <div className="flex items-center justify-center space-x-3">
          <img src="https://i.pravatar.cc/50?img=3" alt="User 3" className="w-10 h-10 rounded-full" />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Alice Brown</p>
            <p className="text-xs text-gray-500">Freelance Designer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Testimonial;
