'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface App {
  id: string
  name: string
  href: string
  icon: string
  active: boolean
  description: string
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode
  
  const apps: App[] = [
    {
      id: 'deal-flow',
      name: 'Deal Flow',
      href: '/apps/deal-flow',
      icon: '💼',
      active: true,
      description: 'Manage your brand deals'
    },
    {
      id: 'content-calendar',
      name: 'Content Calendar',
      href: '#',
      icon: '📅',
      active: false,
      description: 'Coming Soon'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      href: '#',
      icon: '📊',
      active: false,
      description: 'Coming Soon'
    }
  ]

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-white'} border-r ${darkMode ? 'border-[#3A3A3A]' : 'border-gray-200'} flex flex-col`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-[#3A3A3A]">
          <Link href="/dashboard" className="flex justify-center">
            <Image 
              src="/creator-hub-logo.png" 
              alt="LMG Creator Hub" 
              width={120} 
              height={120}
              className="w-24 h-24"
            />
          </Link>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="p-4 border-b border-[#3A3A3A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-[#1A1A1A] font-semibold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">Creator</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span className="font-medium">Dashboard</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Apps
            </p>
          </div>

          {apps.map((app) => (
            <Link
              key={app.id}
              href={app.active ? app.href : '#'}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                app.active
                  ? 'text-gray-300 hover:bg-[#3A3A3A] hover:text-white cursor-pointer'
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              onClick={(e) => !app.active && e.preventDefault()}
            >
              <span className="text-xl">{app.icon}</span>
              <div className="flex-1">
                <span className="font-medium block">{app.name}</span>
                {!app.active && (
                  <span className="text-xs text-gray-600">{app.description}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#3A3A3A] space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors w-full"
          >
            <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
            <span className="font-medium">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#3A3A3A] hover:text-white transition-colors"
          >
            <span className="text-xl">⚙️</span>
            <span className="font-medium">Settings</span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#3A3A3A] hover:text-red-400 transition-colors w-full"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64">
        {children}
      </main>
    </div>
  )
}
