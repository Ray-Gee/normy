export const validateName = (value: string) => {
  return value ? null : "Name is required";
};

export const validateEmail = (value: string) => {
  return /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format";
};
