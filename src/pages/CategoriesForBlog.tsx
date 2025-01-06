import { categories } from "@/assets/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

import { onAddCategory } from "@/redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { MoveRight } from "lucide-react";

type CategoriesForBlogProps = {
  blogId?: string;
};

function CategoriesForBlog({ blogId }: CategoriesForBlogProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [showInputOther, setShowInputOther] = useState<boolean>(false);

  useEffect(() => {
    dispatch(onAddCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  const value = useSelector((state: RootState) => state.categoryReducer.value);

  const onSkip = () => {
    navigate("/write-blog");
  };

  const onOtherClick = () => {
    if (showInputOther) {
      setShowInputOther(false);
    } else {
      setShowInputOther(true);
    }
  };

  return (
    <Card>
      <CardTitle className="flex justify-center items-center gap-4">
        <div className="text-2xl font-bold text-center my-9">
          Choose category for your blog
        </div>
        {blogId ? (
          ""
        ) : (
          <Link to={"/write-blog"}>
            <Button onClick={onSkip}>Skip</Button>
          </Link>
        )}
      </CardTitle>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {categories.map((category, index) => (
            <label
              key={index}
              className="flex items-center gap-2 w-32 border-2 border-black p-2  rounded-lg cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => setSelectedCategory(category)}
                className="sr-only peer"
                checked={value === category}
              />
              {/* Custom radio indicator */}
              <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-gray-500 peer-checked:border-gray-500"></div>
              <span className="text-gray-700 text-sm font-bold truncate">
                {category}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          onClick={onOtherClick}
          className="border-black border-2 p-4 rounded-full"
        >
          Other
        </Button>
        {showInputOther && (
          <Input
            placeholder="Type category here..."
            className="border-2 border-black"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          />
        )}
        {blogId ? (
          ""
        ) : (
          <Link to={"/write-blog"}>
            <Button className="flex items-center justify-center min-w-full p-3 ">
              Next <MoveRight />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default CategoriesForBlog;
