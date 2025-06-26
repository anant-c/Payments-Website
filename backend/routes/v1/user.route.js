import express from 'express'
import { userSignIn, userSignUp, userUpdate, userSearch } from '../../controllers/user.controller.js'
import { authMiddleware } from '../../middlewares/user.auth.middleware.js'

const router = express.Router()


router.post("/signup", userSignUp)
router.post("/signin", userSignIn)

router.put("/",authMiddleware,userUpdate)

router.get("/bulk", authMiddleware,userSearch);



export default router;