import * as crudService from '../../services/crudService';

export const fetchMeAPI = () => crudService.getAll('/users/me');



export const updateMeAPI = (data) => crudService.updatePartial('/users/updateMe', '', data);


export const updateUserPhotoAPI = (data) => crudService.updatePartial('/users/updateMe', '', data);
