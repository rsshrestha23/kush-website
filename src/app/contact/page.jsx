"use client";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/ui/Footer";
import { motion } from "motion/react";

// Contact information
const contactInfo = [
  {
    icon: "📍",
    title: "Our Location",
    details: ["Lazimpath-02", "Kathmandu, Nepal 44600"],
    link: "https://maps.app.goo.gl/R3kVxZ4jSVBa1auYA",
    linkText: "View on Map",
  },
  {
    icon: "📧",
    title: "Email Us",
    details: ["info@kushtechnepal.com"],
    link: "mailto:info@kushtechnepal.com",
    linkText: "Send Email",
  },
  {
    icon: "📞",
    title: "Call Us",
    details: ["9843962188", "Mon-Fri: 9AM-6PM"],
    link: "tel:9843962188",
    linkText: "Call Now",
  },
  {
    icon: "💬",
    title: "Social Media",
    details: ["Facebook: /kushtechnepal"],
    link: "https://www.facebook.com/kushtechnepal",
    linkText: "Connect With Us",
  },
];

// FAQ data
const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer comprehensive web development, mobile app development, UI/UX design, cloud services, digital marketing, and IT consulting services to help businesses grow digitally.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer ongoing support and maintenance packages to ensure your solutions continue to perform optimally. This includes updates, security patches, and technical support.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing is project-based and depends on the scope, complexity, and requirements. We provide detailed quotes after understanding your specific needs during the discovery phase.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely! We work with clients worldwide and have experience in various industries and markets. We can accommodate different time zones and communication preferences.",
  },
  {
    question: "Can you help with existing projects?",
    answer:
      "Yes, we can help improve, maintain, or scale existing projects. We'll assess your current setup and provide recommendations for optimization and enhancement.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Contact submission error:", result.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Contact submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#004D2C]/20 via-[#006D3F]/20 to-[#004D2C]/10"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Let's discuss your project and create something amazing together
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to help you bring your ideas to life. Reach out to us
              through any of these channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#004D2C]/50 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col min-h-[270px] md:min-h-[300px] lg:min-h-[320px] justify-between">
                  <div>
                    <div className="text-5xl mb-6">{info.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {info.title}
                    </h3>
                    <div className="space-y-2 mb-6">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full text-center"
                    >
                      {info.linkText}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900/30 to-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">
                      Mobile Development
                    </option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="cloud-services">Cloud Services</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="it-consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-[#004D2C] focus:outline-none focus:ring-2 focus:ring-[#004D2C]/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, requirements, timeline, and budget..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-400">
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400">
                      Sorry, there was an error sending your message. Please try
                      again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
                  Visit Our Office
                </h2>
                <p className="text-gray-300 mb-6">
                  Come visit us at our office in Kathmandu. We'd love to meet
                  you in person and discuss your project over coffee.
                </p>
              </div>

              {/* Interactive Map */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 h-96 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3869867674083!2d85.31755731455143!3d27.70589558279815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74812d201e50bce0!2sLazimpat%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1639471234567!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kush Tech Nepal Office Location"
                />

                {/* Map Overlay with Link */}
                <div className="relative -mt-16 mx-4 mb-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-gray-600/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Kush Tech Nepal
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Lazimpath-02, Kathmandu
                        </p>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/R3kVxZ4jSVBa1auYA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#004D2C] hover:bg-[#006D3F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Office Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
              >
                <h3 className="text-xl font-bold mb-4 text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
