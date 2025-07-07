import User from '../model/user.model.js';
import Account from '../model/account.model.js';
import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = zod.object({
    firstName: zod.string().min(1).max(50),
    lastName: zod.string().min(1).max(50),
    password: zod.string().min(8),
    username: zod.string().email({ required_error: 'Email is required.', invalid_type_error: 'Email is invalid.' }),
})

const signinSchema = zod.object({
    username: zod.string().email({ required_error: 'Email is required.', invalid_type_error: 'Email is invalid.' }),
    password: zod.string().min(8)
})

const updateSchema = zod.object({
    password: zod.string().min(8).optional(),
    firstName: zod.string().min(1).max(50).optional(),
    lastName: zod.string().min(1).max(50).optional(),
})

export const userSignUp = async (req,res) =>{
    const newUser = req.body 
    const response = userSchema.safeParse(newUser);

    if(!response.success){
        return res.status(411).json({
            message: "Input is invalid"
        })
    }

    try{
        const user = await  User.findOne({
            // So "Babe" and " babe " won’t be treated as different.
            username: newUser.username.trim()
        })

        if(user){
            return res.status(411).json({
                message: "User Exists Already."
            })
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        //insert in db User creation
        const dbUser = await User.create(newUser);
        
        // initialize the starting balance for a User so insert balance in accounts db
        await Account.create({
            userId: dbUser._id,
            balance: 1 + Math.random()*10000    
        })

        // can have expires in argument
        // const token = jwt.sign({
        //     userId: dbUser._id
        // }, process.env.JWT_SECRET, {
        //     expiresIn: "1h"
        // })

        const token = jwt.sign({
            userId: dbUser._id
        }, process.env.JWT_SECRET)

        return res.status(200).json({
            message:"User created Successfully.",
            token: token
        })
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const userSignIn = async (req, res) =>{
    const credentials = req.body;
    const parsedCredentials = signinSchema.safeParse(credentials);

    if(!parsedCredentials.success){
        return res.status(411).json({
            message: "Invalid Credentials."
        })
    }

    try {
        const dbUser = await User.findOne({
            username: credentials.username
        })

        if(!dbUser){
            return res.status(404).json({
                message:"User not found."
            })
        }

        const isPasswordCorrect = bcrypt.compare(credentials.password, dbUser.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Incorrect Password."
            });
        }

        const token = jwt.sign({
            userId: dbUser._id
        }, process.env.JWT_SECRET)

        return res.status(200).json({
            message: "Sign in successful.",
            token: token
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error."
        })
    }

   
}

export const userUpdate = async (req,res) =>{
    const credentials = req.body;
    const parsedCredentials = updateSchema.safeParse(credentials);

    if(!parsedCredentials.success){
        return res.status(411).json({
            message: "Invalid Credentials."
        })
    }

    try{
        const updateData = {...parsedCredentials.data};

        // Hash new password if it's changed
        if(updateData.password){
            updateData.password = await bcrypt.hash(updateData.password,10)
        }
        
        await User.updateOne(
            {
                _id: req.userId
            },
            {$set: updateData}
        );

        return res.status(200).json({
            message: "User updated successfully."
        })

    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

export const userDetails = async (req, res) =>{
    try{
        const user = await User.findById(req.userId).select('firstName lastName username')

        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({
            message:"Error while fetching user details."
        })
    }
}

export const userSearch = async (req,res)=>{
    const filter = req.query.filter || "";

    try{
        const users = await User.find({
            $or: [{
                    firstName: {
                        // just like "LIKE" keyword in sql will find all 
                        "$regex": filter,
                        "$options": 'i',
                    }
                },{
                    lastName:{
                        "$regex": filter,
                        "$options": 'i',
                    }
                }
            ]
        })
    
        return res.status(200).json({
            message:"Users searched Query",
            user: users.map(user=>({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
}