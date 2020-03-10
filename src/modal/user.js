const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
});
userSchema.statics.findByCredentials = async (email, password) => {
    console.log("inside org")
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
// userSchema.statics.findByCredentials = async (email, password) => {
//     console.log("inside find "+user)
//     const user = await  User.findOne({email})
//    console.log("inside find "+user)
//    if(!user)
//    {
//        throw new Error("User doesn't exist")
//    }
//     const isMatch = await bcrypt.compare(password,user.password)
//     if(!isMatch)
//     { throw new Error("Invalid crendentials")
//  }
//   return user
// }
userSchema.pre('save',async function (next){   // middleware on save operation no arrow function because it leads the issues with binding
    const user = this
    console.log("before saving")
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User