$(document).ready(function(){
  $("#personalizada").hide();
  $("#checkPersonalizada").prop("checked",false);

  $.ajax({
    url: 'test',
    dataType: "text",
    data: {tipo:"CargarFiltros"},
    type: 'GET',
    success: function(data){
      var data = JSON.parse(data);
      console.log(data);
      var aCiudades=new Array();
      var aTipo=new Array();
      $.each(data, function (i, item) {
        aCiudades[i]=item.Ciudad;
        aTipo[i]=item.Tipo;
      });
      aCiudades=unique(aCiudades);
      aTipo=unique(aTipo);
      $.each(aCiudades, function (i, item) {
        $('#selectCiudad').append($('<option>', { 
          value: item,
          text : item
        }));
      });
      $.each(aTipo, function (i, item) {
        $('#selectTipo').append($('<option>', { 
          value: item,
          text : item
        }));
      });
      
    },
    error: function(){
      alert("error al enviar los datos");
    }
  });
});

$("#buscar").click(function(){
  var ciudad = $('#selectCiudad').val();
  var tipo = $('#selectTipo').val();
  var chk=$("#checkPersonalizada").is(':checked');
  console.log(tipo);

  $.ajax({
    url: 'test',
    dataType: "text",
    data: {ciudad: ciudad, tipo: tipo, chk: chk},
    type: 'GET',
    success: function(data){
      var data = JSON.parse(data);
      console.log(data);
      var str="";
      $.each(data, function (index, data) {
          str+="<div class='resulcontenedor card'><div class='resulImagen'>";
          str+="<img src='home.jpg'></div><div class='resulDatos'>";
          str+=data.Direccion+"<br>"+data.Ciudad+"<br>"+data.Telefono+"<br>"+data.Codigo_Postal+"<br>"+data.Tipo+"<br>"+data.Precio+"<br>";
          str+="</div></div>"
      });
      //var cadena="<div class='resulImagen'><img src='img/home.jpg'></div><div class='resulDatos'>"+str+"</div>";
      //console.log(str);
      $("#resultados").html(str);
    },
    error: function(){
      alert("error al enviar los datos");
    }
  });

});

  $("#checkPersonalizada").click(function(){
    if($(this).is(':checked')){
      $("#personalizada").slideDown(1000);
    }else{
      $("#personalizada").slideUp(1000);
    }
  });

function unique(array){
    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });
}