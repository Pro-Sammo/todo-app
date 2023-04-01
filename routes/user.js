import express from 'express'
import { register, deleteUser, getAllUser, updateUser, getUserDetails, userLogin, userProfile, logout } from '../controller/user.js'
import { isAuthenticated } from '../middleware/auth.js'
const router = express.Router()

router.route("/register").post(register)
router.route("/login").get(userLogin)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated,userProfile)
router.route("/all").get(getAllUser)
router.route("/:id").get(getUserDetails).put(updateUser).delete(deleteUser)

export default router;  