'use client';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { trpc } from '../../lib/providers';
import { LoadingState } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import { formatDate, calculateReadingTime } from '../../lib/utils';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '../../components/SearchBar';

function BlogPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const categoryFromUrl = searchParams.get('category');
  
  // Set category from URL if present
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(parseInt(categoryFromUrl));
    }
  }, [categoryFromUrl]);
  
  // Use search if query present, otherwise get all posts
  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = searchQuery 
    ? trpc.posts.search.useQuery({
        query: searchQuery,
        categoryId: selectedCategory,
        limit: 50,
      })
    : trpc.posts.getAll.useQuery({
        published: true,
        categoryId: selectedCategory,
      });

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();

  if (postsLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900">
        <LoadingState message="Loading blog posts..." />
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900">
        <ErrorState 
          message="Failed to load blog posts. Please try again." 
          onRetry={() => refetchPosts()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Blog'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          {searchQuery 
            ? `Found ${posts?.length || 0} post${posts?.length !== 1 ? 's' : ''} matching your search`
            : 'Discover insights, tutorials, and stories from our community'
          }
        </p>
        
        {searchQuery && (
          <div className="flex justify-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Search
            </Link>
          </div>
        )}
      </div>
      
      {/* Search Bar (Desktop only - mobile has it in navbar) */}
      <div className="hidden md:block mb-8">
        <div className="max-w-2xl mx-auto">
          <SearchBar placeholder="Search posts..." />
        </div>
      </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              All Posts
            </button>
            
            {!categoriesLoading && categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/50 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/70 transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {formatDate(post.createdAt)}
                    </time>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="text-gray-600 dark:text-gray-300">{children}</p>,
                        h1: ({ children }) => <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{children}</h3>,
                        h2: ({ children }) => <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200">{children}</h4>,
                        h3: ({ children }) => <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{children}</h5>,
                        code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-sm dark:text-gray-200">{children}</code>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-800 dark:text-gray-200">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                      }}
                    >
                      {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                    </ReactMarkdown>
                  </div>
                    <div className="flex items-center justify-between">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      Read more →
                    </Link>
                    <PostCategories postId={post.id} />
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory ? 'No posts in this category yet.' : 'No blog posts have been published yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    
  );
}

function PostCategories({ postId }: { postId: number }) {
  const { data: categories } = trpc.posts.getCategories.useQuery(postId);
  
  if (!categories || categories.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1">
      {categories.slice(0, 3).map((category) => (
        <span
          key={category.id}
          className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium"
        >
          {category.name}
        </span>
      ))}
      {categories.length > 3 && (
        <span className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
          +{categories.length - 3}
        </span>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
          <LoadingState message="Loading blog posts..." />
        </div>
      </div>
    }>
      <BlogPageContent />
    </Suspense>
  );
}