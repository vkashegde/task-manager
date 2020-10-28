const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

//Creating model
const User = mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain Password')
            }
        }

    }
})

//Create instances of the model
// const me = new User({
//     name:'gopalaka',
//     email:'abvd@gmail.com',
//     age:28,
//     password:'ab'   
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error..!',error)
// })

const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        required:true

    },
    completed:{
        type:Boolean,
        default:false
    }
})

const task = new Task({
    description:'Learn Node java javacript',
    completed:false
})

task.save().then(()=>{
    console.log(task)
}).catch(()=>{
    console.log(console.error())
})