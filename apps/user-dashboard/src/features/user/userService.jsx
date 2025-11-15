import * as crudService from '../../services/crudService';

export const fetchMeAPI = () => crudService.getAll('/users/me');


// export const updateUserAPI = (id, data) => crudService.updatePartial('/users', id, data);

export const updateMeAPI = (data) => crudService.updatePartial('/users/updateMe', '', data);


export const updateUserPhotoAPI = (data) => crudService.updatePartial('/users/updateMe', '', data);
