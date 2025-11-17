import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-white pt-24 pb-20 bg-gradient-to-br from-blue-500 to-blue-900">
        <div className="container mx-auto px-6">

          <div className="flex flex-col md:flex-row items-center">
            
            {/* Left */}
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeInUp">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Contractors with Skilled Labourers</h1>
              <p className="text-lg mb-8 text-blue-100">
                A modern platform designed to streamline the construction workforce with secure verification and intelligent matching.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition">
                  Get Started
                </Link>

                <a href="#features"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="md:w-1/2 flex justify-center animate-fadeInUp">
              <img src="https://picsum.photos/seed/construction-workers/500/350"
                className="rounded-lg shadow-xl" />
            </div>
          </div>

          <div className="text-center mt-12 animate-bounceCustom">
            <i className="fas fa-chevron-down text-2xl"></i>
          </div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">Essential tools for modern labour coordination</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "fa-shield-alt", title: "Secure Verification" },
              { icon: "fa-brain", title: "Smart Matching" },
              { icon: "fa-users-cog", title: "Role-Based Access" },
              { icon: "fa-bell", title: "Real-Time Updates" },
              { icon: "fa-star", title: "Quality System" },
              { icon: "fa-mobile-alt", title: "Mobile Access" },
            ].map((f, i) => (
              <div key={i}
                className="bg-gray-50 p-8 rounded-xl hover:-translate-y-1 hover:shadow-xl transition">
                <div className="text-4xl text-blue-500 mb-4"><i className={`fas ${f.icon}`}></i></div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600">Lorem ipsum placeholder text for now.</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">

          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <img src="https://picsum.photos/seed/construction-site/500/350"
              className="rounded-lg shadow-lg" />
          </div>

          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About HireMe</h2>
            <p className="text-lg text-gray-600 mb-6">
              HireMe is transforming how construction projects find and manage skilled labour.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              With secure verification and intelligent matching, we ensure efficiency.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Verified Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Active Contractors</div>
              </div>
            </div>

            <Link to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
              Join Our Platform
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}
