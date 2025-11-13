'use client'

import { Post } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import { postApi } from '@/lib/api'
import { Eye, Edit, Trash2, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface PostCardProps {
  post: Post
  index?: number
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(() => postApi.delete(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      toast.success('Post deleted successfully!')
    },
    onError: () => {
      toast.error('Failed to delete post')
    },
  })

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${post.name}"?`)) {
      deleteMutation.mutate()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div className="p-4">
        <div className="flex gap-3">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-lg">
              {post.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-gray-900 hover:underline cursor-pointer">
                {post.name}
              </h2>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
            </div>

            {/* Description */}
            <p className="text-gray-900 mb-3 leading-relaxed whitespace-pre-wrap break-words">
              {post.description}
            </p>

            {/* Image */}
            {post.imageUrl && (
              <Link href={`/posts/${post.id}`}>
                <div className="relative w-full rounded-2xl overflow-hidden mb-3 border border-gray-200 cursor-pointer hover:border-primary-300 transition-colors group">
                  <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={post.imageUrl}
                      alt={post.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              </Link>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 mt-2">
              <Link
                href={`/posts/${post.id}`}
                className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-primary-50 transition-colors">
                  <Eye className="h-4 w-4" />
                </div>
                <span className="text-sm">View</span>
              </Link>
              <Link
                href={`/posts/${post.id}/edit`}
                className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-primary-50 transition-colors">
                  <Edit className="h-4 w-4" />
                </div>
                <span className="text-sm">Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </div>
                <span className="text-sm">{deleteMutation.isLoading ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}




