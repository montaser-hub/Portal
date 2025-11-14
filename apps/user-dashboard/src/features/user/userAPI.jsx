import * as crudService from '../../services/crudService';

const endpoint = '/users';


export const fetchCurrentUser = async () => {
  const user = await crudService.getAll(`${endpoint}/me`);
  return user.data.data;
};

export const updateCurrentUser = async (data) => {
  const updatedUser = await crudService.edit(`${endpoint}/updateMe`, '', data);
  return updatedUser.data.data;
};

export const uploadUserPhoto = async (photo) => {
  const formData = new FormData();
  if (photo) {
    formData.append('photo', photo);
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
