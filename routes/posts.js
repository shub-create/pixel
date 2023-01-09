const express = require('express');

const router= express.Router();

const posts = require('../controllers/posts');


router.post('/create', posts.createPost);
router.post('/delete',posts.deletePost);
router.post('/postId',posts.getPostById);
router.post('/category',posts.getPostsByCategory);
router.post('/user-post',posts.getPostsByUserId);
router.post('/user-saved',posts.getPostsSavedByUser);
// router.post('/comment',posts.getComments);
router.post('/save',posts.addSaveInPost);
router.post('/search',posts.searchPosts);


router.get('/', posts.getAllPosts);


module.exports = router;
