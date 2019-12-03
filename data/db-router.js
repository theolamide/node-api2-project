const express = require('express');

const Posts = require('./db');

const router=express.Router(); //make sure to invoke it and use Upper case R

router.use(express.json());


module.exports=router;