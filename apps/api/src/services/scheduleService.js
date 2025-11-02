import * as scheduleRepo from '../dataAccess/scheduleRepo.js'
import AppError from '../utils/AppError.js'


export const createSchedule = async (data) => {
  return await scheduleRepo.create(data)
}

export const updateSchedule = async (id, data) => {
  const updatedschedule = await scheduleRepo.update( id, data )
  if ( !updatedschedule ) throw new AppError( "Shift Not Found", 404 )
  return updatedschedule
}

export const getAllSchedules = async () => {
  return await scheduleRepo.findAll()
}

export const getSchedule = async ( id ) => {
  const schedule = await scheduleRepo.findById( id )
  if ( !schedule ) throw new AppError( "Shift Not Found", 404 )
  return schedule
}

export const deleteSchedule = async ( id ) => {
  data = { isActive: false }
  const schedule = await scheduleRepo.update( id, data )
  if ( !schedule ) throw new AppError( "Shift Not Found", 404 )
  return schedule
}
