const User = require('../models/user')
const jwt = require('jsonwebtoken');
const shortid = require('shortid')

exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: "This email already exis in our system"
        });

        //distructring incoming data
        const { 
            firstname,
            lastname,
            email,
            password,
        } = req.body

        const _user = new User({
            firstname,
            lastname,
            email,
            password,
            username: shortid.generate(),
        });

        _user.save((error, data) => {
            if(error) {
                console.log(error)
                return res.status(400).json({
                    message: 'Something went wrong!!'
                })
            }

            if(data) {
                return res.status(201).json({
                    message: "User Created successfully!"
                })
            }
        })
    })
}

//signin full process with jwt
exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
       if(error) return res.status(400).json({error});
       if(user) {
            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
                const { _id,firstname, lastname, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,firstname, lastname, email, role, fullName
                    }
                })
            }else{
                return res.status(400).json({
                    message: 'Invalid Crediential!'
                })
            }
       }else{
           return res.status(400).json({message: "Someting went wrong"})
       }
    })
}

//
