'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { postApi, CreatePostDto } from '@/lib/api'
import PostForm from '@/components/PostForm'
import Link from 'next/link'
import { ArrowLeft, Plus, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function NewPostPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreatePostDto>()

  const createMutation = useMutation(postApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      toast.success('Post created successfully!')
      router.push('/')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create post')
    },
  })

  const onSubmit = (data: CreatePostDto) => {
    createMutation.mutate(data)
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
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Plus className="h-10 w-10 text-primary-600" />
            Create New Post
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
            isLoading={createMutation.isLoading}
            submitLabel="Create Post"
          />

          {createMutation.isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Error creating post</p>
                  <p className="text-sm mt-1">
                    {(createMutation.error as any)?.response?.data?.message || 
                     (createMutation.error as any)?.message || 
                     'Please check your input and try again.'}
                  </p>
                  {(createMutation.error as any)?.response?.data?.errors && (
                    <ul className="mt-2 text-xs list-disc list-inside">
                      {Array.isArray((createMutation.error as any).response.data.errors) ? (
                        (createMutation.error as any).response.data.errors.map((err: any, idx: number) => (
                          <li key={idx}>{err.Field}: {err.Message}</li>
                        ))
                      ) : (
                        Object.entries((createMutation.error as any).response.data.errors || {}).map(([field, messages]: [string, any]) => (
                          <li key={field}>{field}: {Array.isArray(messages) ? messages.join(', ') : messages}</li>
                        ))
                      )}
                    </ul>
                  )}
                  {(createMutation.error as any)?.response?.data?.error && (
                    <p className="text-xs mt-2 opacity-75">{(createMutation.error as any).response.data.error}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}




