// src/middleware/authUser.js
import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token; // Get the token from the cookie safely
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach user data to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authUser;
