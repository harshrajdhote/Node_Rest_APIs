const validator = require('validator')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex : true
})
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })
// const User = mongoose.model('User',{
//     name : {
//         type : String,
//         required : true,
//         trim : true
//     },
//     email : {
//         type : String,
//         required : true,
//         trim : true,
//         lowercase : true,
//         validate(value){ //to provide userdefined validation
//             if(!validator.isEmail(value)){
//                 throw Error("Invalid Email address")
//             }
//         }        
//    //min , max also there for validation
//     },
//     age : {
//         type : Number,
//         default : 0,
//         validate(value){
//             if(value < 0)
//             throw Error("Age cant be negative")
//         }
//     },
//     password : {
//         type : String,
//         required : true,
//         min : 6,
//         trim : true,
//         validate(value){
//             if(value.toLowerCase().includes("password"))
//             throw Error("Invalid password")
//         }

//     }


// })
// const Task = mongoose.model('Task',{
//     description : {
//         type : String,
//         required : false
//     },
//     completed : {
//         type : Boolean,
//         default : false
//     }

// })
// const me = new User({
//     name : 'harsh',
//     email : 'dhoteharshraj@gmail.com',
//     password : '@dalton12'
   
// })
// me.save().then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log("Err")
// })
// const task = new Task({
//     description : "Hit him",
//     completed : false
// })//.save().then((res)=>console.log(res)).catch((err)=>console.log(err))