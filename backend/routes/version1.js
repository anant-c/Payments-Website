import express from 'express';
import accountRouter from './v1/account.route.js';
import userRouter from './v1/user.route.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
