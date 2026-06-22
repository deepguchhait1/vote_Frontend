import React from 'react'

export default function Settings() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">System Settings</h3>
      <div className="space-y-4">
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            <span className="label-text">Enable real-time results</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="toggle toggle-primary" />
            <span className="label-text">Allow vote changes</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            <span className="label-text">Send email notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
}
