import User from '../models/userModel.js'

export const findOne = async (email, nikename) => {
  return await User.findOne({ email, nikename })
}
export const create = async (data) => {
  return await User.create(data)
}

export const update = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true })
}


export const getUser = async (id) => {
  return await User.findById(id)
}


export const findById = async (id) => {
  return await User.findById(id)
}


export const findAll = async () => {
  return await User.find()
}