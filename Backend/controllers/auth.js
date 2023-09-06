const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const User = require('../models/User');
const { response } = require('express');

  
exports.facebooklogin = (req, res) => {
    const { userId, accessToken } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&acess_token=${accessToken}`
    fetch(urlGraphFacebook, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => {
            const { email, name } = response;
            User.findOne({ email }).exec((err, user) => {
                if (err){
                    return res.status(400).json({
                        error:"Something went wrong"
                    })
                } else {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                        const { _id, name, email } = user;

                        res.join({
                            token,
                            user: {_id,name,email}
                        })
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({ name, email, password });

                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error:"Something went wrong "
                                })
                            }

                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SIGNIN_KEY, { expiresIn: '7d' });
                            const { _id, name, email } = data;

                            res.json({
                                token,
                                user: {_id,name,email}
                            })
                        })
                    }
                }
            })
        });
}