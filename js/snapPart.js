//Variables
var photoTake = document.getElementById("photo_button");
var gallery = document.getElementById("gallery");
var cam = document.getElementById("camera_take");
var src = null;
var width = 320;
var height = 480;
var streaming = false;
var video = null;
var canvas = null;
var photo_button = null;
var dat = [];
var localStream;
//Save the image
function saveImage(src){
  if(src != null){
    dat.push(src);
    console.log(dat);
    save();
  }
  else{
    alert("La imagen no pudo ser guardada correctamente");
  }

}
//Saves everything
function save(){
  var datos = JSON.stringify(dat);
  localStorage.setItem("savedPhotos",datos);
}
//This takes photo
function tomarFoto(){
  $(".jumbotron").fadeIn("slow");
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo_button = document.getElementById('photo_button');
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(function(stream){
    video.srcObject = stream;
    localStream = stream;
    video.play();})
    .catch(function(err){
      console.log("An error occured! " + err);
      alert("Hubo un error, se recargara la pagina");
      location.reload();
    });


  video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    photo_button.addEventListener('click', function(ev){
      takePic();
      $("#photoModal").modal("show");
      ev.preventDefault();
    }, false);
clearPhoto();
}
//clears photo
 function clearPhoto(){
   var context = canvas.getContext('2d');
   context.fillstyle = "#AAA";
   context.fillRect(0,0,canvas.width, canvas.height);

   var data = canvas.toDataURL('image/png');
   src = data;
 }
 //Takes a picture
 function takePic(){
   var context = canvas.getContext('2d');
   if(width && height){
     canvas.width = width;
     canvas.height = height;
     context.drawImage(video,0,0, width,height);

     var data = canvas.toDataURL('image/png');
     src = data;
      saveImage(src);
   }
   else{
     clearPhoto();
   }
 }
//loads the main view
 function cargarVistaPrincipal(){
   $(".jumbotron").hide();
   var message = document.getElementById("message");
   h1 = document.createElement("h1");
   h1.innerHTML = "Recreando Vista Principal";
   message.appendChild(h1);
   $(h1).fadeOut(4000);
   setTimeout(tomarFoto, 5000);
 }
 //Loads the gallery view
 function loadGallery(){
   if(confirm("Seguro que desea visitar la galeria?")){
     $(".jumbotron").hide();
     h1 = document.createElement("h1");
     h1.innerHTML = "Redirigiendo a galeria";
     message.appendChild(h1);
     $(h1).addClass("animated fadeOut infinite");
     $(h1).css("margin-top","50%");
     video.pause();
  video.src = "";
  localStream.getTracks()[0].stop();
  console.log("Vid off");
     setTimeout(redirectGallery,7000);

   }
 }
 //redirect to gallery
 function redirectGallery(){
   window.open("gallery.html","_self");
 }
 //load Data
 function loadData(){
   var datos = localStorage.getItem("savedPhotos");
   if(datos != null){
     dat = JSON.parse(datos);
   }
   cargarVistaPrincipal();
 }
 //Eventos
 window.addEventListener("load",loadData);
 gallery.addEventListener("click",loadGallery);
