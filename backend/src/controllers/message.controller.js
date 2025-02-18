export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredusers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");
        res.status(200).json(filteredusers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
}