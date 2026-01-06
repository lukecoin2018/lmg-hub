'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { AppShell } from '../../components/app-shell'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [dealCount, setDealCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      await loadStats(user.id)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/login')
    }
  }

  const loadStats = async (userId: string) => {
    try {
      // Load deal count
      const { count } = await supabase
        .from('deals')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      setDealCount(count || 0)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-[#1A1A1A] p-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your creator business from one place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💼</span>
              <p className="text-gray-400 text-sm">Active Deals</p>
            </div>
            <p className="text-3xl font-bold text-white">{dealCount}</p>
          </div>

          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <p className="text-gray-400 text-sm">Total Revenue</p>
            </div>
            <p className="text-3xl font-bold text-white">$0</p>
            <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
          </div>

          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📅</span>
              <p className="text-gray-400 text-sm">Upcoming Posts</p>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
          </div>

          <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📈</span>
              <p className="text-gray-400 text-sm">Engagement Rate</p>
            </div>
            <p className="text-3xl font-bold text-white">-</p>
            <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
          </div>
        </div>

        {/* Apps Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Apps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Deal Flow - Active */}
            <Link href="/apps/deal-flow">
              <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-8 hover:border-[#FFD700] transition-all duration-300 cursor-pointer group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center text-3xl">
                    💼
                  </div>
                  <div className="px-3 py-1 bg-[#FFD700] text-[#1A1A1A] text-xs font-semibold rounded-full">
                    Active
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  Deal Flow
                </h3>
                <p className="text-gray-400 mb-4">
                  Manage brand deals from lead to payment
                </p>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#FFD700] font-semibold">{dealCount} Active Deals</span>
                </div>
              </div>
            </Link>

            {/* Content Calendar - Coming Soon */}
            <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-8 opacity-60 cursor-not-allowed h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF4D94] to-[#C2185B] rounded-xl flex items-center justify-center text-3xl">
                  📅
                </div>
                <div className="px-3 py-1 bg-[#3A3A3A] text-gray-500 text-xs font-semibold rounded-full">
                  Coming Soon
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                Content Calendar
              </h3>
              <p className="text-gray-400 mb-4">
                Plan and schedule your content pipeline
              </p>
            </div>

            {/* Analytics - Coming Soon */}
            <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-8 opacity-60 cursor-not-allowed h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3AAFF4] to-[#1976D2] rounded-xl flex items-center justify-center text-3xl">
                  📊
                </div>
                <div className="px-3 py-1 bg-[#3A3A3A] text-gray-500 text-xs font-semibold rounded-full">
                  Coming Soon
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                Analytics
              </h3>
              <p className="text-gray-400 mb-4">
                Track performance across all platforms
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/apps/deal-flow">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#2A2A2A] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  💼
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Add New Deal</h3>
                  <p className="text-gray-400 text-sm">Start tracking a brand opportunity</p>
                </div>
              </div>
            </Link>

            <div className="flex items-start gap-4 p-4 rounded-lg opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 bg-[#3A3A3A] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                ⚙️
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Customize Hub</h3>
                <p className="text-gray-400 text-sm">Personalize your workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
