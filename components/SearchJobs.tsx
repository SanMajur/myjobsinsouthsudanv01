
'use client'
import { useState } from 'react'
import { fakeJobs } from '@/lib/fakeJobs'

export default function SearchJobs() {
    const [showRemoteOnly, setShowRemoteOnly] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredJobs = fakeJobs.filter(job => {
        const matchesRemote = showRemoteOnly ? job.isRemote : true
        const matchesSearch = searchQuery === '' ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesRemote && matchesSearch
    })
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Job title or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
                />
                <button
                    onClick={() => setShowRemoteOnly(!showRemoteOnly)}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors appearance-none whitespace-nowrap
                        ${showRemoteOnly
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                >
                    {showRemoteOnly ? 'Remote Only' : 'All Jobs'}
                </button>
            </div>
        </div>
    )
}
