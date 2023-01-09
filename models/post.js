const mongoose = require('mongoose');

const schema = mongoose.Schema;

const postSchema = new schema({
   
    title: {
        type: String,
        required: true
    },
    
    about: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    postedBy: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    saveArr : [{ type: String }],

    commentArr : [{ type: schema.Types.ObjectId, ref: 'Comment' }]

}
);

module.exports = mongoose.model('Post', postSchema);