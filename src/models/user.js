const { Mongoose } = require("mongoose")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
    },
    has_passward: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
},{timestamps: true});

//password generator
userSchema.virtual('password')
.set(function(password) {
    this.has_passward = bcrypt.hashSync(password, 10)
});
userSchema.virtual('fullName')
.get(function(){
    return `${this.firstname} ${this.lastname}`;
})

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.has_passward)
    }
}


module.exports = mongoose.model('User', userSchema);