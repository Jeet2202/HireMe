import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

// Font Awesome React Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faBrain,
  faUsersCog,
  faBell,
  faStar,
  faMobileAlt,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

// Feature list (Open/Closed: extensible without modifying logic)
const FEATURES = [
  { icon: faShieldAlt, title: "Secure Verification" },
  { icon: faBrain, title: "Smart Matching" },
  { icon: faUsersCog, title: "Role-Based Access" },
  { icon: faBell, title: "Real-Time Updates" },
  { icon: faStar, title: "Quality System" },
  { icon: faMobileAlt, title: "Mobile Access" },
];

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero */}
      {/* Hero */}
<section 
  className="relative text-white pt-28 pb-24"
  style={{
    backgroundImage: `url('https://img.freepik.com/premium-photo/construction-team-working-site_1230717-256348.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  {/* Dark Overlay for Readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="container mx-auto px-6 relative z-10">
   <div className="max-w-3xl mx-auto text-center">

      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Connecting Contractors with Skilled Labourers
      </h1>

      <p className="text-lg mb-10 text-gray-200">
        A modern platform designed to streamline the construction workforce with secure verification and intelligent matching.
      </p>

      <div className="flex gap-4 justify-center">
        {/* Buttons or future actions go here */}
      </div>

    </div>


    {/* Scroll Indicator */}
    <div className="text-center mt-16 animate-bounce">
      <FontAwesomeIcon icon={faChevronDown} size="2x" className="text-yellow-400"/>
    </div>
  </div>
</section>


      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600">
              Essential tools for modern labour coordination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="text-4xl text-blue-500 mb-4">
                  <FontAwesomeIcon icon={f.icon} />
                </div>

                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600">
                  Finding Jobs made easy.
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">

          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <img
              src="https://picsum.photos/seed/construction-site/500/350"
              className="rounded-lg shadow-lg"
              alt="Construction site"
            />
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

            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Join Our Platform
            </Link>

          </div>

        </div>
      </section>
      
      {/* footer */}
      <section>
            <div>
              <Footer></Footer>
            </div>
      </section>

    </div>
  );
}

