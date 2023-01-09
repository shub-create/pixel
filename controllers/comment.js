const Comments = require('../models/comment');


const Users = require('../models/user');
const Posts = require('../models/post');




exports.addComment = (req,res,next) => {
    
      const userId = req.body.userId;
      const postId = req.body.postId;
      const text = req.body.comment;
      
      Users.findOne({userId: userId}).then((result) => {
            var user = result._id;
            user = user.toString();
            
            const comment = new Comments({
                comment: text,
                postedBy: user
            })

            comment.save().then((result) => {
                const commentId = result._id;
                 
                Posts.findById(postId).then((result)=> {
                    result.update({$push : {commentArr : commentId}}).then(()=> {
                        res.json({
                            message: "Comment added successfully"
                        })
                    })
                })
                

            });
      })



}
