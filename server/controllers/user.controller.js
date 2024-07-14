import { z } from "zod";
import { User } from "../models/user.modal.js";

export async function login(req, res) {

  const reqSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  if (!reqSchema.safeParse(req.body).success) {
    return res.status(300).json({ msg: "please enter valid email" });
  }

  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(300).json({ msg: "please enter valid email" });
  }

  const user = await User.findOne({
    email
})

if (!user) {
    return res.json({msg: 'user not found'})
}
   

const isPasswordValid = await user.comparePassword(password)

if (!isPasswordValid) {
    return res.json({msg: 'password  not match'})

}

return res.status(200).json({msg: 'login succesfully'})
}


const logoutUser = async(req, res) => {
  

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "User logged Out"})
}






export async function register(req, res) {

  const reqSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  if (!reqSchema.safeParse(req.body).success) {
    return res.status(300).json({ msg: "please enter valid data" });
  }

  const { email, password, username } = req.body;

  if (email === "" || password === "" || username === "") {
    return res.status(300).json({ msg: "please enter valid data" });
  }

  const existedUser = await User.findOne({
    email: email,
  });

  if (existedUser) {
    return res.json({ msg: "user email is already exists" });
  }

  const user =await User.create({
    email, password, username
  })

  const createdUser = await User.findById(user._id).select(
    "-password"
  )

  return res.status(200).json({user:createdUser,msg:'user created successfully'});
}
