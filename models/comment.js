const mongoose = require('mongoose');

const schema = mongoose.Schema;

const commentSchema = new schema({

    postedBy: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    
    comment: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Comment', commentSchema);