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
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id:socket.id,...data});
    });
    console.log("io is on");
})

app.get('/',(req,res)=>{
    res.render("index");
})

//listening to port 3000
server.listen(3000,()=>{
    console.log('listening to port 3000');
})