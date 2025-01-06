import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type AddCommentProps = {
  blogId: string;
  commentText: string;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const addCommentRequest = async (data: AddCommentProps): Promise<void> => {
    const response = await fetch(`${BASE_URL}/comment/add-comment`, {
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

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addCommentRequest,
    mutationKey: ["addCommentRequest"],

    onSuccess: () => {
      toast.success("Comment added");
      queryClient.invalidateQueries({
        queryKey: ["getCommentsRequest"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { mutate, isPending, isSuccess };
};

type UserProps = {
  _id: string;
  username: string;
  imageUrl: string;
};

type ReplyProps = {
  content: string;
  userId: string;
  _id:string
};

export interface Comment {
  _id: string;
  comment: string;
  user: UserProps;
  blogId: string;
  createdAt: string;
  like: string[];
  replies: ReplyProps[];
}

export const useGetCommentsForBlog = (id: string) => {
  const getCommentsRequest = async (): Promise<Comment[]> => {
    const response = await fetch(`${BASE_URL}/comment/get-comments-Bid/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "No comments found");
    }

    return res;
  };

  const { data, isLoading, isPending } = useQuery({
    queryFn: getCommentsRequest,
    queryKey: ["getCommentsRequest"],

    refetchOnWindowFocus: false,
  });
  console.log(data);
  return { data, isLoading, isPending };
};

type UpdateCommentProps = {
  id: string;
  commentText: string | null;
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const updateCommentRequest = async (
    data: UpdateCommentProps
  ): Promise<void> => {
    const response = await fetch(
      `${BASE_URL}/comment/update-comment/${data.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateCommentRequest,
    mutationKey: ["updateCommentRequest"],

    onSuccess: () => {
      toast.success("Comment added");
      queryClient.invalidateQueries({
        queryKey: ["getCommentsRequest"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { mutate, isPending, isSuccess };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteCommentRequest = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/comment/delete-comment/${id}`, {
      method: "DELETE",
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

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCommentRequest,
    mutationKey: ["deleteCommentRequest"],

    onSuccess: () => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries({
        queryKey: ["getCommentsRequest"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { mutate, isPending };
};

type LikeCommentProps = {
  userId: string;
  commentId: string;
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  const likeCommentRequest = async (data: LikeCommentProps): Promise<void> => {
    const response = await fetch(`${BASE_URL}/comment/like-comment/`, {
      method: "PUT",
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

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: likeCommentRequest,
    mutationKey: ["likeCommentRequest"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCommentsRequest"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { mutate, isPending, isSuccess };
};
