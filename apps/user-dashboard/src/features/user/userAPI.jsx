import * as crudService from '../../services/crudService';

const endpoint = '/users';


export const fetchCurrentUser = async () => {
  const user = await crudService.getAll(`${endpoint}/me`);
  return user;
};

export const updateCurrentUser = async (data) => {
  const updatedUser = await crudService.edit(`${endpoint}/updateMe`, '', data);
  return updatedUser;
};

export const uploadUserPhoto = async (file) => {
  const formData = new FormData();
  if (file) {
    formData.append('photo', file);
  } else {
    formData.append('photo', "");
  }
  const response = await crudService.edit(`${endpoint}/updateMe`, "", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};
