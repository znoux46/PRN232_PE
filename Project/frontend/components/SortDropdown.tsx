'use client'

import { ArrowUpDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface SortDropdownProps {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void
}

export default function SortDropdown({ sortBy, sortOrder, onSort }: SortDropdownProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-')
    onSort(newSortBy, newSortOrder as 'asc' | 'desc')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative"
    >
      <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      <select
        value={`${sortBy}-${sortOrder}`}
        onChange={handleSortChange}
        className="input-field pl-10 pr-4 border-gray-300 focus:border-primary-500 appearance-none cursor-pointer"
      >
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        <option value="updatedAt-desc">Recently Updated</option>
        <option value="updatedAt-asc">Least Recently Updated</option>
      </select>
    </motion.div>
  )
}




