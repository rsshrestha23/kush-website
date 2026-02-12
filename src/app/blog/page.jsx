"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  IconCalendar,
  IconUser,
  IconTag,
  IconArrowRight,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/ui/Footer";
import { createExcerpt } from "../../lib/utils";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Error Loading Blogs
            </h2>
            <p className="text-gray-300 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Insights, updates, and stories from the world of technology and
            innovation
          </motion.p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {blogs.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#004D2C] to-[#006D3F] bg-clip-text text-transparent">
                  Latest Articles
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Discover our latest thoughts, tutorials, and insights about
                  technology, development, and digital transformation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[#004D2C]/50 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                      {blog.featuredImage && (
                        <div className="relative overflow-hidden">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        </div>
                      )}

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <IconUser className="w-4 h-4 mr-1" />
                          <span className="text-[#004D2C]">{blog.author}</span>
                          <span className="mx-2">•</span>
                          <IconCalendar className="w-4 h-4 mr-1" />
                          <span>
                            {format(
                              new Date(blog.publishedAt || blog.createdAt),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#004D2C] transition-colors">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h3>

                        <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">
                          {blog.excerpt
                            ? createExcerpt(blog.excerpt, 150)
                            : createExcerpt(blog.content, 150)}
                        </p>

                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex items-center mb-6">
                            <IconTag className="w-4 h-4 text-gray-400 mr-2" />
                            <div className="flex flex-wrap gap-2">
                              {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#004D2C]/20 to-[#006D3F]/20 text-[#004D2C] border border-[#004D2C]/30"
                                >
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-xs text-gray-500 px-2 py-1">
                                  +{blog.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-[#004D2C] hover:text-[#006D3F] font-medium text-sm transition-colors group-hover:translate-x-1 transform duration-300"
                        >
                          Read more
                          <IconArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No blog posts yet
                </h3>
                <p className="text-gray-300 mb-8">
                  We're working on some amazing content for you. Check back soon
                  for our latest articles and insights about technology and
                  innovation.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-[#004D2C] to-[#006D3F] hover:from-[#006D3F] hover:to-[#004D2C] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Back to Home
                  <IconArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
