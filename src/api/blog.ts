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

export const useGetSingleBlogWithId = (id: string | undefined) => {
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
    enabled: !!id,
  });

  if (isError) {
    toast.error(error.message || "Internal server error");
  }

  return { data, isPending, isFetching, error };
};

type BlogPost = {
  _id: string;
  title: string;
  category: string;

  blogInfo: Array<{
    content: string;
    type: string;
  }>;
  author?: string;
  likes: Array<string>;
  comments?: Array<{
    content: string;
    author: string;
  }>;
};

export const useGetMyBlogs = () => {
  const getMyBlogs = async (): Promise<BlogPost[]> => {
    const response = await fetch(`${BASE_URL}/blog/my-blogs`, {
      method: "GET",
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const query = useQuery({
    queryKey: ["getMyBlogs"],
    queryFn: getMyBlogs,
  });

  return query;
};

type editBlog = {
  _id: string;
  title: string;
  content: blogI[];
  value: string | null;
};

export const useEditMyBlog = () => {
  const editMyBlog = async ({
    content,
    title,
    value,
    _id,
  }: editBlog): Promise<void> => {
    const response = await fetch(`${BASE_URL}/blog/edit-blog/${_id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, title, value }),
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "Internal server error");
    }
  };

  const mutation = useMutation({
    mutationKey: ["editMyBlog"],
    mutationFn: editMyBlog,
  });

  return mutation;
};
