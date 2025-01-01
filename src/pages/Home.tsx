import { useGetAllBlogs } from "@/api/blog";
import CardBlog from "@/components/CardBlog";
import Loading from "@/components/Loading";


function Home() {
  const { data, isPending, isFetching } = useGetAllBlogs();

  if (isPending || isFetching) {
    return <Loading />;
  }
  if (data) {
    return (
      <div className="grid grid-cols-[3fr_1fr] gap-5">
        {/* First Column */}
        <div className="gap-6 flex flex-col">
          {/* Vertical Separator */}
          {data.map((item, i) => {
            return <CardBlog key={i} item={item} />;
          })}
          <div className="border-r-2 border-black h-auto"></div>
        </div>
        {/* Second Column */}
        <div className="bg-slate-400">sidebar</div>
      </div>
    );
  }
}

export default Home;
