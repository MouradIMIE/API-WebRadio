export interface adminInterface{
    _id?:string,
    firstname?:string,
    lastname?:string,
    email?:string,
    password?:string,
    createdBy?:string,
    token?: string;
    refreshToken?: string;
}