import React, { useState } from 'react'
import { MdDashboard, MdBarChart, MdPeople, MdSettings, MdSchedule } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminLogout } from '../lib/adminApi'
import toast from 'react-hot-toast'
import { useAuthAdmin } from '../lib/customHook'
import AdminSideBar from '../Componentes/AdminSideBar'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { isLoading, authAdmin } = useAuthAdmin()
  const location = useLocation()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      queryClient.setQueryData(["authAdmin"], null)
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] })
      toast.success("Logged out successfully")
      navigate('/admin/login', { replace: true })
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
    { id: 'dashboard', name: 'Dashboard', icon: MdDashboard, path: '/admin/dashboard' },
    { id: 'candidates', name: 'Manage Candidates', icon: FaUsers, path: '/admin/manage-candidates' },
    { id: 'voters', name: 'Manage Voters', icon: MdPeople, path: '/admin/manage-voters' },
    { id: 'results', name: 'View Results', icon: MdBarChart, path: '/admin/view-results' },
    { id: 'schedule', name: 'Voting Schedule', icon: MdSchedule, path: '/admin/voting-schedule' },
    { id: 'settings', name: 'Settings', icon: MdSettings, path: '/admin/settings' },
  ]

  // Get active menu item based on current path
  const activeMenuItem = menuItems.find(item => location.pathname === item.path) || menuItems[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <AdminSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
        activePath={location.pathname}
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
                  {activeMenuItem.name}
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
          <Outlet />
        </div>
      </main>
    </div>
  )
}
