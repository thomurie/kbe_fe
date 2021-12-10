const bikeFormHelper = (form, type) => {
  let message = null;
  // Make name > 32
  if (form.make.length > 32) {
    message = `Make must be 32 characters or less, your current entry is ${form.make.length}.`;
    return message;
  }
  // Last name > 32
  if (form.model.length > 32) {
    message = `Model must be 32 characters or less, your current entry is ${form.model.length}.`;
    return message;
  }
  // About > 255
  if (form.about.length > 255) {
    message = `About must be 255 characters or less, your current entry is ${form.about.length}.`;
    return message;
  }
  // About > 255
  if (form.upgrades.length > 255) {
    message = `Upgrades must be 255 characters or less, your current entry is ${form.upgrades.length}.`;
    return message;
  }
};

export default bikeFormHelper;
