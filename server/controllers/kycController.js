import User from "../models/userModel.js";

export const updateKYC = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { kycStatus: true },
            { new: true }
        );

        res.json({
            message: 'KYC updated successfully',
            user: {
                email: user.email,
                phone: user.phone,
                kycStatus: user.kycStatus
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update KYC', error: error.message });
    }
};
