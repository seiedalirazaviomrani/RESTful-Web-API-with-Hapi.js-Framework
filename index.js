
const myPrivateBlockchain = require('./myPrivateBlockchain');
let blockchain = new myPrivateBlockchain.Blockchain();

'use strict';
const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route([
    { method: 'GET',
    path:'/',
    handler: function(request,h){
        return "Welcome to the \"RESTful Web API with Hapi.js Framework\" project.";
    }},
    { method:'GET',
    path:'/block/{blockNumber}',
    handler:async function(request,h) {
    	let blockHeight = request.params.blockNumber;
    	if (blockHeight<0) {
    		return "ERROR!\n" + "Invalid Block Height!";
    	} else {
            return blockchain.getBlock(blockHeight);
    	}
    }},
    { method:'POST',
    path:'/block',
    handler:async function(request,h) {
        if (request.payload === null){
            return "ERROR!\n" + "Please add the block data to your POST request!";
        } else {
            blockchain.addBlock(request.payload);
            return JSON.stringify(request.payload).toString();
        }
    }}
]);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};


start();