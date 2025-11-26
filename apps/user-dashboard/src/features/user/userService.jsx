import * as crudService from '../../services/crudService';

export const fetchMeAPI = () => crudService.getAll('/users/me');



export const updateMeAPI = (data) => crudService.update('/users/updateMe', '', data);


export const updateUserPhotoAPI = (data) => crudService.update('/users/updateMe', '', data);

export const updateUserPassAPI = (data) => crudService.update('/users/updateMyPassword', '', data);
