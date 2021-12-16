import * as EmailValidator from "email-validator";

const userFormHelper = (form, type) => {
  let message = null;
  // First name > 32
  if (form.firstName.length > 32) {
    message = `First name must be 32 characters or less, your current entry is ${form.firstName.length}`;
    return message;
  }
  // Last name > 32
  if (form.lastName.length > 32) {
    message = `Last name must be 32 characters or less, your current entry is ${form.lastName.length}`;
    return message;
  }

  // Email is valid
  if (!EmailValidator.validate(form.email)) {
    message = `Invalid email address`;
    return message;
  }

  // Phone < 10 || Phone > 11
  if (form.phone.length > 11) {
    message = `Phone must be 11 digits or less.`;
    return message;
  }

  if (form.phone.length !== 0 && form.phone.length < 10) {
    message = `Phone must be at least 10 digits.`;
    return message;
  }
  // Bio > 255
  if (form.bio.length > 255) {
    message = `The bio must be 255 characters or less, your current entry is ${form.bio.length}`;
    return message;
  }
  // Password < 8 || Password > 16
  if (form.password.length < 8 || form.password.length > 16) {
    message = "Password must be 8-16 characters long.";
    return message;
  }
  // Password !== Confirm password
  if (!type && form.password !== form.confirmPassword) {
    if (form.password !== form.confirmPassword) {
      message = "Passwords do not match";
      return message;
    }
  }
  if (type === "update" && form.newPassword) {
    // New password < 8 || New password > 16
    if (form.newPassword.length < 8 || form.newPassword.length > 16) {
      message = "New password must be 8-16 characters long.";
      return message;
    }
    // New password !== Confirm password
    if (form.newPassword !== form.confirmPassword) {
      message = "New passwords Do Not Match";
      return message;
    }
  }
};

export default userFormHelper;
