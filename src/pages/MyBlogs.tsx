import { useGetMyBlogs } from "@/api/blog";
import { Link } from "react-router-dom";

function MyBlogs() {
  const { data } = useGetMyBlogs();
  return (
    <div className="flex gap-3 flex-col">
      {data?.map((blog, i) => {
        return (
          <div key={i} className=" flex  flex-col gap-4">
            <Link to={`/edit-blog/${blog._id}`}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default MyBlogs;
