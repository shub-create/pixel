const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const saveSchema =new Schema({
   
    userId: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Save', saveSchema);