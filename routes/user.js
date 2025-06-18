import express from 'express';
import {
  createUser,
  deleteUser,
  listUser,
  readUser,
  replaceUser,
  updateUser
} from '../controllers/user.controller.js'
//Middleware
import {
  authCheck
} from '../middlewares/auth.middleware.js'

const router = express.Router();

// ENDPOINT http://localhost:8000/api/users
router.get('/users',authCheck, listUser);
router.get('/user', readUser);
router.post('/user', createUser);
router.put('/user/:id', replaceUser);
router.patch('/user/role/:id', updateUser);
router.delete('/user/:id', deleteUser);

// Export
export default router;