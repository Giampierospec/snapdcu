var data = [];
$(document).ready(loadData);

function loadData(){
  var datos = localStorage.getItem("savedPhotos");
  if(datos != null){
    data = JSON.parse(datos);
    output();
  }
}

function output(){
  for(var i=0 ; i< data.length ; i++) {
    $('<div class="item text-center"><img src="'+data[i]+'"></div>').appendTo('.carousel-inner');
    $('<li data-target="#galleryImages" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')

  }
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#galleryImages').carousel();
  $("#galleryImages").interval(10000);
}
