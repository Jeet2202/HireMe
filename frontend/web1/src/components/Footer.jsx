import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 px-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">HireMe</h2>
          <p className="mt-3 text-gray-400 leading-relaxed">
            HireMe is an AI-driven labour coordination platform that connects 
            verified labourers and contractors through seamless technology and 
            smart recommendations.
          </p>

          <div className="flex space-x-4 mt-4 text-xl">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Find Labourers</li>
            <li className="hover:text-white cursor-pointer">Verification</li>
            <li className="hover:text-white cursor-pointer">Help & Support</li>
          </ul>
        </div>

        {/* Company Details */}
        <div>
          <h3 className="text-xl font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Prime Build Technologies Pvt. Ltd.</li>
            <li>CIN: U72900MH2020PTC445900</li>
            <li>GST: 27ABCDE1234F1Z5</li>
            <li>ISO 9001:2015 Certified</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <p className="mt-4 text-gray-400">
            📍 Office: 4th Floor, CyberTech Park,<br />
            Andheri East, Mumbai, MH 400059
          </p>
          <p className="mt-2 text-gray-400">📞 Phone: +91 98765 43210</p>
          <p className="mt-2 text-gray-400">📧 Email: support@hireme.in</p>
          <p className="mt-2 text-gray-400">🕒 Mon – Sat: 9:00 AM – 7:00 PM</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HireMe — Prime Build Technologies Pvt. Ltd.  
        All rights reserved.
      </div>
    </footer>
  );
}
