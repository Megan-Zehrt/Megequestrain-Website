const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' }
}, { timestamps: true });

UserSchema.virtual("confirm")
    .get(function(){
        console.log("27", this._confirm)
        return this._confirm
    })
    .set(function(value){
        console.log("31", this._confirm, value)
        this._confirm = value
    })

UserSchema.pre("validate", function(next){
    console.log("36", this.password, this.confirm)
    if(this.password !== this.confirm){
        this.invalidate("‼‼‼ confirm", "Passwords must match")
    }
    next()
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash=>{
        this.password = hash
        next()
    })
    .catch(err=>{
        console.log("HASHING PASSWORD DIDN'T WORK", err)
    })
})

UserSchema.virtual('postsCreated', {
    ref: 'Post', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'User', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 UserSchema.set('toObject', { virtuals: true });
 UserSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', UserSchema);
 
module.exports = User;