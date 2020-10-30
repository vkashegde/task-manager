const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt')


//creating user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive number");
        }
      },
    },
    password:{
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain Password");
        }
      },
    },
  }
)

userSchema.statics.findByCredentials = async(email,password)=>{
  const user = await User.findOne({email})
  if(!user){
    throw new Error('Unable to login')
    
  }
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch){
    throw new Error('Unable to login')
  }
  return user
}

//hash the plain text password
userSchema.pre('save', async function(next){
  //"this" refers to the document which is being saved.(user)
  const user = this 
  
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,8)
  }
  next();
})


//Creating model
const User = mongoose.model("User",userSchema);

module.exports = User;
