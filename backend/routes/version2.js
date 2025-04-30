// example ke liye h ye, sab functionality v1 me hai, v2 me nahi hai
import express from 'express';
import accountRouter from './v2/account.route.js';
import userRouter from './v2/user.route.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/accounts", accountRouter);

export default router;
