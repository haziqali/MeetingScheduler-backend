/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const UserModel = mongoose.model('User');

let setServer = (server) => {

    let allOnlineUsers = []

    let io = socketio.listen(server);

    let myIo = io.of('/');

    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('set-user',(authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
                if(err){
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else{     
                    console.log("user is verified..setting details");
                    let currentUser = user.data;  
                    socket.userId = currentUser.userId
                    socket.email = currentUser.email
                    socket.userName = currentUser.userName
                    socket.join(`${socket.userName}`);
                }
            })
        }) // end of listening set-user event

  

        socket.on('add-event',(data, userName) => {    
            console.log("socket event: add-event");
            socket.to(`${userName}`).broadcast.emit('event-added',`Hi ${userName}! Meeting ${data.title} has been scheduled by ${socket.userName}`);                           
        });

        socket.on('update-event',(data, userName) => {    
            console.log(`${userName}`+"socket event: update-event");
            socket.to(`${userName}`).broadcast.emit('event-updated',`Hi ${userName}! Meeting ${data.title} has been updated by ${socket.userName}`);                           
        });

        socket.on('delete-event',(data, userName) => {    
            console.log("socket event: delete-event");
            socket.to(`${userName}`).broadcast.emit('event-deleted',`Hi ${userName}! Meeting ${data.title} has been deleted by ${socket.userName}`);                           
        });


       

            socket.on('disconnect', () => {
               socket.leaveAll();
            });
        })
       // end of on disconnect
}

module.exports = {
    setServer: setServer
}
