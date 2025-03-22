import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Printshop Naija</h3>
          <p className="text-gray-400 text-sm">Your Ideas, Perfectly Printed!</p>
        </div>

        {/* Column 2: Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Column 3: Account */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Account</h4>
          <ul className="space-y-2">
            <li>Login/Sign Up</li>
            <li>My Cart</li>
            <li>View Quotes</li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Subscribe to Our Newsletter
          </h4>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l text-black"
            />
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-r hover:bg-yellow-600 transition">
              Subscribe
            </button>
          </div>

          {/* Social Media Section */}
          <div className="mt-6 text-center md:text-left">
            <p className="text-sm font-semibold mb-3 text-gray-400">
              Follow us on:
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-yellow-500 transition">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="#" className="hover:text-yellow-500 transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="hover:text-yellow-500 transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="hover:text-yellow-500 transition">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        &copy; 2024 PrintShop Naija. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
