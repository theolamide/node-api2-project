const express = require('express');

const postsRouter=require('../data/db-router');

const server = express();

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Hubs API</h>
        <p>Welcome to the Lambda Hubs API</p>
    `);
    });

    server.use('/api/hubs', postsRouter)
//export default server; //ES6 Modules
module.exports=server;