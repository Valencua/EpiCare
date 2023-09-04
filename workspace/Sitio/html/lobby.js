const botonOcultar = document.getElementById('cerrar');
const miCuadro = document.getElementById('cuadro');
const miCaja = document.getElementById('caja');

botonOcultar.addEventListener("click", () =>{
   console.log("cerrado");
   miCuadro.style.display = 'none';
   miCaja.style.display = 'none';
})