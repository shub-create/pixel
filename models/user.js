const mongoose = require('mongoose');


const schema = mongoose.Schema;

const userSchema = new schema({
    
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users',userSchema);
