import jwt from "jsonwebtoken";
import { getUserById } from "../services/userService.js";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        error: "Access denied. No valid token provided.",
        details: [{ field: 'authorization', message: 'Bearer token required in Authorization header' }]
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        error: "Access denied. Token is missing.",
        details: [{ field: 'token', message: 'JWT token is required' }]
      });
    }

    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    
    if (decoded.sub) {
      const user = await getUserById(decoded.sub);
      if (!user) {
        return res.status(401).json({ 
          error: "Access denied. User not found.",
          details: [{ field: 'user', message: 'User associated with token no longer exists' }]
        });
      }
      req.user = { ...decoded, userData: user };
    } else {
      req.user = decoded;
    }

    console.log(req.user)

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        error: "Access denied. Token has expired.",
        details: [{ field: 'token', message: 'JWT token has expired' }]
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        error: "Access denied. Invalid token.",
        details: [{ field: 'token', message: 'Invalid JWT token format' }]
      });
    } else {
      console.error("Auth middleware error:", err);
      return res.status(500).json({ 
        error: "Internal server error during authentication" 
      });
    }
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: "Authentication required" 
    });
  }

  const userRole = req.user.userData?.role || req.user.role;
  
  if (userRole !== 'admin') {
    return res.status(403).json({ 
      error: "Access denied. Admin privileges required.",
      details: [{ field: 'role', message: 'This action requires admin privileges' }]
    });
  }

  next();
};