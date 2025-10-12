'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../../lib/providers';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [preview, setPreview] = useState(false);

  const { data: categories } = trpc.categories.getAll.useQuery();

  const createPost = trpc.posts.create.useMutation({
    onSuccess: (post) => {
      router.push(`/dashboard`);
    },
    onError: (error) => {
      alert(`Failed to create post: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      await createPost.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        published,
        categoryIds: selectedCategories,
      });
    } catch (error) {
      // Error is handled in onError
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Write and publish your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your post title..."
              required
            />
          </div>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content (Markdown supported)
              </label>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {preview ? (
              <div className="prose max-w-none p-4 border border-gray-200 rounded-md bg-gray-50 min-h-96">
                <div className="whitespace-pre-wrap">{content || 'Nothing to preview yet...'}</div>
              </div>
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Write your post content in Markdown...

# Example Heading
This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

> This is a blockquote

\`\`\`javascript
console.log('Hello, world!');
\`\`\`"
                required
              />
            )}
          </div>

          {/* Publish Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publish immediately
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {published 
                ? 'This post will be visible to everyone immediately.' 
                : 'This post will be saved as a draft and won\'t be visible to others.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              disabled={createPost.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPost.isPending || !title.trim() || !content.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium flex items-center"
            >
              {createPost.isPending && <LoadingSpinner size="sm" className="mr-2" />}
              {published ? 'Publish Post' : 'Save Draft'}
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}