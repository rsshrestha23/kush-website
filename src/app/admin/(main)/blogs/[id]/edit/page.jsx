import { notFound } from "next/navigation";
import clientPromise from "../../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import BlogForm from "../../../../../../components/admin/BlogForm";

async function getBlog(id) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const client = await clientPromise;
    const db = client.db("kushtechnepal");
    const blogsCollection = db.collection("blogs");

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function EditBlogPage({ params }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  return <BlogForm initialData={blog} isEditing={true} />;
}
