"use client";
import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/ui/Footer";
import { motion } from "motion/react";
import Link from "next/link";
import { IconHome, IconArrowLeft, IconSearch } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#004D2C]/20 via-[#006D3F]/20 to-[#004D2C]/10"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent mb-6">
              404
            </div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-4">
              Page Not Found
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <IconHome className="h-5 w-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold py-3 px-6 rounded-xl border border-gray-600 transition-all duration-300 transform hover:scale-105"
            >
              <IconArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </motion.div>
        </div>
      </section>

      {/* Helpful Links Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Looking for Something?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some popular pages that might help you find what you're
              looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Our Services",
                description:
                  "Explore our comprehensive range of technology solutions",
                link: "/services",
                icon: "🚀",
              },
              {
                title: "About Us",
                description: "Learn more about Kush Tech Nepal and our mission",
                link: "/about",
                icon: "👥",
              },
              {
                title: "Blog",
                description: "Read our latest insights and technology articles",
                link: "/blog",
                icon: "📝",
              },
              {
                title: "Contact Us",
                description: "Get in touch with our team for your next project",
                link: "/contact",
                icon: "📞",
              },
              {
                title: "Home",
                description: "Return to our homepage and explore our offerings",
                link: "/",
                icon: "🏠",
              },
              {
                title: "Search",
                description: "Search through our website for specific content",
                link: "#",
                icon: "🔍",
                onClick: () => {
                  // You can implement a search modal here
                  alert("Search functionality coming soon!");
                },
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#004D2C]/50 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 flex-grow">
                    {item.description}
                  </p>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full justify-center"
                    >
                      <IconSearch className="h-4 w-4" />
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full justify-center"
                    >
                      Visit {item.title}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900/30 to-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Still Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Contact us directly and we'll assist you
              in finding the right solution for your needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
