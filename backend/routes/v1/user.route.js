import express from 'express'
import { userSignIn, userSignUp, userUpdate, userSearch, userDetails } from '../../controllers/user.controller.js'
import { authMiddleware } from '../../middlewares/user.auth.middleware.js'

const router = express.Router()


router.post("/signup", userSignUp)
router.post("/signin", userSignIn)
router.get("/protected-route", authMiddleware, (req,res)=>{
    res.status(200).json({
        message:"Access Granted"
    })
})
router.get("/profile", authMiddleware, userDetails);

router.put("/",authMiddleware,userUpdate)

router.get("/bulk", authMiddleware,userSearch);



export default router;