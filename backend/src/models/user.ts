import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username:{
        type: String,
        required: true,
        unique: true   
    },
    password:{
        type: String,
        required: true 
    },
    firstName: {
        type: String,
        required: true    
    },
    lastName: {
        type: String,
        required: true    
    },
    gender:{
         type: String,
        required: true,
        enum: ['M', 'Z']
    },
    address:{
        type: String,
        required: true    
    },
    phone:{
        type: String,
        required: true    
    },
    email:{
        type: String,
        required: true,
        unique: true    
    },
    profileImage:{
        type:String,
        default: '/uploads/default.jpg'
    },
    creditCard:{
        type: String,
        required: true    
    },
     status: {
        type: String
    },
    type:{
        type: String,
        required: true    
    }
    }
)

export default mongoose.model('User', User, 'users');