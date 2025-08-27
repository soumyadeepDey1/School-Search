import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validateSchool = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("latitude")
    .exists()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a float between -90 and 90"),
  body("longitude")
    .exists()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a float between -180 and 180"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(new ApiError("Validation Error", 400, errors.array()));
    }
    next();
  },
];
