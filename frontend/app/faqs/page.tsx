"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar"; // Import Navbar from components folder
import Footer from "../components/Footer"; // Import Footer from components folder

// Define the FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of printing, packaging, branding and publishing services eg business cards, flyers, brochures, banners, books etc",
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order through our website by selecting your desired product, uploading your design, and following the checkout process. Alternatively, you can contact us directly for personalized assistance",
    },
    {
      question: "What file formats do you accept for design submission?",
      answer: "We accept Corel Draw (CDR), PDF, JPEG, EPS, PSD and PNG.",
    },
    {
      question: "Can you help with design of my prints?",
      answer: "Yes, a designer can be assigned to you at a cost.",
    },
    {
      question: "Do you provide samples before placing a large order?",
      answer: "Yes, we can provide samples of our products at a cost. Contact us to discuss your needs and we will arrange for sample prints.",
    },
    {
      question: "Do you offer delivery services?",
      answer: "Yes, we offer delivery services both locally and nationwide. Delivery times and costs vary based on location and the size of order.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order on our website after signing up and requesting a quote for a service.",
    },
    {
      question: "What is your return and refund policy?",
      answer: "If you receive a defective or incorrect order, please contact us within 48 hours of delivery, we will assess the issue and provide a response.",
    },
    {
      question: "Can I make changes to my order after it has been placed?",
      answer: "Changes can be made to your order if it has not yet entered production. Please contact us as soon as possible to make any adjustments.",
    },
    {
      question: "What are your payment options?",
      answer: "There's a whole process on our website that makes payment smooth and easy.",
    },
    {
      question: "How do I ensure my design prints are correct?",
      answer: "To ensure the best print quality, please submit high-resolution files and use the correct dimensions. If you need assistance, our team can provide guidelines or review your design before printing.",
    },
    {
      question: "Do you offer bulk order discounts?",
      answer: "Yes, we offer discounts for bulk orders.",
    },
    {
      question: "What are your business hours?",
      answer: "Our business hours are Mondays-Fridays (9am-7pm), Saturdays (9:30am-7pm). We are closed on Sundays and public holidays.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team via email at info@printshopnaija.com.ng or by phone at 08035157299. We aim to respond to all inquiries within 24 hours.",
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Sign Up' button located in the top right corner of our website. Follow the prompts to complete the registration process.",
    },
  ];

  const toggleAccordion = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add Navbar at the top */}
      <Navbar />

      {/* FAQ Content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq: FAQItem, index: number) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-4 flex items-center justify-between focus:outline-none"
              >
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-blue-500" />
                  {faq.question}
                </span>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-50">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Add Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default FAQ;