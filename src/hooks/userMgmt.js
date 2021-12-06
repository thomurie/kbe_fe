// 3rd party imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";

const cleanData = (data, val) => {
  if (val === "email") return data.email.toLowerCase();
  if (val === "firstName") return data.firstName.toLowerCase();
  if (val === "lastName") return data.lastName.split("")[0].toLowerCase();
};

function UserMgmt() {
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

  const handleChange = (key, val, overhaul) => {
    if (overhaul) return setForm(overhaul);
    const update = { ...userForm, [key]: val };
    cleanData(update, key);
    setForm(update);
  };

  return [userForm, handleChange];
}

export default UserMgmt;
