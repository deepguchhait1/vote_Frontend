import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import UserHome from './User/UserHome'
import UserReg from './User/UserReg'
import { Toaster } from 'react-hot-toast'
import UserLogin from './User/UserLogin'
import UserLogout from './User/UserLogout'
import { useAuthAdmin, useAuthUser } from './lib/customHook'
import AdminLogin from './Admin/AdminLogin'
import AdminLayout from './Admin/AdminLayout'
import AdminDashboard from './Admin/AdminDashboard'
import ManageCanidates from './Admin/ManageCanidates'
import ManageVoters from './Admin/ManageVoters'
import Settings from './Admin/Settings'
import ViewResult from './Admin/ViewResult'
import VotingSchedul from './Admin/VotingSchedul'

export default function App() {
  const { isLoading, authUser } = useAuthUser();
  const { isLoadingAdmin, authAdmin } = useAuthAdmin();

  const authNUser = Boolean(authUser);
  const authNAdmin = Boolean(authAdmin);
  // console.log(authNAdmin);
  // console.log(authAdmin);
  

  if (isLoading || isLoadingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div>
      <Routes>

        //TODO: USER ROUTES
        <Route path='/signup' element={
          authNUser ? <Navigate to="/" replace /> : <div><UserReg /></div>
        } />
        <Route path='/login' element={
          authNUser ? <Navigate to="/" replace /> : <div><UserLogin /></div>
        } />
        <Route path='/' element={
          authNUser ? <div><UserHome /></div> : <Navigate to="/login" replace />
        } />
        <Route path='/logout' element={
          authNUser ? <div><UserLogout /></div> : <Navigate to="/login" replace />
        } />


        {/* ADMIN ROUTES */}
        <Route path='/admin/login' element={authNAdmin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} />
        <Route path='/admin' element={authNAdmin ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='manage-candidates' element={<ManageCanidates />} />
          <Route path='manage-voters' element={<ManageVoters />} />
          <Route path='settings' element={<Settings />} />
          <Route path='view-results' element={<ViewResult />} />
          <Route path='voting-schedule' element={<VotingSchedul />} />
        </Route>

      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}
