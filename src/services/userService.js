import api from "./http";

export const getMyProfile = () =>
  api.get("/me/profile/").then(r => r.data);

export const updateMyProfile = (profileData) =>
  api.put("/me/profile/", profileData).then(r => r.data);
