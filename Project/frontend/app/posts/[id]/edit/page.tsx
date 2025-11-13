'use client'

import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { postApi, UpdatePostDto } from '@/lib/api'
import PostForm from '@/components/PostForm'
import Link from 'next/link'
import { ArrowLeft, Edit, Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const queryClient = useQueryClient()

  const { data: post, isLoading } = useQuery(
    ['post', id],
    () => postApi.getById(id),
    { enabled: !!id }
  )

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<UpdatePostDto>({
    defaultValues: post,
  })

  // Reset form when post data loads
  if (post && !watch('name')) {
    reset({
      name: post.name,
      description: post.description,
      imageUrl: post.imageUrl || '',
    })
  }

  const updateMutation = useMutation(
    (data: UpdatePostDto) => postApi.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts')
        queryClient.invalidateQueries(['post', id])
        toast.success('Post updated successfully!')
        router.push('/')
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to update post')
      },
    }
  )

  const onSubmit = (data: UpdatePostDto) => {
    updateMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto text-center py-16">
          <Loader2 className="inline-block h-12 w-12 text-primary-600 animate-spin" />
          <p className="mt-4 text-gray-600 font-medium">Loading post...</p>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href={`/posts/${id}`}
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Post
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Edit className="h-10 w-10 text-primary-600" />
            Edit Post
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6"
        >
          <PostForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            watch={watch}
            setValue={setValue}
            isLoading={updateMutation.isLoading}
            submitLabel="Update Post"
          />

          {updateMutation.isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Error updating post</p>
                  <p className="text-sm mt-1">Please check your input and try again.</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}




