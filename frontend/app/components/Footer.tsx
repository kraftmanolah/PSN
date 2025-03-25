

"use client";

import React from "react";
import Image from "next/image";
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
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/images/logo.png"
            alt="Printshop Naija Logo"
            width={120} // Reduced from 150
            height={40} // Reduced from 50
            className="object-contain"
          />
          <p className="text-gray-400 text-sm mt-2">Your Ideas, Perfectly Printed!</p>
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

      {/* Horizontal Rule */}
      <hr className="border-gray-600 my-8" />

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm">
        © 2024 PrintShop Naija. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;