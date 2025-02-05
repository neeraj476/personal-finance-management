import {Router} from 'express'
import { userLogin, userLogOut, userRegister , userProfile, updateProfile } from '../controllers/user.controller.js';
import authUser from '../middleware/authUser.js'
const router = Router();
router.post("/register" , userRegister);
router.post("/login" , userLogin);
router.get("/logout" , userLogOut   );
router.get("/profile" ,authUser, userProfile);
router.put("/profile" ,authUser, updateProfile);

export default router;