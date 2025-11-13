'use client'

import { useState } from 'react'
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface FilterBarProps {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  onSearch: (search: string) => void
}

export default function FilterBar({ sortBy, sortOrder, onSortChange, onSearch }: FilterBarProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  const handleSortToggle = () => {
    onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
      {/* Sort By Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onSortChange('name', sortOrder)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            sortBy === 'name'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          By Name
          {sortBy === 'name' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => onSortChange('createdAt', sortOrder)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            sortBy === 'createdAt'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          By Date
          {sortBy === 'createdAt' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Sort Order Toggle */}
      <button
        onClick={handleSortToggle}
        className="flex items-center gap-1 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
      >
        {sortOrder === 'asc' ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
        <ArrowUpDown className="h-4 w-4" />
      </button>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  )
}

