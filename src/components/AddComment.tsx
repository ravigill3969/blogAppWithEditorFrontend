import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useAddComment } from "@/api/comment";

interface AddCommentProps {
  blogId: string;
}

function AddComment({ blogId }: AddCommentProps) {
  const [value, setValue] = useState("");

  const { isPending, mutate, isSuccess } = useAddComment();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setValue(e.target.value);
  };

  const addCommentHandler = () => {
    mutate({ blogId: blogId, commentText: value });
    if (isSuccess) {
      setValue("")
    }
  };
  const clearHandler = () => {
    setValue("");
  };

  return (
    <div className="flex gap-4 flex-col">
      <h1 className="text-lg font-semibold ">Add Comment</h1>

      <Textarea
        rows={1}
        placeholder="Write your comment here..."
        value={value}
        onChange={handleInput}
        style={{ overflow: "hidden", resize: "none" }}
        className="w-full border p-2 rounded-md"
      />
      <div className="flex gap-4">
        <Button onClick={addCommentHandler} disabled={isPending}>
          Add comment
        </Button>
        <Button variant={"outline"} onClick={clearHandler} disabled={isPending}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
