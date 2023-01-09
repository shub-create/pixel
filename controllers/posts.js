const Posts = require('../models/post');
const mongoose = require('mongoose');
const Users = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;

exports.getAllPosts = (req,res,next) => {
   
    Posts.find().populate('postedBy').then((result) => {
        res.status(200).json({
            posts: result
        })
    }).catch((err) => {
        console.log(err);
    })
}

exports.getPostById = (req,res,next) => {

    const postId = req.body.postId;

    Posts.findById(postId).populate('postedBy').populate({ 
        path: 'commentArr',
        populate: {
          path: 'postedBy',
        } 
     }).then((result) => {
        res.status(200).json({
            post: result
        })
    }).catch((err) => {
        console.log(err);
    }); 
}

exports.getPostsByUserId = (req,res,next) => {
   
    const userId = req.body.userId ;

    Posts.find({ userId: userId}).populate('postedBy').then((result) => {
        res.status(200).json({
            posts: result
        })
    }).catch((err) => {
        console.log(err);
    }); 

}

exports.getPostsSavedByUser = (req,res,next) => {
   
    const userId =req.body.userId;

    Posts.find({saveArr : userId}).populate('postedBy').then((result) => {
        res.status(200).json({
            savedPosts : result
        })
    }).catch((err) => {
        console.log(err);
    }); 


}

exports.addSaveInPost = (req,res,next) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    
    Posts.findById(postId).then((result) => {
        result.update({$push : {saveArr : userId}}).then(()=> {
            res.json({
                message: "Saved successfully"
            })
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })

}

exports.searchPosts = (req,res,next) => {
   
    const searchTerm = req.body.searchTerm;

    Posts.find({
        "$or": [
            { title: { '$regex': searchTerm, '$options': 'i' } },
            { about: { '$regex': searchTerm, '$options': 'i' } },
            { destination: { '$regex': searchTerm, '$options': 'i' } }
        ]
    }).populate('postedBy').then((result)=> {
        res.json({
            posts: result
        })
    }).catch((err) => {
        console.log(err);
    })


}

exports.getPostsByCategory = (req,res,next) => {
  
    const category = req.body.category;
    const postId = req.body.postId;

    if(postId){
        Posts.find({category: category, _id : { $ne : postId}}).populate('postedBy').then((result) => {
            res.status(200).json({
                posts : result
            })
        }).catch((err) => {
            console.log(err);
        }); 
    }

    else {
        Posts.find({category: category}).populate('postedBy').then((result) => {
            res.status(200).json({
                posts : result
            })
        }).catch((err) => {
            console.log(err);
        }); 
    }

}

exports.createPost = (req,res,next) => {

    const title = req.body.title;
    const about = req.body.about;
    const destination = req.body.destination;
    const category = req.body.category;
    const image = req.body.image;
    const userId = req.body.userId;

    var user;

    Users.findOne({userId: userId}).then((result) => {
        user = result._id;
        user = user.toString();
        const post = new Posts({
            title : title, 
            about : about, 
            destination : destination,
            category : category,
            image : image,
            userId : userId,
            postedBy: user
        });
        
        post.save().then(()=> {
            res.status(201).json({
                message: "post created"
            })
        }).catch((err) => {
            console.log(err);
        })
    })
    
    

    
}

// exports.getComments = (req,res,next) => {
//     const postId = req.body.postId;

    
//     Posts.findById(postId).populate({ 
//         path: 'commentArr',
//         populate: {
//           path: 'postedBy',
//         } 
//      }).then((result)=> {

//         return res.json({
//             comments: result.commentArr
//         })

//     })

// }



exports.deletePost = (req,res,next) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    
    

        Posts.findById(postId).then((result)=> {
            if(!result){
                 return res.json({
                    message: "Cannot find the post"
                })
            }
            if(result.userId === userId){
                Posts.findByIdAndDelete(postId).then(()=> {
                    res.json({
                        message: "Post deleted"
                    })
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else{
                res.json({
                    message: "You are not allowed to delete this post"
                })
            }

            
        }).catch((err)=>{
            console.log(err);
        })


}