import { Request, Response } from "express";
import emailHelper from "../helpers/emailHelper";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { adminInterface } from "../interfaces/adminInterface";
import { Admin } from "../models/adminModel";
import { adminUtils } from "../utils/adminUtils";
import { jwtUtils } from "../utils/jwtUtils";
import sendMail from "../utils/mailer";

export class AdminController {
// -------------------------------------------------REGISTER---------------------------------------------------//
  static register = async (req: Request, res: Response) => {
    try {
      const body: adminInterface = req.body;

      //Génération aléatoire d'un mot de passe qui sera stocké dans la base de donnée et envoyer et
      //par mail en cas de succès d'inscription à l'utilisateur
      const password: string = adminUtils.generateAdminPassword();

      // Vérification de si toutes les données existent
      if (!body.firstname || !body.lastname || !body.email || !body.createdBy)
        throw new Error("Des données sont manquantes");

      //Vérification de si l'email est au bon format
      if (!emailHelper.validEmail(body.email))
        throw new Error("Le format de l'email n'est pas valide");

      //Vérification de si l'email n'existe pas déjà
      if (await adminUtils.existingEmail(body.email))
        throw new Error("Cet email existe déjà");

      //Vérification de si l'admin existe en base de données
      if (!(await Admin.findOne({ createdBy: body.createdBy })))
        throw new Error("Vous n'avez pas accès a cette fonctionnalité");

      //Hash le password avant de le send en base de donnée
      const passwordEncrypted: string = await hashPassword(password);

      //Création de l'admin
      const admin = await Admin.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: passwordEncrypted,
        createdBy: body.createdBy,
        token:"",
        refreshToken:""
      });

      //Envoie de la response
      res.status(200).send({
        error: false,
        message: "L'admin a été ajouté avec succès",
        admin: {
          id: admin._id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email
        },
      });
      //Envoie du mot de passe au nouvel admin
      sendMail(admin.email, "Password WebRadio", password);
    } catch (error) {
      if (error.message === "Le format de l'email n'est pas valide") {
        res.status(400).send({
          error: true,
          message: "Le format de l'email n'est pas valide"
        });
      }
      if (error.message === "Des données sont manquantes") {
        res.status(400).send({
          error: true,
          message: "Des données sont manquantes"
        });
      }
      if (error.message === "Cet email existe déjà") {
        res.status(400).send({
          error: true,
          message: "Cet email existe déjà"
        });
      }
      if (error.message === "Vous n'avez pas accès a cette fonctionnalité") {
        res.status(400).send({
          error: true,
          message: "Vous n'avez pas accès a cette fonctionnalité"
        });
      }
    }
  };
// --------------------------------------------------LOGIN----------------------------------------------------//
  static login = async (req: Request, res: Response) => {
    try {

      const body: adminInterface = req.body;

      //Verification qu'on envoie bien un email et un password
      if(!body.email || !body.password) throw new Error("Des données sont manquantes");
      
      //Vérification de si l'email est au bon format
      if (!emailHelper.validEmail(body.email))
        throw new Error("Le format de l'email n'est pas valide");

      //Vérification que l'utilisateur existe en base 
      let admin = await Admin.findOne({email : body.email});
      if(!admin) throw new Error("Cet email n'est associé à aucun compte");
      
      //Vérification du mot de passe
      if(!await comparePassword(body.password,admin.password)) throw new Error("Le mot de passe n'est pas correct")

      //Génération des tokens

      admin = await jwtUtils.generateAdminToken(admin);
      admin = await jwtUtils.generateAdminRefreshToken(admin);

      res.status(200).send({
        error: false,
        message: "L'admin a été ajouté avec succès",
        admin: {
          id: admin._id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          token: admin.token,
          refreshToken: admin.refreshToken
        },
      });
    } catch (error) {
      if (error.message === "Le format de l'email n'est pas valide") {
        res.status(400).send({
          error: true,
          message: "Le format de l'email n'est pas valide"
        });
      }
      if (error.message === "Des données sont manquantes") {
        res.status(400).send({
          error: true,
          message: "Des données sont manquantes"
        });
      }
      if (error.message === "Cet email n'est associé à aucun compte") {
        res.status(400).send({
          error: true,
          message: "Cet email n'est associé à aucun compte"
        });
      }
      if (error.message === "Le mot de passe n'est pas correct") {
        res.status(400).send({
          error: true,
          message: "Le mot de passe n'est pas correct"
        });
      }
    }
  };
}
