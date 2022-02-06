export const normalizeLoggedInUser = (user) => {
  const newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return newUser;
};
