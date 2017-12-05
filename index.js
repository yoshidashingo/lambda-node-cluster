'use strict';
let cluster = require('cluster')
let http = require('http')
let os = require('os')

let numCPUs = os.cpus().length

if (cluster.isMaster) {
    console.log('Number of Cores : ', numCPUs);
    exports.handler = (event, context, callback) => {
        for (let i = 0; i < numCPUs; ++i) {
            cluster.fork();
        }
        for (const id in cluster.workers) {
            cluster.workers[id].on('message', messageHandler);
        }
    }
}
else {
    process.send('running');
}

function messageHandler(msg) {
    console.log(msg);
}

// The following used for local test

//exports.handler && exports.handler();
