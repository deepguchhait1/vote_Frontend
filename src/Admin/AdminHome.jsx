import React, { useState } from 'react'
import { MdDashboard, MdBarChart, MdPeople, MdSettings, MdSchedule } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminLogout } from '../lib/adminApi'
import toast from 'react-hot-toast'
import { useAuthAdmin } from '../lib/customHook'
import Dashboard from './AdminDashboard'
import ManageCanidates from './ManageCanidates'
import ManageVoters from './ManageVoters'
import ViewResult from './ViewResult'
import VotingSchedul from './VotingSchedul'
import Settings from './Settings'
import AdminSideBar from '../Componentes/AdminSideBar'
import AdminDashboard from './AdminDashboard'

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { isLoading, authAdmin } = useAuthAdmin()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      queryClient.setQueryData(["authAdmin"], null)
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] })
      toast.success("Logged out successfully")
      navigate('/admin', { replace: true })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.msg || "Logout failed")
      console.log(e)
    }
  })

  const logoutBtn = () => {
    logoutMutate()
  }

  if (isLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: MdDashboard },
    { id: 'candidates', name: 'Manage Candidates', icon: FaUsers },
    { id: 'voters', name: 'Manage Voters', icon: MdPeople },
    { id: 'results', name: 'View Results', icon: MdBarChart },
    { id: 'schedule', name: 'Voting Schedule', icon: MdSchedule },
    { id: 'settings', name: 'Settings', icon: MdSettings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <AdminSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        authAdmin={authAdmin}
        logoutBtn={logoutBtn}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-md sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {menuItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-500">Welcome back, {authAdmin?.name || 'Admin'}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="badge badge-success gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'candidates' && <ManageCanidates />}
          {activeTab === 'voters' && <ManageVoters />}
          {activeTab === 'results' && <ViewResult />}
          {activeTab === 'schedule' && <VotingSchedul />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  )
}
