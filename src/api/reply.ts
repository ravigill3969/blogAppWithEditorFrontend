import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

type AddReplyProps = {
  commentId: string;
  content: string;
};

export const useAddReply = () => {
  const queryClient = useQueryClient();

  const addReply = async (data: AddReplyProps) => {
    const response = await fetch(
      `${BASE_URL}/reply/add-reply/${data.commentId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replyContent: data.content }),
      }
    );

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong");
    }

    return res;
  };

  const mutate = useMutation({
    mutationFn: addReply,
    mutationKey: ["addReply"],
    onSuccess: () => {
      toast.success("reply added");
      queryClient.invalidateQueries({
        queryKey: ["getCommentsRequest"],
      });
    },
  });

  return mutate;
};

type UserProps = {
  _id: string;
  username: string;
  imageUrl: string;
};

export interface Reply {
  _id: string;
  user: UserProps;
  content: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepliesListProps {
  data?: Reply[];
}

export const useGetRepliesWithCommentId = (id?: string | null) => {
  const getRepliesRequest = async (): Promise<Reply[]> => {
    const response = await fetch(`${BASE_URL}/reply/get-reply/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message || "something went wrong!");
    }
    console.log(res);
    return res;
  };

  const query = useQuery({
    queryFn: getRepliesRequest,
    queryKey: ["getRepliesRequest", id],
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return query;
};
