function cleanObject(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (val) {
      acc[key] = val;
    }

    return acc;
  }, {});
}

export default cleanObject;
