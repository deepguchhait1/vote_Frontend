import React, { useState } from 'react'
import { BiLogOut, BiCheckCircle } from 'react-icons/bi'
import { MdHowToVote, MdBarChart } from 'react-icons/md'
import { FaUser, FaUsers } from 'react-icons/fa'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { useAuthUser } from '../lib/customHook'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userLogout } from '../lib/userApi'
import toast from 'react-hot-toast'

export default function UserHome() {
  const [activeTab, setActiveTab] = useState('vote')
  const { isLoading, authUser } = useAuthUser();
  console.log(authUser);
  //MARK:Logout
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
      navigate('/login', { replace: true });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.msg || "Logout failed");
      console.log(e);
    }
  })
  const logoutBtn = () => {
    mutate();
  }
  if (isLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <MdHowToVote className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Voting System
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {authUser?.image ? (
                  <img
                    src={authUser.image}
                    alt={authUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {authUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <span className="font-semibold text-gray-700 hidden sm:block">
                  {authUser?.name || 'User'}
                </span>
              </div>
              <button onClick={logoutBtn} className="btn btn-error btn-sm gap-2">
                <BiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('vote')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'vote'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <MdHowToVote className="text-xl" />
              Give Vote
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 'results'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <MdBarChart className="text-xl" />
              Show Results
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {/* Give Vote Tab */}
          {activeTab === 'vote' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MdHowToVote className="text-2xl text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Cast Your Vote</h2>
                  <p className="text-sm text-gray-500">Select your preferred candidate</p>
                </div>
              </div>

              {/* Candidates List */}
              <div className="space-y-4 mb-6">
                {/* Candidate 1 */}
                <div className="group border-2 border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-xl" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Candidate Name A</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name A
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary gap-2">
                      <BiCheckCircle className="text-lg" />
                      Vote
                    </button>
                  </div>
                </div>

                {/* Candidate 2 */}
                <div className="group border-2 border-gray-200 rounded-xl p-5 hover:border-secondary hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-xl" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Candidate Name B</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name B
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary gap-2">
                      <BiCheckCircle className="text-lg" />
                      Vote
                    </button>
                  </div>
                </div>

                {/* Candidate 3 */}
                <div className="group border-2 border-gray-200 rounded-xl p-5 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-xl" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Candidate Name C</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name C
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary gap-2">
                      <BiCheckCircle className="text-lg" />
                      Vote
                    </button>
                  </div>
                </div>
              </div>

              {/* Vote Status Alert */}
              <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-4 flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ℹ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">You haven't voted yet</p>
                  <p className="text-sm text-gray-600">Choose your preferred candidate above and cast your vote.</p>
                </div>
              </div>
            </div>
          )}

          {/* Show Results Tab */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <MdBarChart className="text-2xl text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Live Results</h2>
                  <p className="text-sm text-gray-500">Real-time voting statistics</p>
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-6">
                {/* Result Item 1 */}
                <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Candidate Name A</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name A
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">450</p>
                      <p className="text-xs text-gray-500">votes (45%)</p>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                {/* Result Item 2 */}
                <div className="bg-gradient-to-r from-purple-50 to-transparent rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Candidate Name B</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name B
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">350</p>
                      <p className="text-xs text-gray-500">votes (35%)</p>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-secondary to-purple-500 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                {/* Result Item 3 */}
                <div className="bg-gradient-to-r from-orange-50 to-transparent rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Candidate Name C</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          Party Name C
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">200</p>
                      <p className="text-xs text-gray-500">votes (20%)</p>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-accent to-orange-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>

              {/* Total Votes Card */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                      <IoCheckmarkDoneCircle className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Votes Cast</p>
                      <p className="text-3xl font-bold text-gray-800">1,000</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Participation</p>
                    <p className="text-2xl font-bold text-success">100%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
