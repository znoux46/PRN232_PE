'use client'

import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { postApi } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Edit, Trash2, Calendar, Clock, Loader2, AlertCircle } from 'lucide-react'
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
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
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card overflow-hidden"
        >
          {post.imageUrl && (
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary-600" />
                <span className="font-medium">Created:</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-600" />
                <span className="font-medium">Updated:</span>
                <span>{formatDate(post.updatedAt)}</span>
              </div>
            </div>
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{post.description}</p>
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Link
                href={`/posts/${post.id}/edit`}
                className="btn-primary flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
                className="btn-danger flex items-center gap-2"
              >
                {deleteMutation.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Post
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




