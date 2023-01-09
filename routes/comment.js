const express = require('express');

const router= express.Router();

const comments = require('../controllers/comment');

router.post('/',comments.addComment);


module.exports = router;