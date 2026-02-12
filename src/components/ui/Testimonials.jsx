"use client";
import React from "react";
import { motion } from "motion/react";
import { IconStar, IconStarFilled, IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Solutions",
    image: "/team/placeholder-1.jpg", // You can add actual images later
    content:
      "Kush Tech Nepal transformed our vision into reality. Their web development expertise and attention to detail exceeded our expectations. The team delivered a beautiful, responsive website that significantly improved our online presence.",
    rating: 5,
    project: "E-commerce Platform",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCorp",
    image: "/team/placeholder-2.jpg",
    content:
      "Working with Kush Tech Nepal was a game-changer for our mobile app development. Their technical skills, communication, and dedication to quality are outstanding. They delivered on time and within budget.",
    rating: 5,
    project: "Mobile App Development",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    image: "/team/placeholder-3.jpg",
    content:
      "The team at Kush Tech Nepal provided exceptional IT consulting services. They helped us optimize our infrastructure and implement solutions that improved our efficiency by 40%. Highly recommended!",
    rating: 5,
    project: "IT Consulting",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Founder",
    company: "StartupHub",
    image: "/team/placeholder-4.jpg",
    content:
      "Kush Tech Nepal's training programs equipped our team with cutting-edge skills. The workshops were practical, engaging, and immediately applicable to our projects. Our development speed increased significantly.",
    rating: 5,
    project: "Team Training",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "UX Director",
    company: "DesignFirst",
    image: "/team/placeholder-5.jpg",
    content:
      "The UI/UX design work by Kush Tech Nepal was phenomenal. They created an intuitive, beautiful interface that our users love. The user engagement metrics improved dramatically after the redesign.",
    rating: 5,
    project: "UI/UX Design",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CTO",
    company: "CloudTech",
    image: "/team/placeholder-6.jpg",
    content:
      "Migrating to cloud infrastructure seemed daunting until we worked with Kush Tech Nepal. Their expertise in cloud solutions made the transition smooth and cost-effective. Our scalability issues are now resolved.",
    rating: 5,
    project: "Cloud Migration",
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 text-left flex flex-col justify-between h-full"
    >
      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-4">
        <IconQuote className="h-8 w-8 text-slate-400 opacity-60" />
        <div className="flex space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <IconStarFilled key={i} className="h-4 w-4 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Testimonial Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Client Info */}
      <div className="flex items-center space-x-4 mt-auto">
        <div className="w-12 h-12 bg-gradient-to-br from-[#004D2C] to-[#006D3F] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.role} at {testimonial.company}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Project: {testimonial.project}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with Kush Tech Nepal.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#004D2C] dark:text-[#006D3F] mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Projects Completed
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#004D2C] dark:text-[#006D3F] mb-2">
                30+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#004D2C] dark:text-[#006D3F] mb-2">
                5+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our
            technology solutions.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-[#004D2C] hover:bg-[#006D3F] text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-green-700/25"
          >
            Start Your Project Today
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
