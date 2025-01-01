import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Blog } from "@/schema";
import { Bookmark, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogProps {
  item: Blog;
}

function CardBlog({ item }: BlogProps) {
  const strings =
    "loremgelnbsbkls  nwl e fwe wgwfeqfwegwrgw g we  we ew gwe gwe fewgewew gewg ewgwe gwe qhth wgeaghe trhgwf weghwr ";
  return (
    <Link to={`read/${item._id}`}>
      <Card className="bg-gray-50 border-b- border-black p-2 flex-1 cursor-pointer">
        <div>
          <CardHeader className="">
            <div className="flex gap-2">
              <img
                src="https://pics.bc.ca/wp-content/uploads/2024/08/Mega_Job_Fair_4-1080x675.jpg"
                alt="Description of the image"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold italic">{item.author.username}</p>
                <p className="text-xs text-green-600">{item.author.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div>
              <h1 className="text-lg font-bold">{item.title}</h1>
              <p>{strings.slice(0, 150)}...</p>
            </div>
            <img
              src="https://pics.bc.ca/wp-content/uploads/2024/08/Mega_Job_Fair_4-1080x675.jpg"
              alt="Description of the image"
              className="w-20"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-4">
              <div className="flex items-center justify-center gap-1">
                <p>{item.likes.length}</p>
                <ThumbsUp size={18} />
              </div>
              <div className="flex items-center justify-center gap-1">
                <p>{item.comments.length}</p>
                <MessageCircle size={18} />
              </div>
            </div>
            <div>
              <Bookmark />
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

export default CardBlog;
