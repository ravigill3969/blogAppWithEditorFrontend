import { useGetSingleBlogWithId } from "@/api/blog";
import AddComment from "@/components/AddComment";
import Loading from "@/components/Loading";
import SeeComments from "@/components/SeeComments";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { id } = useParams();
  const { data, isFetching, isPending, error } = useGetSingleBlogWithId(
    id || ""
  );
  if (isFetching || isPending) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error?.message}
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="text-2xl font-bold">{data.title}</div>

      <AddComment blogId={data._id} />
      <SidebarProvider>
        <SeeComments blogId={data._id} />
      </SidebarProvider>
    </div>
  );
}

export default BlogPage;
