import { Request, Response } from "express";
import emailHelper from "../helpers/emailHelper";
import { hashPassword } from "../helpers/passwordHelper";
import { adminInterface } from "../interfaces/adminInterface";
import { Admin } from "../models/adminModel";
import { adminUtils } from "../utils/adminUtils";
import sendMail from "../utils/mailer";

export class AdminController {
  static register = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, createdBy } = req.body;

      //Génération aléatoire d'un mot de passe qui sera stocké dans la base de donnée et envoyer et
      //par mail en cas de succès d'inscription à l'utilisateur
      const password = adminUtils.generateAdminPassword();

      // Vérification de si toutes les données existent
      if (!firstname || !lastname || !email || !createdBy)
        throw new Error("Des données sont manquantes");

      //Vérification de si l'email est au bon format
      if (!emailHelper.validEmail(email))
        throw new Error("Le format de l'email n'est pas valide");

      //Vérification de si l'email n'existe pas déjà
      if (await adminUtils.existingEmail(email))
        throw new Error("Cet email existe déjà");

      //Hash le password avant de le send en base de donnée
      const passwordEncrypted = await hashPassword(password);

      //Création de l'admin
      const admin: adminInterface = await Admin.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordEncrypted,
        createdBy: createdBy,
      });

      //Envoie de la response
      res.status(200).send({
        error: false,
        message: "L'admin a été ajouté avec succès",
        admin: {
          id: admin._id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
        },
      });
      //Envoie du mot de passe au nouvel admin
      sendMail(admin.email, "Password WebRadio", password);

    } catch (error) {
      if (error.message === "Le format de l'email n'est pas valide") {
        res.status(400).send({
          error: true,
          message: "Le format de l'email n'est pas valide",
        });
      }
      if (error.message === "Des données sont manquantes") {
        res.status(400).send({
          error: true,
          message: "Des données sont manquantes",
        });
      }
      if (error.message === "Cet email existe déjà") {
        res.status(400).send({
          error: true,
          message: "Cet email existe déjà",
        });
      }
    }
  };

  static login = async (req: Request, res: Response) => {};
}
