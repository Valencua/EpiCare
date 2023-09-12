const botonOcultar = document.getElementById('cerrar');
const miCuadro = document.getElementById('cuadro');
const miCaja = document.getElementById('caja');
const botonMostrar = document.getElementById('abrir')
const miCuadro1 = document.getElementById('cuadro1');
const miCaja1 = document.getElementById('caja1');

botonOcultar.addEventListener("click", () =>{
   console.log("cerrado");
   miCuadro.style.visibility = 'hidden';
   miCaja.style.visibility = 'hidden';
})

botonMostrar.addEventListener("click", () =>{
   console.log("abierto");
   miCuadro1.style.visibility = 'visible';
   miCaja1.style.visibility = 'visible';
})