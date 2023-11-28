$(document).ready(function(){
/*
const botonOcultar = document.getElementById('cerrar');
const miCuadro = document.getElementById('cuadro');
const miCaja = document.getElementById('caja');
const perrito = document.getElementById('perritobusca');


botonOcultar.addEventListener("click", () =>{
   console.log("cerrado");
   miCuadro.style.visibility = 'hidden';
   miCaja.style.visibility = 'hidden';
   perrito.style.visibility = 'visible';
});

Chiques: este codigo que está comentado es el que originalmente habian hecho Uds.
Y está correcticimo, no obstante lo modifique, para trabajar con Jquery, que es el código 
que está activo aqui abajo.
El código es totalmente equivalente con lo que hicieron Uds. pero más sencillo, analicenlo
Saludos
*/


$("#cerrar").click(function(){
   console.log("cerrado");
   $("#cuadro").css("visibility","hidden");
   $("#caja").css("visibility","hidden");
   $("#perritobusca").css("visibility","visible");
});


});