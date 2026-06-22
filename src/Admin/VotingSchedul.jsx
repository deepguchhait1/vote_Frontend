import React from 'react'

export default function VotingSchedul() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Voting Schedule</h3>
      <div className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Start Date & Time</span>
          </label>
          <input type="datetime-local" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">End Date & Time</span>
          </label>
          <input type="datetime-local" className="input input-bordered" />
        </div>
        <button className="btn btn-primary">Update Schedule</button>
      </div>
    </div>
  )
}
