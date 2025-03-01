const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt")

class UserController {
    RegisterUser(req, res) {
        const user = new User(req.body)
        user.save()
            .then(() => {
                res.cookie("usertoken", jwt.sign({ _id: user._id }, secret), { httpOnly: true })
                    .json({ msg: "successfully created user", user: user })
            })
            .catch(err => res.json(err))
    }

    login(req, res) {
        const { email, password } = req.body
        User.findOne({ email: email }).then((user) => {
            if (user) {
                ///////////////////////////////comparing to hashed password
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        res.send({ message: "Login successful", user })
                    } else {
                        res.send({ message: "Invalid password" })
                    }
                })
            } else {
                res.send({ message: "Email not found" })
            }

        })
    }


    getuser = (req, res) => {
        User.find()
            .then((allDaUsers) => {
                res.json({ users: allDaUsers })
            })
            .catch((err) => {
                res.json(err)
            });
    }

    getPostsByUser = (req, res) => {
        // Get the posts from localStorage
        const posts = JSON.parse(localStorage.getItem('PostSchema'));

        // Loop through the posts and display them
        posts.forEach(post => {
            console.log(post.title);
            console.log(post.content);
        });

    }

    getUserByID = (req, res) => {
        User.findOne({ _id: req.body.id })
        console.log(req.body.id)
            .then(oneSingleUser => {
                res.json({ user: oneSingleUser })
            })
            .catch((err) => {
                res.json(err)
            })
    }

    // Get user by id
    getUserById = (req, res) => {
        // Get the id from the request parameters
        const id = req.params.id;
        // Find the user document by id
        User.findById(id)
            .then(user => {
                // If user is found, send it as a response
                if (user) {
                    res.json(user);
                } else {
                    // If user is not found, send an error message
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch(err => {
                // If there is an error, send it as a response
                res.status(500).json({ message: err.message });
            });
    };

    findAllUsers = (req, res) => {
        User.find()
            .then((allDaUsers) => {
                res.json({ users: allDaUsers })
            })
            .catch((err) => {
                res.json(err)
            });
    }

    findOneSingleUser = (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(oneSingleUser => {
                res.json({ user: oneSingleUser })
            })
            .catch((err) => {
                res.json(err)
            });}

    updateExistingUser = (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => {
                res.json({ user: updatedUser })
            })
            .catch((err) => {
                res.json(err)
            });}


    getUsers = async (req, res) => {
                try {
                   const data = await Publisher.find()
                                              .populate({path: 'postsCreated', select: 'image caption category'});
                   res.status(200).json({success: true, data});
                } catch (err) {
                   res.status(400).json({success: false, message:err.message});
                }
             }


}

module.exports = new UserController()