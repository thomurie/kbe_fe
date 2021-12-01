// 3rd party imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";

const cleanData = (data) => {
  data.make = data.make.toLowerCase();
  data.model = data.model.toLowerCase();
  data.year = parseInt(data.year);
  data.price = parseInt(data.price);
  data.country = data.country.toUpperCase();
  data.region = data.region.toUpperCase();
  data.size = data.size.toUpperCase() || "M";
  data.color = data.color || "black";
  data.wheelSize = data.wheelSize || "26";
  data.suspension = data.suspension.toLowerCase() || "none";
  data.front = data.suspension !== "none" ? parseInt(data.front) : 0;
  data.rear = data.suspension === "full" ? parseInt(data.rear) : 0;
};

function BikeMgmt() {
  const cuser = useSelector(currentUser);
  const INTIAL_STATE = {
    make: "",
    model: "",
    year: 2010,
    price: 0,
    country: cuser.country,
    region: cuser.region,
    about: "",
    size: "M",
    color: "black",
    wheelSize: "26",
    suspension: "none",
    front: 0,
    rear: 0,
    upgrades: "",
  };
  const [bikeForm, setForm] = useState(INTIAL_STATE);

  const handleChange = (key, val, overhaul) => {
    if (overhaul) return setForm(overhaul);
    const update = { ...form, [key]: val };
    cleanData(update);
    setForm(update);
  };

  return [bikeForm, handleChange];
}

export default BikeMgmt;
