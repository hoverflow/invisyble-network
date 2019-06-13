var net = require('net');
var log = require('./logger.js');
var cfg = require('./config.json');

var exports = module.exports = {};

var clients = [];

exports.init = function(callback){
    log.d('server init');
    exports.server = net.createServer(function(socket) {
        exports.addClient(socket);
    });    
    exports.server.listen(cfg.serverPort, '127.0.0.1');
    callback();
};

exports.addClient = function(socket){
    log.d('adding client ');
    if(!exports.clientExists(socket.remoteAddress)){
        clients.push(socket);
    }
};

exports.clientExists = function(address){
    exists = false;
    for(x=0;x < clients.length;x++){
        if(clients.remoteAddress === address){
            exists = true;
            break;
        }
    }
    return exists;
};