import mongoose from "mongoose"
import Account from "../model/account.model.js"
import zod from "zod";

const transferMoneySchema = zod.object({
    amount: zod
    .number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than zero"),
    to: zod.string({ required_error: "Destination userId is required" })
})

export const getBalance = async (req,res)=>{
    try{
        const account = await Account.findOne({
            userId: req.userId
        })
    
        return res.status(200).json({
            "balance": account.balance
        })
    }
    catch(err){
        console.log(`Get balance error: ${err}`);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

export const transferMoney = async (req, res)=>{
    const transferForm = req.body;
    
    const response = transferMoneySchema.safeParse(transferForm);

    if(!response.success){
        return res.status(411).json({
            message: "Input is invalid"
        })

    }

    const session = await mongoose.startSession();
    try{

        session.startTransaction();
        //Fetch the account within transaction
        const account = await Account.findOne({ userId: req.userId}).session(session);

        if(!account || account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                "message": "Insufficient Balance"
            })
        }

        const toAccount = await Account.findOne({userId: to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                "message": "Invalid Account"
            })
        }

        // Perform the transfer
        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

        //commit the transaction
        await session.commitTransaction();

        return res.status(200).json({
            "message": "Transfer Successfull!!"
        })
    } 
    catch(err){
        return res.status(400).json({
            "message":"Transaction Unsuccessful."
        })
    }
    
}