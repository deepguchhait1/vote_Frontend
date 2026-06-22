import React from 'react'

export default function ViewResult() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Live Voting Results</h3>
        <div className="space-y-6">
          {[
            { name: 'Candidate A', party: 'Party A', votes: 450, percentage: 45, color: 'blue' },
            { name: 'Candidate B', party: 'Party B', votes: 350, percentage: 35, color: 'purple' },
            { name: 'Candidate C', party: 'Party C', votes: 200, percentage: 20, color: 'orange' },
          ].map((candidate, i) => (
            <div key={i} className={`bg-gradient-to-r from-${candidate.color}-50 to-transparent rounded-xl p-5`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${candidate.color}-500 to-${candidate.color}-600 rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{candidate.name}</p>
                    <p className="text-xs text-gray-500">{candidate.party}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{candidate.votes}</p>
                  <p className="text-xs text-gray-500">votes ({candidate.percentage}%)</p>
                </div>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full bg-gradient-to-r from-${candidate.color}-500 to-${candidate.color}-600 rounded-full transition-all duration-500`}
                  style={{ width: `${candidate.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
