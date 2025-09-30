const clearObject = (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    if (val) {
      acc[key] = val;
    }

    return acc;
  }, {});

export default clearObject;
