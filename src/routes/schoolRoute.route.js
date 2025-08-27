import { Router } from "express";
import { createSchool,fetchAllSchools,fetchSchoolByDistance } from "../controllers/schoolController.controller.js";
import { validateSchool } from "../middleware/validateinput.middleware.js";

const router = Router();

router.route("/addSchool").post(validateSchool, createSchool);
router.route("/fetchAllSchools").get(fetchAllSchools);
router.route("/fetchSchoolByDistance").get(fetchSchoolByDistance);

export default router;