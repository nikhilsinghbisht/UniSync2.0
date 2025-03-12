const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	comment: { type: String, required: true },
	code: { type: mongoose.Schema.Types.ObjectId, ref: "Code" },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", CommentSchema);
