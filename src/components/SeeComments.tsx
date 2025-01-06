import { useGetCommentsForBlog } from "@/api/comment";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";
import Loading from "./Loading";
import CommentBox from "./CommentBoxCard";

interface ISeeComments {
  blogId: string;
}

function SeeComments({ blogId }: ISeeComments) {
  const { toggleSidebar } = useSidebar();

  const { data, isLoading, isPending } = useGetCommentsForBlog(blogId);

  if (isLoading || isPending) {
    <Loading />;
  }

  const sideBarHandler = () => {
    toggleSidebar();
  };

  return (
    <>
      <Button className="mt-5" onClick={sideBarHandler}>
        See Comments
      </Button>
      <Sidebar
        side="right"
        variant="sidebar"
        className="border-l-2 border-black"
      >
        <SidebarHeader>
          <h2 className="text-xl mt-5 font-bold m-2">Comments</h2>
        </SidebarHeader>

        <SidebarContent className="ml-4">
          {isLoading || isPending ? <Loading /> :  <CommentBox data={data} />}
        </SidebarContent>

        <SidebarFooter></SidebarFooter>
      </Sidebar>
    </>
  );
}

export default SeeComments;
