'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../lib/providers';
import { LoadingSpinner } from './LoadingSpinner';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Search posts...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Search results
  const { data: searchResults, isLoading } = trpc.posts.search.useQuery({
    query: debouncedQuery,
    categoryId: selectedCategory,
    limit: 10,
  }, {
    enabled: debouncedQuery.length >= 2,
  });
  
  // Categories for filter
  const { data: categories } = trpc.categories.getAll.useQuery();
  
  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Show/hide results based on query and focus
  useEffect(() => {
    setIsOpen(debouncedQuery.length >= 2);
  }, [debouncedQuery]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page
      const searchParams = new URLSearchParams({ q: query.trim() });
      if (selectedCategory) {
        searchParams.set('category', selectedCategory.toString());
      }
      router.push(`/blog?${searchParams.toString()}`);
      setIsOpen(false);
      setQuery('');
    }
  };
  
  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };
  
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onFocus={() => debouncedQuery.length >= 2 && setIsOpen(true)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>
        
        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(undefined)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </form>
      
      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <>
              <div className="p-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{debouncedQuery}"
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={handleResultClick}
                    className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="text-sm text-gray-600 line-clamp-3 prose prose-sm">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <span>{children}</span>,
                            h1: ({ children }) => <span className="font-medium">{children}</span>,
                            h2: ({ children }) => <span className="font-medium">{children}</span>,
                            h3: ({ children }) => <span className="font-medium">{children}</span>,
                            code: ({ children }) => <code className="bg-gray-100 px-1 rounded text-xs">{children}</code>,
                            strong: ({ children }) => <strong className="font-medium">{children}</strong>,
                            em: ({ children }) => <em>{children}</em>,
                          }}
                        >
                          {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                        </ReactMarkdown>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all results for "{debouncedQuery}" →
                </button>
              </div>
            </>
          ) : debouncedQuery.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <div className="space-y-2">
                <div className="text-sm">No posts found for "{debouncedQuery}"</div>
                <div className="text-xs text-gray-400">
                  Try different keywords or browse all posts
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;