import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      alert("Bot detected!");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the fields.");
      return;
    }

    alert("Thank you for your message! We'll get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      message: "",
      honeypot: "",
    });
  };

  return (
    <div className="bg-custom-gradient min-h-screen font-poiretone sm:flex text-white">
      {/* Left side - Contact info */}
      <div className="sm:w-1/3 flex flex-col justify-center items-center p-6">
        <div>
          <h2 className="text-4xl">Contact</h2>
          <p className="mt-4">
            You can contact me via my social media, email, or the contact form, and I will make sure to get back to you asap.
          </p>
        </div>
        <div className="mt-6 sm:mt-auto flex flex-col justify-end">
          <p className="text-lg">
            <a href="mailto:nasos@email.com" className="hover:underline">
              nasos@email.com
            </a>
          </p>
          <div className="flex space-x-4 items-center sm:mb-16">
            <a
              href="https://www.instagram.com"
              className="hover:text-pink-500 transition-colors duration-200"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.linkedin.com"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://www.youtube.com"
              className="hover:text-red-500 transition-colors duration-200"
            >
              <FaYoutube size={30} />
            </a>
            <a
              href="https://www.internationalsounddirectory.com"
              className="transition-opacity duration-200 hover:opacity-50"
            >
              <img
                src="https://www.international-sound-directory.com/wp-content/uploads/2024/01/logo.svg"
                alt="International Sound Directory"
                className="w-12 h-12 rounded"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="sm:w-2/3 p-6 flex items-start justify-center">
        <form
          className="w-full max-w-lg bg-transparent p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-black rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-black rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 text-black rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>

          <div style={{ display: "none" }}>
            <label htmlFor="honeypot" className="text-white">
              Leave this field empty
            </label>
            <input
              id="honeypot"
              name="honeypot"
              type="text"
              value={formData.honeypot}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
