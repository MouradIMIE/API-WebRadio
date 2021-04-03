import { Admin } from "../models/adminModel";
import generator from "generate-password";

// Fonction permettant de vérifier si l'email existe déjà//
const existingEmail = async (existingEmail: string): Promise<boolean> => {
  const exist = await Admin.findOne({ email: existingEmail });
  return exist ? true : false;
};

function generateAdminPassword () : string {
  var password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    strict:true,
  });
  return password;
};

const adminUtils = {
  existingEmail,
  generateAdminPassword,
};

export { adminUtils };
