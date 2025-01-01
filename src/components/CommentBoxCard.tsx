import useGetUserId from "@/hooks/use-getUserId";
import {
  useDeleteComment,
  useLikeComment,
  useUpdateComment,
} from "@/api/comment";
import {
  Edit,
  MessageCircleCodeIcon,
  ThumbsUp,
  Trash,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

interface User {
  _id: string;
  username: string;
  imageUrl: string;
}

interface Comment {
  _id: string;
  blogId: string;
  comment: string;
  createdAt: string;
  like: string[];
  user: User;
}

interface CommentBoxProps {
  data?: Comment[];
}

function CommentBox({ data }: CommentBoxProps) {
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [isEditingValue, setIsEditingValue] = useState<string>("");

  const userId = useGetUserId();

  const { mutate } = useDeleteComment();
  const { mutate: updateCommentFn, isSuccess } = useUpdateComment();
  const { mutate: mutateLikeComment } = useLikeComment();

  const likeHandler = (id: string) => {
    console.log(id);
    mutateLikeComment({ commentId: id, userId: userId || "" });
  };

  const deleteComment = (id: string) => {
    mutate(id);
  };

  const editingComment = (id: string) => {
    setIsEditingId(id);
  };

  const updateComment = (id: string) => {
    updateCommentFn({ commentText: isEditingValue, id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEditingId(null);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex flex-col gap-4 ">
        {data &&
          [...data].reverse().map((item, i) => (
            <div className="border p-4 rounded-lg" key={i}>
              <div className="grid grid-cols-[1fr_10fr] gap-2">
                <div>
                  <p>{item.user.imageUrl}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-base">
                    {item.user.username}
                  </p>
                  {isEditingId === item._id ? (
                    <Textarea
                      onChange={(e) => setIsEditingValue(e.target.value)}
                      value={isEditingValue}
                    />
                  ) : (
                    <p>{item.comment}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex gap-1 hover:cursor-pointer items-center text-blue-900 font-semibold"
                  title="Like"
                  onClick={() => likeHandler(item._id)}
                >
                  <ThumbsUp size={15} />
                  <span>{item.like.length}</span>
                </div>

                <div
                  className="flex gap-1 hover:cursor-pointer items-center"
                  title="Replies"
                >
                  <MessageCircleCodeIcon size={15} />
                  <span>Reply</span>
                </div>

                {userId === item.user._id ? (
                  <>
                    {isEditingId === item._id ? (
                      <div
                        className="flex gap-1 hover:cursor-pointer items-center"
                        title="Update"
                        onClick={() => updateComment(item._id)}
                      >
                        <Upload size={15} />
                        <span>Update</span>
                      </div>
                    ) : (
                      <div
                        className="flex gap-1 hover:cursor-pointer items-center"
                        title="Edit"
                        onClick={() => editingComment(item._id)}
                      >
                        <Edit size={15} />
                        <span>Edit</span>
                      </div>
                    )}
                    <div
                      className="flex gap-1 hover:cursor-pointer items-center text-red-500 font-semibold"
                      title="Delete"
                      onClick={() => deleteComment(item._id)}
                    >
                      <Trash size={15} />
                      <span>Delete</span>
                    </div>
                  </>
                ) : null}
              </div>
              <p>See replies</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default CommentBox;
