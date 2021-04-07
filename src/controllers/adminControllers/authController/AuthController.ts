import { Request, Response } from "express";
import { adminInterface } from "../../../interfaces/adminInterface";
import { Admin } from "../../../models/adminModel";
import {adminUtils, jwtUtils, sendMail } from "../../../utils/indexUtils";
import {validEmail, comparePassword, hashPassword} from "../../../helpers/indexHelpers"
import { AuthException } from "./AuthException";

export class AuthController {
// -------------------------------------------------REGISTER---------------------------------------------------//
  static register = async (req: Request, res: Response) => {

    const body: adminInterface = req.body;

      //Génération aléatoire d'un mot de passe qui sera stocké dans la base de donnée et envoyer et
      //par mail en cas de succès d'inscription à l'utilisateur
      const password: string = adminUtils.generateAdminPassword();

      // Vérification de si toutes les données existent
      if (!body.firstname || !body.lastname || !body.email || !body.createdBy) {
        res = AuthException.getAuthResponse("Des données sont manquantes", res);
        return;
      }

      //Vérification de si l'email est au bon format
      if (!validEmail(body.email)) {
        res = AuthException.getAuthResponse("Le format de l'email n'est pas valide", res);
        return;
      }

      //Vérification de si l'email n'existe pas déjà
      if (await adminUtils.existingEmail(body.email)) {
        res = AuthException.getAuthResponse("Cet email existe déjà", res);
        return;
      }

      //Vérification de si l'admin existe en base de données
      if (!(await Admin.findOne({ createdBy: body.createdBy }))) {
        res = AuthException.getAuthResponse("Vous n'avez pas accès a cette fonctionnalité", res);
        return;
      }

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
  };
// --------------------------------------------------LOGIN----------------------------------------------------//
  static login = async (req: Request, res: Response) => {

      const body: adminInterface = req.body;

      //Verification qu'on envoie bien un email et un password
      if(!body.email || !body.password) {
        res = AuthException.getAuthResponse("Des données sont manquantes", res);
        return;
      }
      
      //Vérification de si l'email est au bon format
      if (!validEmail(body.email)) {
        res = AuthException.getAuthResponse("Le format de l'email n'est pas valide", res);
        return;
      }

      //Vérification que l'utilisateur existe en base 
      let admin = await Admin.findOne({email : body.email});

      if(!admin) {
        res = AuthException.getAuthResponse("Cet email n'est associé à aucun compte", res);
        return;
      }
      
      //Vérification du mot de passe
      if(!await comparePassword(body.password,admin.password)) {
        res = AuthException.getAuthResponse("Le mot de passe n'est pas correct", res);
        return;
      }

      //Génération des tokens

      admin = await jwtUtils.generateAdminToken(admin);
      admin = await jwtUtils.generateAdminRefreshToken(admin);

      res.status(200).send({
        error: false,
        message: "Connexion réussie",
        admin: {
          id: admin._id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          token: admin.token,
          refreshToken: admin.refreshToken
        }
      });
  };

// -----------------------------------------------ForgotPassword----------------------------------------------//
  static forgotPassword = async (req: Request, res: Response) => {
      const body: adminInterface = req.body;

      if(!body.email) {
        res = AuthException.getAuthResponse("Des données sont manquantes", res);
        return;
      }
      
      if (!validEmail(body.email)) {
        res = AuthException.getAuthResponse("Le format de l'email n'est pas valide", res);
        return;
      }

      //Vérification que l'utilisateur existe en base 
      let admin:adminInterface | undefined = await Admin.findOne({email : body.email});
      
      if(!admin) {
        res = AuthException.getAuthResponse("Cet email n'est associé à aucun compte", res);
        return;
      }
      //Génération des tokens
      admin = await jwtUtils.generateAdminToken(admin);
      admin = await jwtUtils.generateAdminRefreshToken(admin);

      if(admin.token) {

        sendMail(body.email,"Reset Password", adminUtils.generateAdminPassword())
        res.status(200).send({
          error: false,
          message: "Mot de passe envoyé avec succès.",
        });
        return;
      }
      else {
        res = AuthException.getAuthResponse("Echec lors de la creation du token.", res);
        return;
      }
  };
  
// ------------------------------------------------Disconnect------------------------------------------------//
  static disconnect = async (req: Request, res: Response) => {
    
    // Récupération de l'admin grâce au Authmiddleware qui rajoute le token dans req
    const request: any = req;
    const admin: adminInterface = request.admin;
    
    admin.token = '';
    admin.refreshToken = '';
    await Admin.updateOne({_id : admin._id},admin);
    res.status(200).send({
      error: false,
      message: "L'utilisateur a été déconnecté avec succès",
    });
    return;

  }

}
