import validator from 'validator';

export default class emailHelper{

    static validEmail(email: string): boolean {
        return validator.isEmail(email);
    }
}
