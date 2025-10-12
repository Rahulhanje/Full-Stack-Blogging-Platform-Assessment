'use client';

import { useState } from 'react';
import { trpc } from '../../lib/providers';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LoadingState } from '../../components/LoadingSpinner';
import { ErrorState } from '../../components/ErrorState';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function CategoriesPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryDescription, setEditCategoryDescription] = useState('');

  const { data: categories, isLoading, error, refetch } = trpc.categories.getAll.useQuery();

  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      refetch();
      setIsCreating(false);
      setNewCategoryName('');
      setNewCategoryDescription('');
    },
    onError: (error) => {
      alert(`Failed to create category: ${error.message}`);
    },
  });

  const updateCategory = trpc.categories.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditingId(null);
      setEditCategoryName('');
      setEditCategoryDescription('');
    },
    onError: (error) => {
      alert(`Failed to update category: ${error.message}`);
    },
  });

  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(`Failed to delete category: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
          <LoadingState message="Loading categories..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
          <ErrorState 
            message="Failed to load categories. Please try again." 
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      await createCategory.mutateAsync({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim() || undefined,
      });
    } catch (error) {
      // Error handled in onError
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategoryName.trim() || !editingId) {
      alert('Please enter a category name');
      return;
    }

    try {
      await updateCategory.mutateAsync({
        id: editingId,
        name: editCategoryName.trim(),
        description: editCategoryDescription.trim() || undefined,
      });
    } catch (error) {
      // Error handled in onError
    }
  };

  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setEditCategoryName(category.name);
    setEditCategoryDescription(category.description || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditCategoryName('');
    setEditCategoryDescription('');
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)) {
      try {
        await deleteCategory.mutateAsync(id);
      } catch (error) {
        // Error handled in onError
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
            <p className="text-gray-600">Manage your blog categories</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
          >
            New Category
          </button>
        </div>

        {/* Create New Category Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Category</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="new-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name..."
                  required
                />
              </div>
              <div>
                <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="new-description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category description..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={createCategory.isPending || !newCategoryName.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium flex items-center"
                >
                  {createCategory.isPending && <LoadingSpinner size="sm" className="mr-2" />}
                  Create Category
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setNewCategoryName('');
                    setNewCategoryDescription('');
                  }}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow-sm">
          {categories && categories.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div key={category.id} className="p-6">
                  {editingId === category.id ? (
                    // Edit Form
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="edit-name"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="edit-description"
                          value={editCategoryDescription}
                          onChange={(e) => setEditCategoryDescription(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={updateCategory.isPending || !editCategoryName.trim()}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium flex items-center"
                        >
                          {updateCategory.isPending && <LoadingSpinner size="sm" className="mr-2" />}
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Display Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-600 mb-2">{category.description}</p>
                        )}
                        <div className="text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            /{category.slug}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="text-red-600 hover:text-red-800 font-medium"
                          disabled={deleteCategory.isPending}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first category to organize your blog posts.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
              >
                Create First Category
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}