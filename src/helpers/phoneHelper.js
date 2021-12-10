const phoneHelper = (phone) => {
  const p = phone.split("");
  if (phone.length === 10) {
    return `(${p[0]}${p[1]}${p[2]}) ${p[3]}${p[4]}${p[5]}-${p[6]}${p[7]}${p[8]}${p[9]}`;
  }
  if (phone.length === 11) {
    return `+${p[0]} (${p[1]}${p[2]}${p[3]}) ${p[4]}${p[5]}${p[6]}-${p[7]}${p[8]}${p[9]}${p[10]}`;
  }
  return phone;
};

const phoneCleaner = (phone) => {
  const p = phone.split("-");
  return p.filter((n) => n !== "(" && n !== ")");
};

export default phoneHelper;
