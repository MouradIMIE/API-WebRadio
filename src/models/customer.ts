import mongoose from 'mongoose';
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/mail');

const customerSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'User name required'],
        validate: value => {
            if (value.length > 25) throw { success: false, message: 'Invalid name : Too long' }
        customerSchema
    },
    lastname: {
        type: String,
        required: [true, 'User name required'],
        validate: value => {
            if (value.length > 25) throw { success: false, message: 'Invalid name : Too long' }
        customerSchema
    },
    email: {
        type: String,
        required: [true, 'User email required'],
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) throw { success: false, message: 'Invalid Email address' }
        }
    },
    password: {
        type: String,
        required: [true, 'User password required']
    },
    token: {
        type: String
    },
    reset_password: {
        code: {
            type: String
        },
        date: {
            type: Number
        }
    },
    verify_email: {       
        code: {
            type: String
        },
        date: {
            type: Number
        },
        verified: {
            type: Boolean
        }
    },
    birthDate: {
        type: Date,
    }
}, { timestamps: true })

function genCodeDate() {
    return {
        date: Date.now(),
        code: between(100000, 999999)
    };
}

function between(min: any, max: any) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

customerSchema.pre('save', async function (next: any) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        if (user.password.length < 7) throw { success: false, message: 'Your password must contains at least 7 characters' }
        if (user.password.length >= 18) throw { success: false, message: 'Your password must contains less than 18 characters' }
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

customerSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    user.token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '2h' /*'15m'*/ });
    user.connexionDate = Date.now();
    await user.save(); // time to 1h
    return user.token;
}

customerSchema.methods.generateResetPasswordCode = async function () {
    const user = this;

    user.reset_password = genCodeDate();
    await user.save();
    return user.reset_password;
}

customerSchema.methods.generateEmailVerifyCode = async function () {
    const user = this;

    if (user.verify_email && user.verify_email.verified) return false;

    user.verify_email = genCodeDate();
    await user.save();
    return user.verify_email;
}

customerSchema.methods.generateJSON = async function () {
    const user = this;

    const ret = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate
    }
    return ret;
}

customerSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (!user) {
        throw { success: false, message: "Invalid login credentials" };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw { success: false, message: "Invalid login credentials" };
    }
    return user;
}

const User = mongoose.model('customer', customerSchema);

module.exports = User;
