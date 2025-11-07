import api from "../api";

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data.data;
};

export const updateMe = async (data) => {
  const allowedFields = (({ firstName, lastName, email, phone, dateOfBirth, photo }) => ({
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
  })
)(data);

  const res = await api.patch("/users/updateMe", allowedFields);
  return res.data.data;
};

export const updateUserPhoto = async (photo) => {
  const formData = new FormData();
  if (photo) {
    formData.append("photo", photo);
  } else {
    formData.append("photo", "");
  }
  const res = await api.patch("/users/updateMe", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};
