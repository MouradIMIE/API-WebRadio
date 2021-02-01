const dev = {
    LOCAL: "mongodb://localhost/DropBoite",

    ONLINE: 'mongodb+srv://Nelson:kiEIAi5Xp2SYu7Yj@cluster0.cdevd.mongodb.net/ChefClub?retryWrites=true&w=majority',

    CLE_SECRET: "notreCleSecrettePourGenererLeToken",

    CLIENT_URL: 'http://localhost:3000',


    // paramètres pour l'envoi email avec gmail API (OAuth2 et nodemailer)
    ADDRESS_EMAIL_ENVOI: 'tulrichnelson@gmail.com',
    ID_CLIENT_SERVICE_MAIL: '531304587187-r3odcr1i77rfkk4cekmg0b1ts0l0cvh4.apps.googleusercontent.com',
    MAIL_CODE_CLIENT_SECRET: 'JYMHcaVyQWYJ7c32-Dari4UR',
    MAIL_SERVICE_REFRECH_TOKEN: '1//04mJ1EZ0Xq4tVCgYIARAAGAQSNwF-L9Irnfe04qhbGXq1TPRcPBoEf3t1RVySbstRKY0FDTpliD7G3HCTGYxXklRvtZkzjxjSCLs',

    // code secret pour le mot de passe social
    GOOGLE_SECRET: "*Qg5'A,=MsVA,D*^t'U<bu_Y&K]?)%Ur;aBcE+2Wrf(wC(`kxQeu[+",
    FACEBOOK_SECRET: "\<b)>AA_xS/e,&=H8'.=Dk!hqe&QV}]wv(@,,wC4L[3zYQrA7V]HhCGha2"

};


module.exports = dev;