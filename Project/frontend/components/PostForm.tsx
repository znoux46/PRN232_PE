'use client'

import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { CreatePostDto, UpdatePostDto, postApi } from '@/lib/api'
import Image from 'next/image'
import { FileText, Image as ImageIcon, Loader2, Upload, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

interface PostFormProps {
  register: UseFormRegister<CreatePostDto | UpdatePostDto>
  handleSubmit: UseFormHandleSubmit<CreatePostDto | UpdatePostDto>
  onSubmit: (data: CreatePostDto | UpdatePostDto) => void
  errors: FieldErrors<CreatePostDto | UpdatePostDto>
  watch: UseFormWatch<CreatePostDto | UpdatePostDto>
  setValue: UseFormSetValue<CreatePostDto | UpdatePostDto>
  isLoading: boolean
  submitLabel: string
}

export default function PostForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  setValue,
  isLoading,
  submitLabel,
}: PostFormProps) {
  const imageUrl = watch('imageUrl')
  const name = watch('name')
  const description = watch('description')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload JPG, PNG, GIF, or WEBP image.')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit.')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    try {
      setUploading(true)
      const uploadedUrl = await postApi.uploadImage(file)
      setValue('imageUrl', uploadedUrl)
      toast.success('Image uploaded successfully!')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to upload image')
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setValue('imageUrl', '')
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
        <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Image (Optional)
        </label>
        <input
          type="file"
          id="imageFile"
          ref={fileInputRef}
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          disabled={uploading || isLoading}
          className="hidden"
        />
        <div className="flex gap-2">
          <label
            htmlFor="imageFile"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              uploading || isLoading
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                <span className="text-sm text-gray-600">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Click to upload image</span>
              </>
            )}
          </label>
          {(imageUrl || preview) && (
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={uploading || isLoading}
              className="px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Supported formats: JPG, PNG, GIF, WEBP (Max 10MB)
        </p>
        <input
          type="hidden"
          {...register('imageUrl')}
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
          {(preview || imageUrl) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4"
            >
              <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
              <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={preview || imageUrl || ''}
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




