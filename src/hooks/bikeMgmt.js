// EXTERNAL IMPORTS
import { useState } from "react";

// HELPER FUNCTIONS
// cleans form data in preparation for entry to database
const cleanData = (data) => {
  data.make = data.make.toLowerCase();
  data.model = data.model.toLowerCase();
  data.year = parseInt(data.year) || 2010;
  data.price = parseInt(data.price) || 0;
  data.country = data.country.toUpperCase();
  data.region = data.region.toUpperCase();
  data.size = data.size.toUpperCase() || "M";
  data.color = data.color || "black";
  data.wheelSize = data.wheelSize || "26";
  data.suspension = data.suspension.toLowerCase() || "none";
  data.front = data.suspension !== "none" ? parseInt(data.front) : 0;
  data.rear = data.suspension === "full" ? parseInt(data.rear) : 0;
};

// BikeMgmt Hook
function BikeMgmt() {
  // STATE
  const INTIAL_STATE = {
    make: "",
    model: "",
    year: 2010,
    price: 0,
    country: "USA",
    region: "CA",
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

  //EVENT HANDLERS
  const handleChange = (key, val, overhaul) => {
    if (overhaul) return setForm(overhaul);
    const update = { ...bikeForm, [key]: val };
    cleanData(update);
    setForm(update);
  };

  return [bikeForm, handleChange];
}

export default BikeMgmt;
