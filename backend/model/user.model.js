import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        require: true,
        trim: true, //This automatically removes leading and trailing whitespace from a string before saving it.        
        maxLength: 50
    },
    password: {
        type: String,
        require: true,
        minLenght: 6
    },
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    }
},{
    timestamps:true 
}
)

const User = mongoose.model('User', userSchema)

export default User;
