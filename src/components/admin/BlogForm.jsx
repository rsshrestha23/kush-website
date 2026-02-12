"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { IconDeviceFloppy, IconEye, IconEyeOff } from "@tabler/icons-react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function BlogForm({ initialData, isEditing = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      content: "",
      excerpt: "",
      author: "",
      tags: [],
      published: false,
    },
  });

  const watchedContent = watch("content");

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const url = isEditing ? `/api/blogs/${initialData?._id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          isEditing
            ? "Blog updated successfully!"
            : "Blog created successfully!",
        );
        router.push("/admin/blogs");
        router.refresh(); // Refresh server components
      } else {
        toast.error(result.error || "Failed to save blog");
      }
    } catch (error) {
      toast.error("An error occurred while saving the blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();

      if (value) {
        const currentTags = watch("tags") || [];
        if (!currentTags.includes(value)) {
          setValue("tags", [...currentTags, value]);
        }
        input.value = "";
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = watch("tags") || [];
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Blog" : "Create New Blog"}
          </h1>
          <p className="text-gray-600">
            {isEditing ? "Update your blog post" : "Write a new blog post"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {showPreview ? (
              <IconEyeOff className="w-4 h-4 mr-2" />
            ) : (
              <IconEye className="w-4 h-4 mr-2" />
            )}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700"
              >
                Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the blog post"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author *
              </label>
              <input
                {...register("author", { required: "Author is required" })}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div>
              <label
                htmlFor="featuredImage"
                className="block text-sm font-medium text-gray-700"
              >
                Featured Image URL
              </label>
              <input
                {...register("featuredImage")}
                type="url"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type tags and press Enter or comma"
                onKeyDown={handleTagInput}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {watch("tags")?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Published Status */}
            <div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="published"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Publish immediately
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Full-width Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content *
          </label>
          <div className="mt-1">
            {showPreview ? (
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50 min-h-[400px]">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: watchedContent }}
                />
              </div>
            ) : (
              <Controller
                name="content"
                control={control}
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <Editor value={field.value} onChange={field.onChange} />
                )}
              />
            )}
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconDeviceFloppy className="w-5 h-5 mr-2" />
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Update Blog"
                : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
