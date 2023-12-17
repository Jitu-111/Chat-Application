const socket =io();
let nam;
let textarea=document.querySelector('#textarea');
let messagearea=document.querySelector('.message_area');
do{
    nam = prompt('Enter Your Name:');
}while(!nam)
 
textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
})
function sendMessage(message){
    let msg={
        user: nam,
        message: message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value='';
    toptobottom();

    //Sending to Server
    socket.emit('message',msg)
    
}
 function appendMessage(msg,type)
 {
    let maindiv=document.createElement('div');
    let className=type;
    maindiv.classList.add(className,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
     `
     maindiv.innerHTML=markup;

     messagearea.appendChild(maindiv);

 }
 //recieve messages

 socket.on('message',(msg)=>{
    console.log(msg);
    appendMessage(msg,'incoming')
    toptobottom();
 })

 function toptobottom()//for making the scroller down everytime at the time of updation
 {
    messagearea.scrollTop=messagearea.scrollHeight;
 }
