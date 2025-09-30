export const checkUserEmail = (val) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(val);
};

export const checkUserPhone = (val) => {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(val);
};
