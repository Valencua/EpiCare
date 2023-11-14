const botonOcultar = document.getElementById('cerrar');
const miCuadro = document.getElementById('cuadro');
const miCaja = document.getElementById('caja');
const perrito = document.getElementById('perritobusca');


botonOcultar.addEventListener("click", () =>{
   console.log("cerrado");
   miCuadro.style.visibility = 'hidden';
   miCaja.style.visibility = 'hidden';
   perrito.style.visibility = 'visible';
})

