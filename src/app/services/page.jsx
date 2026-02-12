"use client";
import React from "react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/ui/Footer";
import { motion } from "motion/react";

// Services data
const services = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies",
    icon: "🌐",
    features: [
      "Responsive Design",
      "Frontend Development (React, Vue, Angular)",
      "Backend Development (Node.js, Python, PHP)",
      "E-commerce Solutions",
      "Content Management Systems",
      "Progressive Web Apps (PWA)",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android",
    icon: "📱",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-platform Development (React Native, Flutter)",
      "App Store Optimization",
      "Mobile UI/UX Design",
      "App Maintenance & Updates",
    ],
    technologies: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Firebase",
      "AWS",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience",
    icon: "🎨",
    features: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing & Prototyping",
      "Design Systems",
      "Brand Identity Design",
      "Usability Testing",
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "InVision",
      "Principle",
      "Framer",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    description: "Scalable cloud infrastructure and DevOps solutions",
    icon: "☁️",
    features: [
      "Cloud Infrastructure Setup",
      "AWS/Azure/GCP Services",
      "Serverless Architecture",
      "Container Orchestration",
      "CI/CD Pipeline Setup",
      "Cloud Security & Compliance",
    ],
    technologies: [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies to grow your business",
    icon: "📈",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) Advertising",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    technologies: [
      "Google Analytics",
      "Google Ads",
      "Facebook Ads",
      "Mailchimp",
      "HubSpot",
      "SEMrush",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "consulting",
    title: "IT Consulting",
    description:
      "Strategic technology consulting to optimize your business processes",
    icon: "💼",
    features: [
      "Technology Strategy",
      "Digital Transformation",
      "System Architecture Review",
      "Performance Optimization",
      "Security Audits",
      "Technology Training",
    ],
    technologies: [
      "Architecture Design",
      "Performance Monitoring",
      "Security Tools",
      "Analytics Platforms",
    ],
    color: "from-indigo-500 to-purple-500",
  },
];

// Process steps
const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We analyze your requirements, goals, and target audience to create a comprehensive project plan.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description:
      "Our design team creates wireframes, mockups, and interactive prototypes for your approval.",
    icon: "✏️",
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "We build your solution using best practices and conduct thorough testing at every stage.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Deployment & Launch",
    description:
      "We deploy your project to production and ensure everything runs smoothly.",
    icon: "🚀",
  },
  {
    step: "05",
    title: "Support & Maintenance",
    description:
      "We provide ongoing support, updates, and maintenance to keep your solution running optimally.",
    icon: "🛠️",
  },
];

export default function ServicesPage() {
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive digital solutions to transform your business and drive
            growth
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
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
              What We Offer
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From web development to digital marketing, we provide end-to-end
              solutions to help your business thrive in the digital age.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#004D2C]/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-[#004D2C]">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-300 flex items-center"
                        >
                          <span className="w-2 h-2 bg-[#004D2C] rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-[#004D2C]">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-start">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#004D2C] to-[#006D3F] text-white`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900/30 to-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Our Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We follow a proven methodology to deliver exceptional results on
              time and within budget.
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-16 left-20 right-20 h-0.5 bg-gradient-to-r from-[#004D2C] via-[#006D3F] to-[#004D2C] z-0"></div>

              <div className="flex justify-between items-start relative z-10">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center max-w-xs text-center"
                  >
                    {/* Circle with Icon */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#004D2C] to-[#006D3F] flex items-center justify-center text-3xl mb-6 shadow-lg border-4 border-gray-900 relative z-10">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-[#004D2C]">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6"
              >
                {/* Circle with Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#004D2C] to-[#006D3F] flex items-center justify-center text-2xl shadow-lg">
                    {step.icon}
                  </div>
                  {/* Vertical line for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-[#004D2C] to-[#006D3F] mx-auto mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="text-xl font-bold text-[#004D2C] mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Expert Team",
                description:
                  "Experienced professionals with deep expertise in their respective fields.",
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                description:
                  "Quick turnaround times without compromising on quality and attention to detail.",
              },
              {
                icon: "🛡️",
                title: "Quality Assurance",
                description:
                  "Rigorous testing and quality control processes to ensure flawless delivery.",
              },
              {
                icon: "🤝",
                title: "Ongoing Support",
                description:
                  "Continuous support and maintenance to keep your solutions running optimally.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a custom
              solution that drives results for your business.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-block shadow-lg hover:shadow-green-700/25"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
