import express from 'express';
import rateLimiter from 'express-rate-limit';
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
