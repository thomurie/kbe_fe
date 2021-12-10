// EXTERNAL IMPORTS
import { useState } from "react";

// HELPER FUNCTIONS
// clean phone number
const phoneCleaner = (phone) => {
  return phone.split("-").join("");
};
// cleans form data in preparation for entry to database
const cleanData = (data, val) => {
  if (val === "email") data.email = data.email.toLowerCase();
  if (val === "firstName") data.firstName = data.firstName.toLowerCase();
  if (val === "lastName") data.lastName = data.lastName.toLowerCase();
  if (val === "phone") data.phone = phoneCleaner(data.phone);
};

// UserMgmt Hook
function UserMgmt() {
  // STATE
  const INTIAL_STATE = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    region: "",
    phone: "",
    sms: true,
    bio: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [userForm, setForm] = useState(INTIAL_STATE);

  //EVENT HANDLERS
  const handleChange = (key, val, overhaul) => {
    if (overhaul) return setForm(overhaul);
    const update = { ...userForm, [key]: val };
    cleanData(update, key);
    setForm(update);
  };

  return [userForm, handleChange];
}

export default UserMgmt;
