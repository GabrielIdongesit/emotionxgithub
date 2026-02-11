// utils/auth.js

export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
