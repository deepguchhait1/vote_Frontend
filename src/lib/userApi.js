import { userApi } from "./axios"

export const userLogin=async(data)=>{
    const res=await userApi.post('/login', data);
    return res.data;
}
export const userSignup=async(data)=>{
    const res=await userApi.post('/signup',data);
    return res.data;
}
export const getAuthUser=async()=>{
    const res=await userApi.get('/me');
    return res.data;
}
export const userLogout=async()=>{
    const res=await userApi.post('/logout');
    return res.data;
}