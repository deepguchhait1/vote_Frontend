import React from 'react'
import { BiLogOut, BiMenuAltLeft } from 'react-icons/bi'
import { FaUserShield } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function AdminSideBar({
    isSidebarOpen,
    setIsSidebarOpen,
    menuItems,
    activePath,
    authAdmin,
    logoutBtn
}) {
    return (
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
            {/* Logo Section */}
            <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                                <FaUserShield className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">Admin Panel</h1>
                                <p className="text-xs text-slate-400">Voting System</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="btn btn-ghost btn-sm btn-square text-white hover:bg-slate-700"
                    >
                        <BiMenuAltLeft className={`text-2xl transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-3 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <li key={item.id}>
                                <Link
                                    to={item.path}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activePath === item.path
                                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }`}
                                >
                                    <Icon className="text-xl flex-shrink-0" />
                                    {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-slate-700">
                {isSidebarOpen ? (
                    <div className="flex items-center gap-3 mb-3">
                        {authAdmin?.image ? (
                            <img
                                src={authAdmin.image}
                                alt={authAdmin.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                    {authAdmin?.name?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{authAdmin?.name || 'Admin'}</p>
                            <p className="text-xs text-slate-400 truncate">{authAdmin?.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {authAdmin?.name?.charAt(0).toUpperCase() || 'A'}
                            </span>
                        </div>
                    </div>
                )}
                <button
                    onClick={logoutBtn}
                    className={`btn btn-error btn-sm w-full ${isSidebarOpen ? 'gap-2' : 'btn-square'}`}
                >
                    <BiLogOut className="text-lg" />
                    {isSidebarOpen && 'Logout'}
                </button>
            </div>
        </aside>
    )
}
