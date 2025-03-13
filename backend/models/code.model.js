import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
	{
		description: { type: String, trim: true },
		code: { type: String, required: true },
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);
export default Code;
