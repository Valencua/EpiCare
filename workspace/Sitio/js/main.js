
$(document).ready(function(){


$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
/*
 $('.registrado').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
*/


 $("#ver").click(function(){
   if($(this).is(':checked')){
      $("#password").attr("type","text");
   }else{
      $("#password").attr("type","password");
   }
 });
 
 $("#login").click(function(){
      $(".mensaje").html('');
      $.ajax({
            type: 'POST',
            url: '../PHP/Login.php',
            dataType: "json",
            data: 'Usuario=' + $("#usuario").val() + '&Contrasena=' + $("#contrasenia").val() ,

            success: function (devolucion) {
                if(devolucion.status != 'ok'){
                    $(".mensaje").css("color","red");
                    $(".mensaje").html(devolucion.resultado);
                }else if (devolucion.status == 'ok') {
                    window.location = 'Lobby.html';
                }
            },
            error: function(err){
                console.log(err);
            }
        });
 });
 

$("#registrar").click(function(){
      $(".mensaje").html('');
      $.ajax({
            type: 'POST',
            url: '../PHP/Registrar.php',
            dataType: "json",
            data: 'Nombre='+$("#nombre").val() +'&Apellido=' + $("#apellido").val() +'&Email=' + $("#email").val() +'&Usuario=' + $("#usuarior").val() + '&Contrasena=' + $("#password").val() ,

            success: function (devolucion) {
                if(devolucion.status != 'ok'){
                    $(".mensajer").css("color","red");
                    $(".mensajer").html(devolucion.resultado);
                }else if (devolucion.status == 'ok') {
                     $('.register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                     $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
                     $("#usuario").val($("#usuarior").val());
                     $("#contrasenia").val($("#password").val());
                }
            },
            error: function(err){
                console.log(err);
            }
        });
 });
 

 });