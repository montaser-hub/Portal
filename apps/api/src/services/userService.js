import * as userRepo from "../dataAccess/userRepo.js"
export const isExists = async( email, nikename ) => {
  const exists = await userRepo.findOne( email, nikename )
  if(exists) throw new Error("User Already Exists" )
}


export const addUser = async ( data ) => {
  const {email, nikename, ...body} = data

  await isExists( email, nikename )
  return await userRepo.create({email, nikename, ...body})
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








