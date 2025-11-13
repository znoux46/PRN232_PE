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
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card card-hover overflow-hidden group"
    >
      {post.imageUrl && (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {post.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Calendar className="h-4 w-4" />
          <span>Created: {formatDate(post.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/posts/${post.id}`}
            className="flex-1 text-center btn-primary flex items-center justify-center gap-2 py-2 px-4 text-sm"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>
          <Link
            href={`/posts/${post.id}/edit`}
            className="flex-1 text-center btn-secondary flex items-center justify-center gap-2 py-2 px-4 text-sm"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
            className="btn-danger flex items-center justify-center gap-2 py-2 px-4 text-sm"
          >
            <Trash2 className="h-4 w-4" />
            {deleteMutation.isLoading ? '...' : 'Delete'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}




