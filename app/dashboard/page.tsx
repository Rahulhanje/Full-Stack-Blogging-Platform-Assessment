'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { trpc } from '../../lib/providers';
import { useAuth } from '../../lib/useAuth';
import { LoadingState } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import { formatDate } from '../../lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showPublished, setShowPublished] = useState<boolean | undefined>(undefined);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  const { data: posts, isLoading, error, refetch } = trpc.posts.getAll.useQuery({
    published: showPublished,
    authorId: user?.id, // Filter by current user's ID
  }, {
    enabled: !!user, // Only fetch when user is authenticated
  });

  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(`Failed to delete post: ${error.message}`);
    },
  });

  const togglePublish = trpc.posts.update.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(`Failed to update post: ${error.message}`);
    },
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
          <LoadingState />
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
      
        <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
          <LoadingState message="Loading dashboard..." />
        </div>
        
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
       
        <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
          <ErrorState 
            message="Failed to load dashboard. Please try again." 
            onRetry={() => refetch()}
          />
        </div>
      
      </div>
    );
  }

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await deletePost.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      await togglePublish.mutateAsync({
        id,
        published: !currentStatus,
      });
    } catch (error) {
      alert('Failed to update post status. Please try again.');
    }
  };

  const filteredPosts = posts || [];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts and content</p>
          </div>
          <Link
            href="/dashboard/new"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
          >
            New Post
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowPublished(undefined)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showPublished === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts ({posts?.length || 0})
            </button>
            <button
              onClick={() => setShowPublished(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showPublished === true
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({posts?.filter(p => p.published).length || 0})
            </button>
            <button
              onClick={() => setShowPublished(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showPublished === false
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Drafts ({posts?.filter(p => !p.published).length || 0})
            </button>
          </div>
        </div>

        {/* Posts Table */}
        {filteredPosts.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                              {post.title}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {post.content.substring(0, 100)}...
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(post.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                     
                        {(post.authorId === user.id || user.role === 'admin') ? (
                          <>
                            <Link
                              href={`/dashboard/edit/${post.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleTogglePublish(post.id, post.published)}
                              className={`${
                                post.published
                                  ? 'text-yellow-600 hover:text-yellow-900'
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                              disabled={togglePublish.isPending}
                            >
                              {post.published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button
                              onClick={() => handleDelete(post.id, post.title)}
                              className="text-red-600 hover:text-red-900"
                              disabled={deletePost.isPending}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 text-sm">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first blog post.
            </p>
            <Link
              href="/dashboard/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}