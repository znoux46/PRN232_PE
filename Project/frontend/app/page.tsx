'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { postApi, PostQuery } from '@/lib/api'
import PostList from '@/components/PostList'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import Link from 'next/link'
import { Plus, FileText, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [query, setQuery] = useState<PostQuery>({
    page: 1,
    pageSize: 10,
    sortBy: 'name',
    sortOrder: 'asc',
  })

  const { data, isLoading, error, refetch } = useQuery(
    ['posts', query],
    () => postApi.getAll(query),
    { keepPreviousData: true }
  )

  const handleSearch = (search: string) => {
    setQuery(prev => ({ ...prev, search, page: 1 }))
  }

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setQuery(prev => ({ ...prev, sortBy, sortOrder, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setQuery(prev => ({ ...prev, page }))
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FileText className="h-10 w-10 text-primary-600" />
              Post Management
            </h1>
            <p className="text-gray-600">Manage your posts with ease</p>
          </div>
          <Link href="/posts/new" className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Post
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="w-full sm:w-64">
              <SortDropdown
                sortBy={query.sortBy || 'name'}
                sortOrder={query.sortOrder || 'asc'}
                onSort={handleSort}
              />
            </div>
          </div>
        </motion.div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Loader2 className="inline-block h-12 w-12 text-primary-600 animate-spin" />
            <p className="mt-4 text-gray-600 font-medium">Loading posts...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-6 mb-6 border-l-4 border-red-500 bg-red-50"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-800 mb-1">Error loading posts</p>
                <p className="text-sm text-red-700">
                  {(error as any)?.response?.data?.message || (error as any)?.message || 'Please try again later.'}
                </p>
                {(error as any)?.response?.data?.error && (
                  <p className="text-xs mt-2 text-red-600 opacity-75">{(error as any).response.data.error}</p>
                )}
                <button
                  onClick={() => refetch()}
                  className="mt-3 btn-secondary text-sm flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {data && !isLoading && (
          <PostList
            posts={data.items}
            pagination={{
              page: data.page,
              pageSize: data.pageSize,
              totalPages: data.totalPages,
              totalCount: data.totalCount,
              hasPreviousPage: data.hasPreviousPage,
              hasNextPage: data.hasNextPage,
            }}
            onPageChange={handlePageChange}
          />
        )}

        {data && data.items.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center"
          >
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4 font-medium">No posts found</p>
            <Link href="/posts/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create your first post
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}




