import type { NextFunction, Request, Response } from "express";

type ValidateType = {
  field: string;
  message?: string;
  validateFn?: (value: string) => boolean;
};

type RequiredObjectType = {
  field: string;
  message: string;
};

type RequiredType = string | RequiredObjectType;

export const bodyValidatorMiddleware =
  ({
    required = [],
    validate = [],
  }: {
    required: RequiredType[];
    validate: ValidateType[];
  }) =>
  (req: Request, _: Response, next: NextFunction) => {
    const errors: string[] = [];

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

    req.errors = [];
    if (errors.length) {
      req.errors.push(...errors);
    }

    next();
  };
