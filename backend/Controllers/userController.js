import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');
        /*if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }*/
        res.status(200).json({ success: true, message: "User found", data: user });
    } catch (err) {
        res.status(404).json({ success: false, message: "No user found" });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const {password, ...rest} = user_doc
        res.status(200).json({ success: true, message: 'Profile info is getting', data: {...rest} });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
};

