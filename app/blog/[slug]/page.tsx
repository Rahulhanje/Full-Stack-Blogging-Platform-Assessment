'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { trpc } from '../../../lib/providers';
import { LoadingState } from '../../../components/LoadingSpinner';
import { ErrorState } from '../../../components/ErrorState';
import { formatDate, calculateReadingTime } from '../../../lib/utils';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: post, isLoading, error, refetch } = trpc.posts.getBySlug.useQuery(slug);
  const { data: categories } = trpc.posts.getCategories.useQuery(post?.id || 0, {
    enabled: !!post?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
          <LoadingState message="Loading blog post..." />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
          <ErrorState 
            title="Post not found"
            message="The blog post you're looking for doesn't exist or has been removed." 
            onRetry={() => refetch()}
          />
          <div className="text-center mt-4">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              ← Back to Blog
            </Link>
          </div>
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            ← Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {formatDate(post.createdAt)}
            </time>
            <span>•</span>
            <span>{calculateReadingTime(post.content)} min read</span>
            {new Date(post.updatedAt).getTime() !== new Date(post.createdAt).getTime() && (
              <>
                <span>•</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.id}`}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-4">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Post Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enjoyed this post?
            </h3>
            <div className="space-x-4">
              <Link
                href="/blog"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
              >
                Read More Posts
              </Link>
              <Link
                href="/dashboard"
                className="border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-md font-medium"
              >
                Write Your Own
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}