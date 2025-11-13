'use client'

import { Post } from '@/lib/api'
import PostCard from './PostCard'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface PostListProps {
  posts: Post[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

export default function PostList({ posts, hasNextPage, isFetchingNextPage, onLoadMore }: PostListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more posts...</span>
            </div>
          )}
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No more posts to load
        </div>
      )}
    </motion.div>
  )
}




