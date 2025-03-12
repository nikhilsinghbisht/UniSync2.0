import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";

const CodeArea = () => {
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");

	const queryClient = useQueryClient();

	// Fetch existing code submissions
	const { data: codeSubmissions } = useQuery({
		queryKey: ["codeSubmissions"],
		queryFn: async () => {
			const res = await axiosInstance.get("/code");
			return res.data;
		},
	});

	// Submit new code
	const { mutate: postCode } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post("/code", { code, description });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["codeSubmissions"] });
			setCode("");
			setDescription("");
		},
	});

	return (
		<div className="bg-white shadow-md p-4 rounded-lg">
			<h2 className="text-lg font-semibold mb-4">Share Your Code</h2>
			<textarea
				className="w-full border rounded p-2 mb-2"
				placeholder="Write your code here..."
				rows="8"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>
			<textarea
				className="w-full border rounded p-2 mb-2"
				placeholder="Description (optional)"
				rows="2"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				onClick={() => postCode()}
				disabled={!code.trim()}
			>
				Post Code
			</button>

			{/* Display code submissions */}
			<div className="mt-6">
				<h3 className="text-md font-semibold mb-2">Recent Submissions</h3>
				{codeSubmissions?.map((submission) => (
					<div key={submission._id} className="border-b py-2">
						<pre className="bg-gray-100 p-2 rounded text-sm">
							{submission.code}
						</pre>
						<p className="text-gray-600 mt-1">{submission.description}</p>
						<Comments submissionId={submission._id} />
					</div>
				))}
			</div>
		</div>
	);
};

const Comments = ({ submissionId }) => {
	const [comment, setComment] = useState("");
	const queryClient = useQueryClient();

	// Fetch comments for the submission
	const { data: comments } = useQuery({
		queryKey: ["comments", submissionId],
		queryFn: async () => {
			const res = await axiosInstance.get(`/code/${submissionId}/comments`);
			return res.data;
		},
	});

	// Post new comment
	const { mutate: postComment } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/code/${submissionId}/comments`, { comment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", submissionId] });
			setComment("");
		},
	});

	return (
		<div className="ml-4">
			{comments?.map((c) => (
				<p key={c._id} className="text-gray-700 mt-1">
					<strong>{c.user}:</strong> {c.comment}
				</p>
			))}
			<input
				type="text"
				className="border rounded p-1 mt-2 w-full"
				placeholder="Write a comment..."
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>
			<button
				className="text-blue-500 mt-1"
				onClick={() => postComment()}
				disabled={!comment.trim()}
			>
				Post
			</button>
		</div>
	);
};

export default CodeArea;
