const express = require("express");
const app=express();
const http = require("http");
const path=require("path"); 
const server=http.createServer(app);
const { Server }=require("socket.io");
const io =new Server(server);

//socket.io
io.on('connection', (socket) => {
    socket.on("message",(msg)=>{
        console.log("New Message :",msg);
        socket.broadcast.emit('message',msg);
    });
  }); 

app.use(express.static(path.resolve("./public")));
app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html");
 });
 server.listen(9000, () => { 
    console.log(`Listening on port:9000 `)
})

