import { validateToken } from "@/api/user";
import { addUserId } from "@/redux/slice/userSlice";
import useAppStore from "@/zustand/zustand";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const { setIsLoggedIn } = useAppStore();

  const { isError, data } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(addUserId(data?.userId || null));
    setIsLoggedIn(!isError);
  }, [isError, setIsLoggedIn, data?.userId, dispatch]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
