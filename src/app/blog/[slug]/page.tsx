"use client";
import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { IconArrowLeft, IconCalendar, IconUser, IconTag } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/ui/footer';
import { Blog } from '@/types/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params Promise
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${resolvedParams.slug}`); // API route handles both ID and slug
        
        if (response.status === 404) {
          notFound();
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading blog post...</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Blog</h2>
            <p className="text-gray-300 mb-8">{error}</p>
            <Link
              href="/blog"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <IconArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                {blog.title}
              </h1>
              
              <div className="flex items-center justify-center text-gray-400 mb-6">
                <IconUser className="w-5 h-5 mr-2" />
                <span className="text-blue-400">{blog.author}</span>
                <span className="mx-3">•</span>
                <IconCalendar className="w-5 h-5 mr-2" />
                <span>{format(new Date(blog.publishedAt || blog.createdAt), 'MMM dd, yyyy')}</span>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center justify-center mb-8">
                  <IconTag className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
          >
            {blog.featuredImage && (
              <div className="relative">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <div 
                className="blog-content prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </motion.article>

          {/* Back to Blog CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <IconArrowLeft className="w-5 h-5 mr-2" />
              Back to All Articles
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 