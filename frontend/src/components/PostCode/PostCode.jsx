import { useState } from 'react';
import Button from '../ui/Button';
import TextArea from "../ui/Textarea";
import { Camera, Folder } from 'lucide-react';

const PostCode = ({ closePost, handleCreatePost, type }) => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    handleCreatePost({ type, content });
    setContent('');
    closePost();
  };

  return (
    <div>
      {/* Input Section */}
      <TextArea
        placeholder={`Write a ${type}...`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 p-3 border border-gray-300 rounded-md"
      />

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-4">
          <Camera
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={24}
            onClick={() => alert('Attach an image')}
          />
          <Folder
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={24}
            onClick={() => alert('Attach a file')}
          />
        </div>
        <Button
          onClick={handlePost}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            !content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          disabled={!content.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostCode;
