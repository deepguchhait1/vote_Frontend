import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin } from '../lib/adminApi'

export default function AdminLogin() {
    const queryClient = useQueryClient();

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: adminLogin,
        onSuccess: () => {
            toast.success("Login successful!");
            queryClient.invalidateQueries({ queryKey: ["authAdmin"] });

            navigate('/admin/dashboard');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.msg || "Login failed");
            console.log(error);
        }
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
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
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="card-title text-3xl font-bold justify-center mb-2">
                            ADMIN
                        </h2>
                        <p className="text-base-content/60">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                            <label className="label flex justify-end">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}
                            >
                                {isPending ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="divider"></div>
                    <p className="text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="link link-primary font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
