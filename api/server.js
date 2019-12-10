const express = require('express');

const postsRouter=require('../data/db-router');

const server = express();

server.get('/', (req, res) => {
    res.send(`
        <h2>The BLOG</h>
        <p>Posts and comments API</p>
    `);
    });

    server.use('/api/posts', postsRouter)
//export default server; //ES6 Modules
module.exports=server;