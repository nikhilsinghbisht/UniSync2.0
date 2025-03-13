import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodePost = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 p-4">
      <div className="flex items-center">
        <Link to={`/profile/${post?.author?.username}`}>
          <img
            src={post?.author?.profilePicture || "/avatar.png"}
            alt={post?.author?.name || "User"}
            className="size-10 rounded-full mr-3"
          />
        </Link>
        <div>
          <Link to={`/profile/${post?.author?.username}`}>
            <h3 className="font-semibold text-gray-900">{post.author?.name}</h3>
          </Link>
          <p className="text-sm text-gray-500">@{post.author?.username}</p>
        </div>
      </div>

      {post.description && (
        <p className="text-gray-700 mb-3">{post.description}</p>
      )}

      <div className="w-full border rounded bg-gray-900 text-white p-2 overflow-hidden">
        <CodeMirror
          value={post.code}
          height="200px"
          extensions={[javascript()]}
          theme="dark"
          readOnly
        />
      </div>
    </div>
  );
};

export default CodePost;
