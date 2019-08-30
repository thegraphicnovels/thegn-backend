export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to Login to perform this action");
  }
  return;
};
