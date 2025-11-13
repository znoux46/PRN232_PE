'use client'

import { Post } from '@/lib/api'
import PostCard from './PostCard'
import Pagination from './Pagination'
import { motion } from 'framer-motion'

interface PostListProps {
  posts: Post[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    totalCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
  onPageChange: (page: number) => void
}

export default function PostList({ posts, pagination, onPageChange }: PostListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          onPageChange={onPageChange}
        />
      )}
    </motion.div>
  )
}




