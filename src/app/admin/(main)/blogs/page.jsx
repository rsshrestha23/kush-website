import Link from "next/link";
import { IconPlus, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import clientPromise from "../../../../../../lib/mongodb";
import BlogActions from "../../../../../../components/admin/BlogActions";

async function getBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db("kushtechnepal");
    const blogsCollection = db.collection("blogs");

    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="w-4 h-4 mr-2" />
          New Blog
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Blog Posts</h2>
        </div>

        {blogs.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <div key={blog._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {blog.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          blog.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>By {blog.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      {blog.publishedAt && (
                        <>
                          <span>•</span>
                          <span>
                            Published:{" "}
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View blog"
                    >
                      <IconEye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit blog"
                    >
                      <IconEdit className="w-4 h-4" />
                    </Link>
                    <BlogActions
                      blogId={blog._id.toString()}
                      blogTitle={blog.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <IconPlus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new blog post.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <IconPlus className="w-4 h-4 mr-2" />
                New Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
