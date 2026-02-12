"use client";
import React from "react";
import { StickyScroll } from "../components/ui/StickyScroll";

const content = [
  {
    title: "Web Development",
    description:
      "We create stunning, responsive websites that drive results. From modern single-page applications to complex e-commerce platforms, our web development team delivers cutting-edge solutions using the latest technologies like React, Next.js, and Node.js. Every website we build is optimized for performance, SEO, and user experience.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">🌐</div>
          <div className="text-xl font-semibold">Modern Web Solutions</div>
          <div className="text-sm mt-2 opacity-90">
            React • Next.js • TypeScript
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Application Development",
    description:
      "Transform your ideas into powerful applications. We specialize in building scalable mobile and desktop applications that solve real business problems. Whether it's iOS, Android, or cross-platform solutions, our development team ensures your app stands out with intuitive design and robust functionality.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">📱</div>
          <div className="text-xl font-semibold">Native & Cross-Platform</div>
          <div className="text-sm mt-2 opacity-90">
            React Native • Flutter • Swift
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "IT Consulting",
    description:
      "Strategic technology guidance to accelerate your business growth. Our expert consultants help you make informed decisions about technology investments, digital transformation, and system architecture. We analyze your current infrastructure and provide roadmaps for optimization and scalability.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">💼</div>
          <div className="text-xl font-semibold">Strategic Technology</div>
          <div className="text-sm mt-2 opacity-90">
            Architecture • Optimization • Growth
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Training & Workshops",
    description:
      "Empower your team with cutting-edge skills through our comprehensive training programs. From coding bootcamps to advanced technology workshops, we provide hands-on learning experiences tailored to your organization's needs. Our certified instructors ensure your team stays ahead of industry trends.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">🎓</div>
          <div className="text-xl font-semibold">Skill Development</div>
          <div className="text-sm mt-2 opacity-90">
            Bootcamps • Workshops • Mentorship
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "Create exceptional user experiences with our design expertise. We craft intuitive interfaces that delight users and drive engagement. Our design process combines user research, wireframing, prototyping, and testing to ensure every interaction is meaningful and impactful.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--blue-500))] text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">🎨</div>
          <div className="text-xl font-semibold">User-Centered Design</div>
          <div className="text-sm mt-2 opacity-90">
            Figma • Prototyping • Research
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Cloud Solutions",
    description:
      "Scale your infrastructure with cloud-native solutions. We help businesses migrate to and optimize cloud platforms like AWS, Azure, and Google Cloud. Our cloud experts ensure high availability, security, and cost-effectiveness while implementing best practices for modern application deployment.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--teal-500),var(--cyan-500))] text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">☁️</div>
          <div className="text-xl font-semibold">Cloud Infrastructure</div>
          <div className="text-sm mt-2 opacity-90">
            AWS • Azure • Kubernetes
          </div>
        </div>
      </div>
    ),
  },
];

export default function StickyContent() {
  return (
    <div className="w-screen h-screen">
      <StickyScroll content={content} />
    </div>
  );
}
