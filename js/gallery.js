var data = [];
var btnBack = document.getElementById("btn_back");
$(document).ready(loadData);

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
  for(var i=0 ; i< data.length ; i++) {
    $('<div class="item text-center"><img class="img-thumbnail" src="'+data[i]+'"></div>').appendTo('.carousel-inner');
    $('<li data-target="#galleryImages" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')

  }
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#galleryImages').carousel({interval: 5000});
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
