import * as positionRepo from "../dataAccess/positionRepo.js"
export const  createPosition = async (data) => {
    if (!data) {
        throw new Error("Data is required to create a position"); 
    }
    const results = await positionRepo.create(data)
    return results
}
export const getAllPositions = async () => {
    const results = await positionRepo.getAll()
    return results
}   

export const getPositionById = async (id) => {
    if (!id) {
        throw new Error("ID is required to get a position"); 
    }
    const results = await positionRepo.getOne(id)
    return results
}       
export const updatePositionById = async (id, data) => {
    if (!id || !data) {
        throw new Error("ID and data are required to update a position"); 
    }
    
    const results = await positionRepo.update(id, data)
    if(!results){
        throw new Error("Position not found"); 
    }   
    return results
}
export const deletePositionById = async (id) => {
    if (!id) {
        throw new Error("ID is required to delete a position"); 
    }
    const results = await positionRepo.remove(id)
    if(!results){
        throw new Error("Position not found"); 
    }
    return results 
}




