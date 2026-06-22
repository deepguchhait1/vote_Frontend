import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { userSignup } from '../lib/userApi'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function UserReg() {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: ""
    })

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: userSignup,
        onSuccess: () => {
            toast.success("Registration successful! Please login.");
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.msg);
            console.log(error);
        }
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        mutate(data);
    }
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="card-title text-3xl font-bold justify-center mb-2">
                            Create Account
                        </h2>
                        <p className="text-base-content/60">Sign up to get started</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handelSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email Address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Date of Birth</span>
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={data.dob}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}
                            >
                                {isPending ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="divider"></div>
                    <p className="text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="link link-primary font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
