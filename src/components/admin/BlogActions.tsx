'use client';

import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';

interface BlogActionsProps {
  blogId: string;
  blogTitle: string;
}

export default function BlogActions({ blogId, blogTitle }: BlogActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog deleted successfully');
        // Refresh the page to update the list
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the blog');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete blog"
    >
      <IconTrash className="w-4 h-4" />
    </button>
  );
} 