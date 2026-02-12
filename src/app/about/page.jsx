"use client";
import React from "react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/ui/Footer";
import { motion } from "motion/react";
import TeamMemberCard from "../../components/TeamMemberCard";

// Team member data - Kush Tech Nepal
const teamMembers = [
  {
    name: "Er. Prabesh Dahal",
    position: "Chief Executive Officer (CEO)",
    description:
      "Leads Kush Tech Nepal with a vision for innovation and excellence in IT services and consulting.",
    image: "/profiles/Prabesh_Dahal.jpg", // Add actual photo if available
    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Er. Prabesh Regmi",
    position: "Chief Technology Officer (CTO)",
    description:
      "Oversees technology strategy and implementation, ensuring cutting-edge solutions for clients.",
    image: "/profiles/Prabesh_reg.jpg",
    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Er. Rukesh Aalubanjar",
    position: "Chairman",
    description: "Guides the company with strategic direction and leadership.",
    image: "/profiles/Rukesh_aalubanjar.jpg",

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Prashant Kumar Karn",
    position: "Managing Director (MD)",
    description:
      "Manages operations and business development at Kush Tech Nepal.",
    image: "/profiles/Prashant.jpg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Nitish Ghimire",
    position: "Founder",
    description:
      "Co-founder and key contributor to the company's growth and vision.",
    image: "/profiles/Nitish.jpg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Ranjan Manandhar",
    position: "Founder",
    description: "Co-founder and part of the core leadership team.",
    image: "/profiles/Ranjan.jpg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Nikesh Rajbansha",
    position: "Founder",
    description: "Co-founder and part of the core leadership team.",
    image: "/profiles/Nikesh.jpg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Rojil Shrestha",
    position: "Founding Member & Senior Technology Advisor",
    description: "Part of the core leadership team.",
    image: "/profiles/Rojil-PP.jpeg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Anish Maharjan",
    position: "Founder",
    description:
      "Co-founder and valuable contributor to the company's foundation and growth.",
    linkedin: "",
    twitter: "",
    email: "",
  },
  {
    name: "Late Er. Rohit Khanal",
    position: "Founder",
    description:
      "Co-founder who made significant contributions to establishing Kush Tech Nepal's vision.",
    image: "/profiles/Rohit_khanal.jpg", // Add actual photo if available

    linkedin: "",
    twitter: "",
    email: "",
  },
];

export default function AboutPage() {
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Kush Tech Nepal is an IT services and consulting company established
            in 2018, headquartered at Lazimpath-02, Kathmandu. We are dedicated
            to providing innovative technology solutions, training, and research
            with a strong in-house team.
          </motion.p>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#004D2C]">
                  <img
                    src="/profiles/Rukesh_aalubanjar.jpg"
                    alt="Chairman Rukesh Aalubanjar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
                  Chairman's Message
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  "Welcome to Kush Tech Nepal. As Chairman, I am proud to lead a
                  team committed to IT services, training, and research. Our
                  mission is to empower businesses and individuals through
                  technology and education."
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Since 2018, we have built a reputation for excellence,
                  innovation, and trust. Our in-house team is dedicated to
                  delivering quality solutions and fostering a culture of
                  continuous learning.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Thank you for being part of our journey. We look forward to
                  shaping the future of technology together."
                </p>
                <div className="mt-6">
                  <p className="text-xl font-semibold text-[#004D2C]">
                    Er. Rukesh Aalubanjar
                  </p>
                  <p className="text-gray-400">Chairman</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#004D2C]">
                  <img
                    src="/profiles/Prabesh_Dahal.jpg"
                    alt="Chairman Rukesh Aalubanjar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
                  CEO's Message
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  "As the Chief Executive Officer of Kush Tech Nepal, I am
                  excited to share our vision of transforming the IT landscape
                  through innovation, excellence, and unwavering commitment to
                  our clients."
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Our journey since 2018 has been remarkable, driven by a
                  passion for technology and a dedication to providing
                  cutting-edge solutions. We believe in empowering businesses
                  through digital transformation while maintaining the highest
                  standards of quality and service.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  At Kush Tech Nepal, we don't just deliver IT services - we
                  build partnerships that drive growth and success. Our team's
                  expertise in consulting, training, and research ensures that
                  we stay at the forefront of technological advancement.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Thank you for trusting us with your technology needs.
                  Together, we will continue to innovate and create a brighter
                  digital future."
                </p>
                <div className="mt-6">
                  <p className="text-xl font-semibold text-[#004D2C]">
                    Er. Prabesh Dahal
                  </p>
                  <p className="text-gray-400">
                    Chief Executive Officer (CEO){" "}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience
              and passion for creating exceptional digital experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
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
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "IT Services & Consultant",
                description:
                  "Providing expert IT services and consulting for businesses and organizations.",
                icon: "💻",
              },
              {
                title: "Kush Open Academy/Training Institution",
                description:
                  "Offering training and educational programs to empower the next generation of tech professionals.",
                icon: "🎓",
              },
              {
                title: "Research & Surveillance In-house Team",
                description:
                  "Dedicated in-house team for research, development, and surveillance solutions.",
                icon: "🔬",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
