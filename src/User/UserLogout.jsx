import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { userLogout } from '../lib/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function UserLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 500);
    },
    onError: (e) => {
      toast.error(e?.response?.data?.msg || "Logout failed");
      console.log(e);
      navigate('/');
    }
  })

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return null;
}
