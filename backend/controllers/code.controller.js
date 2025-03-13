import Code from "../models/code.model.js";

export const submitCode = async (req, res) => {
    try {
        const { description, code } = req.body;

        if (!code) return res.status(400).json({ message: "Code is required" });

        const newCode = new Code({
            description,
            code,
            author: req.user._id,
        });

        await newCode.save();
        const updatedFeed = await Code.find({
            author: { $in: [...req.user.connections, req.user._id] }
        })
            .populate("author", "name username profilePicture")
            .sort({ createdAt: -1 });

        res.status(201).json({ message: "Code submitted successfully", feed: updatedFeed });
    } catch (error) {
        console.error("Error in submitCode:", error);
        res.status(500).json({ message: "Failed to submit code. Please try again later." });
    }
};


export const getAllCodes = async (req, res) => {
    try {
        const codes = await Code.find()
            .populate("author", "name username profilePicture")
            .sort({ createdAt: -1 }); // ✅ Sort newest first

        res.status(200).json(codes);
    } catch (error) {
        console.error("Error in getAllCodes:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getCodeFeed = async (req, res) => {
    try {
        const feed = await Code.find({
            author: { $in: [...req.user.connections, req.user._id] }
        })
            .populate("author", "name username profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json(feed);
    } catch (error) {
        console.error("Error in getCodeFeed:", error);
        res.status(500).json({ message: "Server error" });
    }
};
