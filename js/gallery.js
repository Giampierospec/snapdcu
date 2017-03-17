var data = [];
var btnBack = document.getElementById("btn_back");
$(document).ready(loadData);
var i = 0;

function loadData(){
  var datos = localStorage.getItem("savedPhotos");
  if(datos != null){
    data = JSON.parse(datos);
    output();
  }
  else if(datos == null){
    returnToSnap();
  }
}

function output(){
    if(i == data.length){
      i = 0;
      setTimeout(output,0);
    }
  else{
      $("#galleryImages").html("<div class='jumbotron thumbnail'><img src='"+data[i]+"'></div>").fadeIn(1000, fadeOutImage);
  }
}

function fadeOutImage(){
  $("#galleryImages").fadeOut(7000);
  i++;
  setTimeout(output, 6000);
}

function goBack(){
  if (confirm("¿Seguro que desea regresar a la vista principal?")) {
    $("#galleryImages").fadeOut(2000);
    $(btnBack).fadeOut(2000);
    setTimeout(returnSnap, 10000);
    h1 = document.createElement("h1");
    h1.innerHTML = "Redirigiendo...";
    $(h1).addClass("animated fadeOut infinite");
    $(h1).appendTo(".container-fluid");
  }
}
function returnToSnap(){
  $("#galleryImages").fadeOut(2000);
  $(btnBack).fadeOut(2000);
  setTimeout(returnSnap, 10000);
  h1 = document.createElement("h1");
  h1.innerHTML = "Redirigiendo...";
  $(h1).addClass("animated fadeOut infinite");
  $(h1).appendTo(".container-fluid");
}
function returnSnap(){
  window.open("snap.html","_self")
}
btnBack.addEventListener("click",goBack);
