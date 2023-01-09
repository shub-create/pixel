const Users = require('../models/user');

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

exports.createUser = (req,res,next) => {

    const userId = req.body.userId;
    const username = req.body.username;
    const image = req.body.image;

    Users.find({userId: userId}).then((result) => {
        if(result.length !== 0) {
            return res.json({
                message: "User already Exists"
            });
        }
        else{
            const user = new Users({
                userId: userId,
                username: username,
                image: image
            })

            user.save().then((result) => {
                res.status(201).json({
                    message: "User created"
                })
            }).catch((err)=> {
                console.log(err);
            })

        }
    }).catch((err)=> {
        console.log(err);
    })

}

exports.getUserById = (req,res,next) => {

   const userId = req.body.userId;


   Users.findOne({userId: userId}).then((result) => {
        
         res.status(200).json({
            user: result
         })
   }).catch((err) => {
    console.log(err);
}); 

}