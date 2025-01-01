import { Blog } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type blogI = {
  type: "paragraph" | "image";
  content: string;
};

type createBlog = {
  title: string;
  content: blogI[];
  value: string | null;
};

export const useBlogCreate = () => {
  const blogCreateRequest = async (data: createBlog): Promise<void> => {
    const response = await fetch(`${BASE_URL}/blog/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: blogCreateRequest,
    onSuccess: () => {
      toast.success("blog created successfully");
    },
    onError: (err) => {
      toast.error(err.message || "something went wrong");
    },
  });

  return { mutate, isPending };
};

export const useGetAllBlogs = () => {
  const getAllBlogsRequest = async (): Promise<Blog[]> => {
    const response = await fetch(`${BASE_URL}/blog/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const { data, isPending, isFetching } = useQuery({
    queryFn: getAllBlogsRequest,
    queryKey: ["getAllBlogsRequest"],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return { data, isPending, isFetching };
};

export const useGetSingleBlogWithId = (id: string) => {
  const getSingleBlogWithId = async (): Promise<Blog> => {
    const response = await fetch(`${BASE_URL}/blog/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryFn: getSingleBlogWithId,
    queryKey: ["getSingleBlogWithId"],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast.error(error.message || "Internal server error");
  }

  return { data, isPending, isFetching, error };
};

export const useGetMyBlogs = (id:string)=>{
  console.log(id)
  // const response = await fetch()
}