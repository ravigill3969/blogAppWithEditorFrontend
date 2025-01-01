import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues, RegisterFormValues } from "../zod";


import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const registerUserRequest = async (
    data: RegisterFormValues
  ): Promise<void> => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "Failed to create user");
    }

    return res;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: registerUserRequest,
    mutationKey: ["registerUser"],
    onSuccess() {
      toast.success("seccessfully registered!");
      queryClient.invalidateQueries({
        queryKey: [validateToken],
      });
      navigate("/");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const loginUserRequest = async (data: LoginFormValues): Promise<void> => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "Failed to login");
    }

    return res;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: loginUserRequest,
    mutationKey: ["loginUser"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      await queryClient.refetchQueries({ queryKey: ["validateToken"] });
      toast.success("success");
      navigate("/");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};

type validateTokenI = {
  userId : string | null
}

export const validateToken = async ():Promise<validateTokenI> => {
  const response = await fetch(`${BASE_URL}/user/validate-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};
