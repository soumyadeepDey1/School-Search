import { pool } from "../db/index.js";

export const addSchool = async ({ name, address, latitude, longitude }) => {
  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  const [result] = await pool.query(sql, [name, address, latitude, longitude]);
  return result;
};

export const getAllSchools = async () => {
  const [schools] = await pool.query("SELECT * FROM schools");
  return schools;
};

