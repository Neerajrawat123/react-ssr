import { model, Schema } from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
  },
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    this.password =await bcryptjs.hash(this.password ,10)
    next()
})

userSchema.methods.comparePassword = async function(password){
   return await bcryptjs.compare(password, this.password)
}


userSchema.methods.generateAccesToken = async function(){
    return jwt.sign({
        id: this.id,
        username: this.username,
        email: this.email
    },
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn: '7d'
})
}


export const User = model('User', userSchema)