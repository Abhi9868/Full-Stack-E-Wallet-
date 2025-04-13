import User from "../models/userModel.js";

const kycCheck = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user.kycStatus) {
        return res.status(403).json({ message: 'KYC not completed. Access denied.' });
    }
    next();
};

export default kycCheck;
