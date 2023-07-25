export const logout = (navigate: any) => {
  sessionStorage.clear();
  navigate("/login");
};

export const isLoggedIn = () => {
  return sessionStorage.getItem("credentials") ? true : false;
  // return true;
};
