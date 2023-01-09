const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const commentRoute = require('./routes/comment');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/posts',postsRoute);
app.use('/user',userRoute);
app.use('/comment',commentRoute);


app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});




const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})