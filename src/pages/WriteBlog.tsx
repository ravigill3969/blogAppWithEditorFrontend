import { useBlogCreate } from "@/api/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useImageUpload from "@/components/useImageUpload";
import { PencilIcon, PictureInPicture, PlusCircleIcon, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function WriteBlog() {
  const [showIcons, setShowIcons] = useState(false); // Controls visibility of icons
  const [hideOpinion, setHideOpinion] = useState<boolean>(false);
  const { uploadImage, url, loading } = useImageUpload(
    import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET,
    import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
  );


  const { isPending, mutate } = useBlogCreate();
  const [title, setTitle] = useState(""); // Stores the blog title
  const [content, setContent] = useState<
    { type: "paragraph" | "image"; content: string }[]
  >([
    {
      type: "paragraph",
      content: "",
    },
  ]);


  const handleAddField = (type: "paragraph" | "image") => {
    setContent((prev) => [
      ...prev,
      { type, content: type === "paragraph" ? "" : "" },
    ]);
  };

  const handleRemoveField = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    const newContent = [...content];
    newContent[index].content = e.target.value;
    setContent(newContent);
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
    if (url) {
      const newContent = [...content];
      newContent[index].content = url;
      setContent(newContent);
    }
  };

  const value = useSelector((state: RootState) => state.categoryReducer.value);

  const handleUpload = () => {
    mutate({ title, content, value });
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="max-w-96 min-w-96 mb-6">
        <Label className="text-2xl">Title</Label>
        <div className="flex gap-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-lg"
          />
          <Button disabled={loading} onClick={handleUpload}>
            Upload
          </Button>
          <Button disabled={loading || isPending}>Preview</Button>
        </div>
      </div>
      <div className="flex">
        <p
          className={`opacity-35 mb-6 whitespace-pre-line ${
            hideOpinion ? "hidden" : ""
          }`}
        >
          {`Once you are done, you will see a preview. 
          We do recommend submitting first, 
          because there are higher chances of losing all the data.`}
          <br />
        </p>

        <X
          className={`${hideOpinion ? "hidden" : ""}`}
          onClick={() => setHideOpinion(hideOpinion ? false : true)}
        />
      </div>

      {/* Render Content Fields */}
      <div className="mt-5 max-w-[800px] min-w-[800px] flex flex-col gap-4">
        {content.map((block, index) => (
          <div key={index} className="relative">
            {block.type === "paragraph" && (
              <textarea
                value={block.content}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Write something..."
                style={{ overflow: "hidden" }}
                className="w-full shadow-md min-h-[50px] max-h-[500px] resize-none p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {block.type === "image" && (
              <div className="flex items-center">
                <Input
                  type="file"
                  accept="image/*"
                  className="shadow-lg flex-grow"
                  onChange={(e) => handleImageUpload(e, index)}
                />
                {block.content && (
                  <img
                    src={block.content}
                    alt="Uploaded"
                    className="w-full h-auto mt-2 rounded"
                  />
                )}
              </div>
            )}
            <X
              className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => handleRemoveField(index)}
            />
          </div>
        ))}
      </div>

      {/* Add Content Buttons */}
      <div className="max-w-[800px] min-w-[800px] flex mt-6 gap-3 items-center">
        <PlusCircleIcon
          size={40}
          className="cursor-pointer"
          onClick={() => setShowIcons(!showIcons)}
        />
        {showIcons && (
          <div className="flex border-2 rounded-md gap-4 p-2">
            <div title="Add image field">
              <PictureInPicture
                size={40}
                className="cursor-pointer"
                onClick={() => handleAddField("image")}
              />
            </div>
            <div title="Add paragraph field">
              <PencilIcon
                size={40}
                className="cursor-pointer"
                onClick={() => handleAddField("paragraph")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteBlog;
