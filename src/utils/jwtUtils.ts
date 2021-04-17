import jsonwebtoken from "jsonwebtoken";
import { adminInterface } from "../interfaces/adminInterface";
import { Admin } from "../models/adminModel";
import { config } from "dotenv";

config();
const JWT_KEY: string = process.env.JWT_KEY as string;

const generateAdminToken = async (admin: adminInterface): Promise<adminInterface> => {
  admin.token = jsonwebtoken.sign(
    { _id: admin._id, email: admin.email },
    JWT_KEY,
    { expiresIn: "24h" }
  );
  await Admin.updateOne({ _id: admin._id },{$set: {token: admin.token}});
  return admin;
};

const generateAdminRefreshToken = async (
  admin: adminInterface
): Promise<adminInterface> => {
  admin.refreshToken = jsonwebtoken.sign(
    { _id: admin._id, email: admin.email },
    JWT_KEY,
    { expiresIn: "30d" }
  );
  await Admin.updateOne({ _id: admin._id },{$set: {refreshToken: admin.refreshToken}});
  return admin;
};

const jwtUtils = {
  generateAdminToken,
  generateAdminRefreshToken,
};

export { jwtUtils };
