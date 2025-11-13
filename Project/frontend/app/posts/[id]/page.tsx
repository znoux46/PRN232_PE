'use client'

import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { postApi } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Edit, Trash2, Calendar, Clock, Loader2, AlertCircle, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const queryClient = useQueryClient()

  const { data: post, isLoading, error } = useQuery(
    ['post', id],
    () => postApi.getById(id),
    { enabled: !!id }
  )

  const deleteMutation = useMutation(() => postApi.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      toast.success('Post deleted successfully!')
      router.push('/')
    },
    onError: () => {
      toast.error('Failed to delete post')
    },
  })

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${post?.name}"?`)) {
      deleteMutation.mutate()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <Loader2 className="inline-block h-12 w-12 text-primary-600 animate-spin" />
          <p className="mt-4 text-gray-600 font-medium">Loading post...</p>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-6 border-l-4 border-red-500 bg-red-50"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-800">Post not found</p>
                <Link href="/" className="text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Posts
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto border-x border-gray-200">
        {/* Header with back button */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-10 px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Post</span>
          </Link>
        </div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Post Header */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-lg">
                  {post.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-bold text-gray-900 text-lg">{post.name}</h1>
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-500 text-sm">@{post.name.toLowerCase().replace(/\s+/g, '')}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Description */}
          <div className="px-4 py-2">
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap break-words">
              {post.description}
            </p>
          </div>

          {/* Post Image */}
          {post.imageUrl && (
            <div className="px-4 py-2">
              <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="w-full h-auto max-w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="text-gray-500 text-sm">
              <span>{formatFullDate(post.createdAt)}</span>
            </div>
          </div>

          {/* Actions (Edit/Delete) */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex gap-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleteMutation.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}




