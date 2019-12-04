const express = require('express');

const Posts = require('./db');

const router=express.Router(); //make sure to invoke it and use Upper case R

router.use(express.json());

//Post and new Blog Post
router.post('/',(req,res)=>{
    const newPost=req.body;

    if(!newPost.title||!newPost.contents){
        res.status(400)
        .json({ message: "Please provide title and contents for the post." })
    } else {
        Posts.insert(newPost)
        .then(post =>{
            res.status(201)
            .json(post);
        })
        .catch(err => {
            console.log("Server Error", err);
            res.status(500)
            .json({error: "There was an error while saving the post to the database" });
        });
    }
    
})

//Post a new comment insertComment()
router.post('/:id/comments',(req,res)=>{
    const blogPost=req.params.id;
    const text=req.body;
    
    if(!text){
        res.status(400)
        .json({ errorMessage: "Please provide text for the comment" })
    } else {
        Posts.findById(blogPost)
        .then(post=>{
            if(post){
                text.post_id = blogPost
                Posts.insertComment(text)
                .then(newComment=>{
                    Posts.findCommentById(newComment.id)
                    .then(comment=>{
                        res.status(201)
                        .json(comment)
                    })
                })
            } else {
                res.status(404)
                .json({errorMessage: 'error Message'})
            }
        })
        .catch(error=>{
            res.status(500)
            .json({errorMessage: 'There was an error while saving the content to the database', error})
        })
    }
})

//Fetch all posts
router.get('/', (req,res)=>{
    Posts.find()
    .then(posts=>{
        res.status(200)
        .json(posts)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error retrieving the hubs',
        });
    });
})

//Fetch posts by ID
router.get('/:id', (req,res)=>{
    const postById=req.params.id;
    // const PostsArray=Posts.find().id;
    // console.log(PostsArray) 
    // console.log(res.data)
    if(!postById){
        res.status(404)
        .json({message: "The post with the specified ID does not exist."})
    } else {
        Posts.findById(postById)
        .then(posts=>{
        res.status(200)
        .json(posts)
        })
        .catch(error => {
        console.log(error);
        res.status(500)
        .json({error: 'The post information could not be retrieved.'});
        });
    }    
})

//Get comments of a specified post
router.get('/:id/comments',(req,res)=>{
    Posts.findPostComments(req.params.id)
    .then(comments=>{
        res.status(200)
        .json(comments)
    })
    .catch(error=>{
        console.log(error);
        res.status(500)
        .json({message:"The comments information could not be retrieved."})
    })
})

//Delete Posts by ID
router.delete('/:id',(req,res)=>{
    Posts.remove(req.params.id)
    .then(posts=>{
        res.status(200)
        .json({message: "This post was successfully deleted"})
    })
    .catch(error=>{
        console.log(error);
        res.status(500)
        .json({error:"The post could not be removed."})
    })
})

module.exports=router;

