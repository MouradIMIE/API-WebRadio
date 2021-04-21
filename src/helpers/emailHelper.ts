import validator from 'validator';

const validEmail = (email: string): boolean => {
    return validator.isEmail(email);
}
export { validEmail };
