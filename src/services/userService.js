import api from "./http";

export const getMySubscription = () =>
  api.get("/me/subscription/").then(r => r.data); // { active, status, current_period_end }

export const getMyProfile = () =>
  api.get("/me/profile/").then(r => r.data);

export const updateMyProfile = (profileData) =>
  api.put("/me/profile/", profileData).then(r => r.data);
