'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { trpc } from '../../lib/providers';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { LoadingState } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import SearchBar from '../../components/SearchBar';
import { formatDate, calculateReadingTime } from '../../lib/utils';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categoryParam ? parseInt(categoryParam) : undefined
  );

  const { data: searchResults, isLoading, error, refetch } = trpc.posts.search.useQuery({
    query: searchQuery,
    categoryId: selectedCategory,
    limit: 50,
  }, {
    enabled: !!searchQuery && searchQuery.length >= 2,
  });

  const { data: categories } = trpc.categories.getAll.useQuery();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [categoryParam]);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set('category', categoryId.toString());
    } else {
      params.delete('category');
    }
    router.push(`/search?${params.toString()}`);
  };

  if (!searchQuery) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Search Posts</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Enter a search term to find relevant blog posts
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder="Search posts..." />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900 min-h-screen">
        <LoadingState message={`Searching for "${searchQuery}"...`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900 min-h-screen">
        <ErrorState 
          message="Failed to search posts. Please try again." 
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Found {searchResults?.length || 0} post{searchResults?.length !== 1 ? 's' : ''} matching your search
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <SearchBar placeholder="Search posts..." />
        </div>
      </div>

      {/* Category Filter */}
      {categories && categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
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

      {/* Search Results */}
      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-700/70 transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="mb-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <div className="text-gray-600 dark:text-gray-300 mb-4 prose prose-sm line-clamp-4">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <span className="text-gray-600 dark:text-gray-300">{children}</span>,
                        h1: ({ children }) => <span className="font-medium">{children}</span>,
                        h2: ({ children }) => <span className="font-medium">{children}</span>,
                        h3: ({ children }) => <span className="font-medium">{children}</span>,
                        code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{children}</code>,
                        strong: ({ children }) => <strong className="font-medium">{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                      }}
                    >
                      {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                  <span>{calculateReadingTime(post.content)} read</span>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find any posts matching "{searchQuery}".
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Try different keywords or browse all posts.
            </p>
            <div className="mt-6">
              <Link 
                href="/blog" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Browse All Posts
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 dark:bg-gray-900 min-h-screen">
        <LoadingState message="Loading search..." />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}