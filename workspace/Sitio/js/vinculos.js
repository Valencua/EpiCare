const botonMostrar = document.getElementById('agregar')
const miCuadro = document.getElementById('cuadro');
const botonCerrar = document.getElementById('cerrar')

botonMostrar.addEventListener("click", () =>{

    miCuadro.style.visibility = 'visible';

 })

 botonCerrar.addEventListener("click", () =>{

    miCuadro.style.visibility = 'hidden';

 })