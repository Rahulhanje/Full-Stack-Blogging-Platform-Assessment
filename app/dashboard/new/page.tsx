'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../../lib/providers';
import { useAuth } from '../../../lib/useAuth';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import ReactMarkdown from 'react-markdown';

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [preview, setPreview] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  const { data: categories } = trpc.categories.getAll.useQuery();

  const createPost = trpc.posts.create.useMutation({
    onSuccess: (post) => {
      router.push(`/dashboard`);
    },
    onError: (error) => {
      console.error('Create post error:', error);
      // More specific error messages
      if (error.data?.code === 'UNAUTHORIZED') {
        alert('You must be logged in to create a post. Redirecting to login...');
        router.push('/auth/signin');
      } else {
        alert(`Failed to create post: ${error.message}`);
      }
    },
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      if (createPost.isPending) return;

      await createPost.mutateAsync({
      title: title.trim(),
      content: content.trim(),
      published,
      categoryIds: Array.from(new Set(selectedCategories)),
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Post</h1>
          <p className="text-gray-600 dark:text-gray-400">Write and publish your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your post title..."
              required
            />
          </div>

        
          {categories && categories.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

        
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content (Markdown supported)
              </label>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 self-start sm:self-auto"
              >
                {preview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {preview ? (
              <div className="prose prose-sm sm:prose-lg max-w-none p-3 sm:p-4 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 min-h-64 sm:min-h-96 overflow-auto">
                {content ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-6 sm:mt-8 mb-3 sm:mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4 sm:mt-6 mb-2 sm:mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 mt-3 sm:mt-4 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{children}</li>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-3 sm:pl-4 italic text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{children}</blockquote>,
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-gray-200 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">{children}</code>
                        ) : (
                          <code className={`${className} block bg-gray-900 dark:bg-gray-950 text-gray-100 p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm`}>
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => <pre className="mb-3 sm:mb-4">{children}</pre>,
                      a: ({ children, href }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">{children}</a>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 italic text-sm">Nothing to preview yet...</div>
                )}
              </div>
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical text-sm sm:text-base"
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

     
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700/50 p-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Publish immediately
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {published 
                ? 'This post will be visible to everyone immediately.' 
                : 'This post will be saved as a draft and won\'t be visible to others.'}
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              disabled={createPost.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPost.isPending || !title.trim() || !content.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-md font-medium flex items-center"
            >
              {createPost.isPending && <LoadingSpinner size="sm" className="mr-2" />}
              {published ? 'Publish Post' : 'Save Draft'}
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
}