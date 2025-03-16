import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
// import Codepost from "../CodePost";

const CodeArea = () => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const { mutate: postCode, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/code/submit", {
        code,
        description,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCode("");
      setDescription("");
      queryClient.invalidateQueries(["posts"]);

      setTimeout(() => navigate("/"), 1500);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    },
  });

  return (
    <>
    <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Share Your Code</h2>

      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Description..."
        rows="2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="w-full border rounded p-2 mb-2 bg-gray-900 text-white">
        <CodeMirror
          value={code}
          height="200px"
          extensions={[javascript()]}
          theme="dark"
          onChange={(value) => setCode(value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => postCode()}
        disabled={!code.trim() || isLoading}
      >
        {isLoading ? "Submitting..." : "Post Code"}
      </button>


    {/* <Codepost /> */}

    </div>
   
    </>
  );
};

export default CodeArea;
