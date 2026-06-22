import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "./userApi";
import { getAdmin } from "./adminApi";

export const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
export const useAuthAdmin = () => {
  const authAdmin = useQuery({
    queryKey: ["authAdmin"],
    queryFn: getAdmin,
    retry: false,
  });
  return { isLoadingAdmin: authAdmin.isLoading, authAdmin: authAdmin.data?.data };
};
