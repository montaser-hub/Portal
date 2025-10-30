import * as userRepo from "../dataAccess/userRepo.js"
import * as authService from "./authService.js"

export const login = async ( email, nickname, password) => {
  // 1) check if the user && password is correct
  const user = await userRepo.findOne(email, nickname);
  //since the instance method that is available on all users is documented
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error('Incorrect email or password');
  }
  // 2) if everything ok, return token to client
  return authService.createTokenPayload(user);
}
export const isExists = async( email, nikename ) => {
  const exists = await userRepo.findOne( email, nikename )
  if(exists) throw new Error("User Already Exists" )
}


export const addUser = async ( data ) => {
  const {email, nickname, ...body} = data

  await isExists( email, nickname )
  return await userRepo.create({email, nickname, ...body})
}

export const updateUser = async ( id, data ) => {
  const { email, nikename, ...body } = data

  await isExists( email, nikename )

  const updatedUser = await userRepo.update(id, { email, nikename, ...body })

  if(!updatedUser) throw new Error("User Not Found")
  return updatedUser
}
export const getUser = async ( id ) => {
  const user = await userRepo.findById( id )
  if(!user) throw new Error("User Not Found")
  return user
}
export const getAllUsers = async () => {
  return await userRepo.findAll()
}








