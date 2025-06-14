import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    if (statusType === "success") {
      const timer = setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      setStatus("Bot detected.");
      setStatusType("error");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all the fields.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xblyovzp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("Thank you for your message! We'll get back to you shortly.");
        setStatusType("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("Something went wrong. Please try again later.");
      setStatusType("error");
    }
  };

  return (
    <div className="bg-transparent font-poiretone text-white w-full flex justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Left Column */}
        <div className="w-full flex justify-center p-2">
          <div>
            <h2 className="text-5xl text-center mb-4">Contact</h2>
            <p className="text-lg mt-2 text-center">
              You can contact me via my social media, email, or the contact form, and I will make sure to get back to you asap.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex justify-center p-6 pt-0">
          <form
            className="w-full max-w-2xl bg-transparent rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            {status && (
              <p className={`text-center mb-4 text-lg font-semibold ${statusType === "success" ? "text-green-400" : "text-red-400"}`}>
                {status}
              </p>
            )}

            {/* Name */}
            <div className="mb-4">
              <label className="block text-xl font-medium mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 md:p-4 text-black rounded-lg"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xl font-medium mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 md:p-4 text-black rounded-lg"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-xl font-medium mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-10 text-black rounded-lg"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Honeypot (hidden) */}
            <div style={{ display: "none" }}>
              <label htmlFor="honeypot" className="text-white">Leave this field empty</label>
              <input
                id="honeypot"
                name="honeypot"
                type="text"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {/* Icons + Submit button inline */}
            <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
              <div className="flex space-x-4 items-center">
                <a 
                href="https://www.instagram.com/nasos.nocturn/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="hover:text-pink-500 transition-colors duration-200">
                  <FaInstagram size={50} />
                </a>
                <a 
                href="https://www.linkedin.com/in/nasos-pechlivanidis-40a917177/"
                target="_blank"
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="hover:text-blue-600 transition-colors duration-200" >
                  <FaLinkedin size={50} />
                </a>
                <a 
                href="https://www.youtube.com/@NocturnalAudioWorks" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube" 
                className="hover:text-red-500 transition-colors duration-200"
                >
                  <FaYoutube size={50} />
                </a>
                <a
                  href="https://www.international-sound-directory.com/talent/athanasios-pechlivanidis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="International Sound Directory"
                  className="transition-opacity duration-200 hover:opacity-50"
                >
                  <img
                    src="https://www.international-sound-directory.com/wp-content/uploads/2024/01/logo.svg"
                    alt="International Sound Directory"
                    className="w-16 h-16 rounded"
                  />
                </a>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-4 rounded-lg text-xl"
              >
                Send Message
              </button>
            </div>
          <div className="mt-4">
              <p className="text-xl">
                <a href="mailto:nasospechlivanidis@gmail.com" className="hover:underline">
                  nasospechlivanidis@gmail.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
