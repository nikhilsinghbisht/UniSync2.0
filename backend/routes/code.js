const express = require("express");
const router = express.Router();
const Code = require("../models/Code");
const Comment = require("../models/Comment");

// Get all code submissions
router.get("/", async (req, res) => {
	const codes = await Code.find().populate("user");
	res.json(codes);
});

// Post new code submission
router.post("/", async (req, res) => {
	const { code, description } = req.body;
	const newCode = new Code({ code, description, user: req.user._id });
	await newCode.save();
	res.json(newCode);
});

// Get comments for a code submission
router.get("/:id/comments", async (req, res) => {
	const comments = await Comment.find({ code: req.params.id }).populate("user");
	res.json(comments);
});

// Post new comment
router.post("/:id/comments", async (req, res) => {
	const { comment } = req.body;
	const newComment = new Comment({ comment, code: req.params.id, user: req.user._id });
	await newComment.save();
	res.json(newComment);
});

module.exports = router;
