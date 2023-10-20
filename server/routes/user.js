const { User } = require('../models/User');
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const VALIDATOR = require('validator');

SECRET = process.env.SECRET;

function generateToken(userInfo) {
    const User = {
        id: userInfo.id,
        firstName: userInfo.firstName,
        avatar: userInfo.avatar,
    };
    const PAYLOAD = { sub: User };

    return jwt.sign(PAYLOAD, SECRET, { expiresIn: '1d' });

}


router.post(`/register`, async (req, res) => {

    let validationResult = validateRegisterForm(req.body);

    if (!validationResult.success) {
        return res.status(400).send({
            message: 'Register form validation failed!',
            errors: validationResult.errors
        });
    }
    const userExistsEmail = await User.findOne({ email: req.body.email })

    if (userExistsEmail) {
        return res.status(400).send({
            message: 'Email is already taken',
        });
    }
    else {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            avatar: '/assets/images/avatar.png',
            mobileNumber:req.body.mobileNumber
        })

        User.create(user).then((newUser) => {
            let token = generateToken(newUser);

            let registeredUser = new User({
                firstName:newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                avatar: newUser.avatar,
                mobileNumber:newUser.mobileNumber
            })

            let data = {
                user: registeredUser,
                token: token
            }
            res.status(200).send({
                message: 'User Register Successfully',
                data: data

            });
        }).catch((err) => {

            res.status(400).send({
                message: 'User Registartion Failed',
                data: err,
            });
        });

    }

});


router.post(`/login`, async (req, res) => {
    let validationResult = validateLoginForm(req.body);

    if (!validationResult.success) {
        return res.status(400).send({
            message: 'Login form validation failed!',
            errors: validationResult.errors
        });
    }
    const user = await User.findOne({ email: req.body.email })

    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send({
            message: 'The user not found!',
            errors: validationResult.errors
        });
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        let token = generateToken(user);

        const userRes = await User.findOne({ email: req.body.email }).select('-passwordHash');
        let data = {
            user: userRes,
            token: token
        }
        return res.status(200).send({
            message: 'Login Successfull',
            data: data
        });
    } else {
        return res.status(400).send({
            message: 'password is wrong!',
            data: null,
        });
    }

});

router.get(`/`, async (req, res) => {
    res.status(200).json({ message: 'User router!' });

});


function validateRegisterForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.email !== 'string' || !VALIDATOR.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must have at least 3 characters.';
    }

    if (!payload || payload.password !== payload.confirmPassword) {
        isFormValid = false;
        errors.passwordsDontMatch = 'Passwords do not match!';
    }

    if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!payload || typeof payload.mobileNumber !== 'string' || payload.mobileNumber.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your valid mobile Number.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateLoginForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your email.';
    }

    return {
        success: isFormValid,
        errors
    };
}


module.exports = router;