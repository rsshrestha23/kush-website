import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import BlogForm from '@/components/admin/BlogForm';
import { BlogFormData } from '@/types/blog';

async function getBlog(id: string): Promise<(BlogFormData & { _id: string }) | null> {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return blog as unknown as BlogFormData & { _id: string };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return <BlogForm initialData={blog as BlogFormData & { _id: string }} isEditing={true} />;
} 