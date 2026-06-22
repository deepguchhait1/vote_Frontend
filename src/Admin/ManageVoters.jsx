import React from 'react'
import { MdPeople } from 'react-icons/md'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'

export default function ManageVoters() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Voter Management</h3>
        <button className="btn btn-primary gap-2">
          <MdPeople />
          Register Voter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Voter ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Voted</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover">
                <td>V{1000 + i}</td>
                <td>Voter Name {i}</td>
                <td>voter{i}@example.com</td>
                <td>
                  {i % 2 === 0 ? (
                    <span className="badge badge-success gap-2">
                      <IoCheckmarkDoneCircle />
                      Yes
                    </span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
                <td>Jan {i}, 2026</td>
                <td>
                  <button className="btn btn-sm btn-ghost">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
