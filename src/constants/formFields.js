export const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Enter Password",
  },
];

const updateFields = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Enter your Name",
  },
  {
    labelText: "Phone Number",
    labelFor: "phone-number",
    id: "phone",
    name: "phone",
    type: "tel",
    autoComplete: "tel",
    isRequired: true,
    placeholder: "Enter your Phone Number",
  },
];

export const forgotFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Enter your email address",
  },
];

export const resetFields = [
  {
    labelText: "New Password",
    labelFor: "new-password",
    id: "new-password",
    name: "newPassword",
    type: "password",
    autoComplete: "new-password",
    isRequired: true,
    placeholder: "Enter your new password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirmPassword",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm your new password",
  },
];

export default updateFields;
