export const validateName = (value: string) => {
  return value ? null : "Name is required";
};

export const validateEmail = (value: string) => {
  return /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format";
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  // if (!/[A-Z]/.test(password)) {
  //   errors.push("Password must contain at least one uppercase letter.");
  // }
  // if (!/[\W_]/.test(password)) {
  //   errors.push("Password must contain at least one special character.");
  // }

  return errors;
};
