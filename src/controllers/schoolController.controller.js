import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { addSchool, getAllSchools } from "../models/schoolModel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateDistance } from "../utils/distance.js";

export const createSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const school = await addSchool({ name, address, latitude, longitude });
  return res
    .status(201)
    .json(new ApiResponse(201, "School created successfully", school));
});

export const fetchAllSchools = asyncHandler(async (req, res) => {
  const schools = await getAllSchools();
  return res
    .status(200)
    .json(new ApiResponse(200, "Schools fetched successfully", schools));
});

export const fetchSchoolByDistance = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res
      .status(400)
      .json(new ApiError(400, "Latitude and Longitude are required"));
  }
  const schools = await getAllSchools();
  const schoolsWithDistance = schools.map((school) => {
    const distance = calculateDistance(
      parseFloat(latitude),
      parseFloat(longitude),
      parseFloat(school.latitude),
      parseFloat(school.longitude)
    );
    return { ...school, distance };
  });
  schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Schools fetched successfully", schoolsWithDistance)
    );
});
