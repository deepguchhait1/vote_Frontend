import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function ManageCanidates() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    party_name: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your API call here to save the candidate
    console.log('Candidate Data:', formData)
    setIsModalOpen(false)
    // Reset form
    setFormData({
      name: '',
      party_name: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Candidate Management</h3>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaUsers />
          Add Candidate
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Party</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover">
                <td>C00{i}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">C{i}</span>
                    </div>
                    <span className="font-medium">Candidate Name {i}</span>
                  </div>
                </td>
                <td>Party {i}</td>
                <td><span className="badge badge-primary">{100 * i}</span></td>
                <td><span className="badge badge-success">Active</span></td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-ghost">Edit</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Candidate Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Candidate</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter candidate name"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Party Name</span>
                </label>
                <input
                  type="text"
                  name="party_name"
                  value={formData.party_name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter party name"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
