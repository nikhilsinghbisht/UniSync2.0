const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
	code: { type: String, required: true },
	description: { type: String },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Code", CodeSchema);
