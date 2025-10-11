'use client';

import Link from 'next/link';
import { trpc } from '../../lib/providers';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LoadingState } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import { formatDate, calculateReadingTime } from '../../lib/utils';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  
  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = trpc.posts.getAll.useQuery({
    published: true,
    categoryId: selectedCategory,
  });

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingState message="Loading blog posts..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorState 
            message="Failed to load blog posts. Please try again." 
            onRetry={() => refetchPosts()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
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
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {formatDate(post.createdAt)}
                    </time>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content.substring(0, 200)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
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
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">
                {selectedCategory ? 'No posts in this category yet.' : 'No blog posts have been published yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
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
          className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
        >
          {category.name}
        </span>
      ))}
      {categories.length > 3 && (
        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          +{categories.length - 3}
        </span>
      )}
    </div>
  );
}