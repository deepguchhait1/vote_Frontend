import { adminApi } from "./axios";

export const adminLogin = async (data) => {
  const res = await adminApi.post("/login", data);
  return res.data;
};
export const getAdmin = async () => {
  const res = await adminApi.get("/profile");
  return res.data;
};
export const adminLogout = async () => {
  const res = await adminApi.post("/logout");
  return res.data;
};
