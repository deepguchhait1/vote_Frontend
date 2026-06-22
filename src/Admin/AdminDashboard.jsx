import React from 'react'
import { MdHowToVote, MdBarChart, MdPeople } from 'react-icons/md'
import { FaCheckCircle, FaUsers } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Voters</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">1,234</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last election</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <MdPeople className="text-3xl text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Votes Cast</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">892</p>
              <p className="text-xs text-blue-600 mt-1">72.3% turnout</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-3xl text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Candidates</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
              <p className="text-xs text-gray-600 mt-1">4 parties participating</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <FaUsers className="text-3xl text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Time Remaining</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">4:32</p>
              <p className="text-xs text-orange-600 mt-1">Hours left to vote</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <IoTimeOutline className="text-3xl text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary gap-2 justify-start">
            <FaUsers />
            Add New Candidate
          </button>
          <button className="btn btn-secondary gap-2 justify-start">
            <MdPeople />
            Register Voter
          </button>
          <button className="btn btn-accent gap-2 justify-start">
            <MdBarChart />
            Export Results
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-4 pb-0">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MdHowToVote className="text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">New vote cast</p>
                <p className="text-sm text-gray-500">Voter ID: V{1000 + i} voted for Candidate A</p>
              </div>
              <p className="text-xs text-gray-400">{i} min ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
