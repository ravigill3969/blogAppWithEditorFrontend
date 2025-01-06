import { useGetMyBlogs } from "@/api/blog"

function MyBlogs() {
    const {data} = useGetMyBlogs()
    console.log(data)
  return (
    <div>MyBlogs</div>
  )
}

export default MyBlogs