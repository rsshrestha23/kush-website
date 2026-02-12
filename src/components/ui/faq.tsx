"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown, IconChevronUp, IconQuestionMark } from "@tabler/icons-react";

const faqs = [
  {
    id: 1,
    question: "What services does Kush Tech Nepal provide?",
    answer: "We offer comprehensive technology solutions including web development, mobile app development, IT consulting, team training, UI/UX design, and cloud solutions. Our expertise spans from modern web applications using React and Next.js to native mobile apps and enterprise cloud infrastructure."
  },
  {
    id: 2,
    question: "How long does it typically take to complete a project?",
    answer: "Project timelines vary based on complexity and scope. A simple website takes 2-4 weeks, while complex web applications may take 2-4 months. Mobile apps typically require 3-6 months, and enterprise solutions can take 6-12 months. We provide detailed timelines during our initial consultation."
  },
  {
    id: 3,
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and required technologies. We provide detailed quotes after understanding your specific requirements. Contact us for a free consultation and estimate."
  },
  {
    id: 4,
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We provide different maintenance packages ranging from basic support to full-service maintenance with regular updates and monitoring."
  },
  {
    id: 5,
    question: "What technologies do you work with?",
    answer: "We work with modern technologies including React, Next.js, Node.js, TypeScript, Python, React Native, Flutter, AWS, Azure, Google Cloud, MongoDB, PostgreSQL, and more. We stay updated with the latest industry trends and choose the best technologies for each project."
  },
  {
    id: 6,
    question: "Can you help with existing projects or only new ones?",
    answer: "We can definitely help with existing projects! Whether you need to modernize legacy systems, add new features, fix bugs, improve performance, or migrate to new technologies, our team can assess your current setup and provide the best solutions."
  },
  {
    id: 7,
    question: "Do you work with international clients?",
    answer: "Yes, we work with clients globally. We have experience collaborating with teams across different time zones and use modern communication tools to ensure smooth project coordination. We're comfortable working with clients from the US, Europe, Australia, and other regions."
  },
  {
    id: 8,
    question: "What is your development process?",
    answer: "We follow an agile development methodology with regular milestones and client feedback. Our process includes: 1) Requirements gathering and planning, 2) Design and prototyping, 3) Development with regular updates, 4) Testing and quality assurance, 5) Deployment and launch, 6) Post-launch support and maintenance."
  },
  {
    id: 9,
    question: "Do you provide training for our team?",
    answer: "Absolutely! We offer comprehensive training programs including coding bootcamps, technology workshops, and skill development sessions. Our training can be customized for your team's specific needs and can cover various technologies, best practices, and modern development methodologies."
  },
  {
    id: 10,
    question: "How do we get started with a project?",
    answer: "Getting started is easy! Contact us through our website or email to schedule a free consultation. We'll discuss your project requirements, timeline, and budget. After that, we'll provide a detailed proposal and timeline. Once approved, we'll kick off the project with a comprehensive planning session."
  }
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: any; isOpen: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl mb-4 overflow-hidden hover:bg-slate-800/70 transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 text-left flex items-center justify-between group"
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-[#006D3F] transition-colors duration-200 pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconChevronDown className="h-5 w-5 text-[#006D3F]" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 border-t border-slate-700/30">
              <div className="pt-4">
                <p className="text-slate-300 leading-relaxed text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-20 bg-slate-950 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-slate-900 to-blue-900/10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#004D2C] to-[#006D3F] rounded-full flex items-center justify-center shadow-lg shadow-green-700/25">
              <IconQuestionMark className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Find answers to common questions about our services, process, and how we can help your business grow.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help. Get in touch with us for personalized answers to your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 77, 44, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#004D2C] to-[#006D3F] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-700/25"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 77, 44, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 border border-[#004D2C] text-[#004D2C] bg-white hover:bg-[#E6F4EE] font-semibold rounded-lg transition-colors duration-200 w-full sm:w-auto text-center"
              >
                View Our Services
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 