import { RepliesListProps } from "@/api/reply";

function SeeReplies({ data }: RepliesListProps) {
  return (
    <div className="flex gap-3 flex-col mt-3">
      {data?.map((reply, i) => {
        return (
          <div key={i} className="bg-slate-200 rounded-lg p-3 ml-4">
            <div className="flex gap-2">
              <p>{reply.user.imageUrl}</p>
              <p className="text-sm">
                <strong>{reply.user.username}</strong>
              </p>
            </div>
            <p>{reply.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SeeReplies;
