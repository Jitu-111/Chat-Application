const socket =io();
let nam;
let textarea=document.querySelector('#textarea');
const btn = document.getElementById('btn');
let messagearea=document.querySelector('.message_area');
do{
    nam = prompt('Enter Your Name:');
}while(!nam)
 
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let message1=textarea.value; 
    sendMessage(message1);
  });
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
        <p id="onlymessage">${msg.message}</p>
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

 function toptobottom()
 {
    messagearea.scrollTop=messagearea.scrollHeight;
 }
