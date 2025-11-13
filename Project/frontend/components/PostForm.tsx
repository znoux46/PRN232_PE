'use client'

import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormWatch } from 'react-hook-form'
import { CreatePostDto, UpdatePostDto } from '@/lib/api'
import Image from 'next/image'
import { FileText, Image as ImageIcon, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PostFormProps {
  register: UseFormRegister<CreatePostDto | UpdatePostDto>
  handleSubmit: UseFormHandleSubmit<CreatePostDto | UpdatePostDto>
  onSubmit: (data: CreatePostDto | UpdatePostDto) => void
  errors: FieldErrors<CreatePostDto | UpdatePostDto>
  watch: UseFormWatch<CreatePostDto | UpdatePostDto>
  isLoading: boolean
  submitLabel: string
}

export default function PostForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  isLoading,
  submitLabel,
}: PostFormProps) {
  const imageUrl = watch('imageUrl')
  const name = watch('name')
  const description = watch('description')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            maxLength: { value: 200, message: 'Name must not exceed 200 characters' },
          })}
          className={`input-field ${errors.name ? 'input-field-error' : 'border-gray-300'}`}
          placeholder="Enter post name"
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.name.message as string}
            </motion.p>
          )}
        </AnimatePresence>
        {name && (
          <p className="mt-1 text-sm text-gray-500">{name.length}/200 characters</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 2000, message: 'Description must not exceed 2000 characters' },
          })}
          rows={6}
          className={`input-field ${errors.description ? 'input-field-error' : 'border-gray-300'} resize-none`}
          placeholder="Enter post description"
        />
        <AnimatePresence>
          {errors.description && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.description.message as string}
            </motion.p>
          )}
        </AnimatePresence>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description.length}/2000 characters</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Image URL (Optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          {...register('imageUrl', {
            maxLength: { value: 500, message: 'Image URL must not exceed 500 characters' },
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL',
            },
          })}
          className={`input-field ${errors.imageUrl ? 'input-field-error' : 'border-gray-300'}`}
          placeholder="https://example.com/image.jpg"
        />
        <AnimatePresence>
          {errors.imageUrl && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.imageUrl.message as string}
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4"
            >
              <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
              <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex gap-4 pt-4"
      >
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </motion.div>
    </form>
  )
}




