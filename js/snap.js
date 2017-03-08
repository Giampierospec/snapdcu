var message = document.getElementById("message");
function loadMessages(){
  h1 = document.createElement("h1");
  h1.innerHTML = "Bienvenido a la Aplicación de snaps";
  message.appendChild(h1);
  $(h1).fadeOut(3000);
  setTimeout(changeText, 5000);
}
function changeText(){
  h1 = document.createElement("h1");
  $(h1).show('slow');
  h1.innerHTML = "En un momento sera redirigido...";
  message.appendChild(h1);
  $(h1).addClass("animated fadeOut infinite");
  setTimeout(redirect,7000);
}
function redirect(){
  window.open("snap.html","_self");
}
$(document).ready(loadMessages);
