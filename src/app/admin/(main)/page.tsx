import { IconArticle, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import clientPromise from '@/lib/mongodb';

async function getBlogStats() {
  try {
    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    const totalBlogs = await blogsCollection.countDocuments();
    const publishedBlogs = await blogsCollection.countDocuments({ published: true });
    const draftBlogs = await blogsCollection.countDocuments({ published: false });

    const recentBlogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      recentBlogs,
    };
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return {
      totalBlogs: 0,
      publishedBlogs: 0,
      draftBlogs: 0,
      recentBlogs: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getBlogStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your blog management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconArticle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <IconEye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <IconEdit className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draftBlogs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <IconArticle className="w-4 h-4 mr-2" />
            Create New Blog
          </Link>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <IconEye className="w-4 h-4 mr-2" />
            View All Blogs
          </Link>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Blogs</h2>
        {stats.recentBlogs.length > 0 ? (
          <div className="space-y-4">
            {stats.recentBlogs.map((blog: any) => (
              <div key={blog._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{blog.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()} • {blog.author}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    blog.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <IconEdit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No blogs yet. Create your first blog!</p>
        )}
      </div>
    </div>
  );
} 