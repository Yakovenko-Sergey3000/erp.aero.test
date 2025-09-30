export const bodyValidator =
  ({ required = [], validate = [] } = {}) =>
  (req, res, next) => {
    const errors = [];

    required.forEach((field) => {
      if (typeof field === "string") {
        if (!req.body[field]) {
          errors.push(`${field} is required`);
        }
      }

      if (typeof field === "object") {
        const { field: fieldName, message } = field;
        if (!req.body[fieldName]) {
          errors.push(message);
        }
      }
    });

    validate.forEach((field) => {
      const { field: fieldName, message, validateFn } = field;

      if (validateFn && !validateFn(req.body[fieldName])) {
        errors.push(message || `${fieldName} is invalid`);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    next();
  };
