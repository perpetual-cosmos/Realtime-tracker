const express =require("express");
const app=express();
const http=require("http");
const path = require("path");
const socketio=require("socket.io");

//creating server
const server=http.createServer(app)

//creating socket
const io=socketio(server);


//ejs setup
app.set("view engin","ejs");
app.set(express.static(path.join(__dirname,"public")));


//listening to port 3000
server.listen(3000,()=>{
    console.log('listening to port 3000');
})