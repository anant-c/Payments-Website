import express from 'express'
import { authMiddleware } from '../../middlewares/user.auth.middleware.js'
import { getBalance, transferMoney } from '../../controllers/account.controller.js'

const router = express.Router()

router.get("/balance", authMiddleware,  getBalance);

router.post("/transfer",authMiddleware, transferMoney)

export default router;