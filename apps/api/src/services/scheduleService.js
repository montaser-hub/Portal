import * as scheduleRepo from '../dataAccess/scheduleRepo.js'
import AppError from '../utils/AppError.js'
import { getAllDocuments } from './queryService.js'


export const createSchedule = async (data, user) => {console.log(user)
  if(user?.role.includes('user')) data.userId = user._id
  return await scheduleRepo.create(data)
}

export const updateSchedule = async (id, data) => {
  const updatedschedule = await scheduleRepo.update( id, data )
  if ( !updatedschedule ) throw new AppError( "Shift Not Found", 404 )
  return updatedschedule
}

export const getAllSchedules = async (queryParams) => {
  const searchableFields = ['userId', 'date', 'shiftId', 'subDepartmentId', 'departmentId', 'swapRequestId', 'isActive'];
  return  await getAllDocuments(scheduleRepo, queryParams, searchableFields);
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
