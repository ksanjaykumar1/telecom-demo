import express from 'express';
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
