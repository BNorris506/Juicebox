const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost, createUser } = require('../db');

const { requireUser } = require('./utils');


postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
        // add authorId, title, content to postData object
    const user = req.user
    postData.authorId = user.id
    postData.title = user.posts[0].title
    postData.tags= user.posts[0].tags
    postData.content = user.posts[0].content
    const post = await createPost(postData);
    // this will create the post and the tags for us
    console.log("Here is the post!", post)
    res.send({ post });
    // otherwise, next an appropriate error object 
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
  
    next(); 
  });
  
postsRouter.get('/', async (req, res) => {
      const posts = await getAllPosts();
    
      res.send({
        posts
      });
    });

module.exports = postsRouter;
