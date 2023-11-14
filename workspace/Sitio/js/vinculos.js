const botonMostrar = document.getElementById('abrir')
const miCuadro1 = document.getElementById('cuadro1');
const miCaja1 = document.getElementById('caja1');

botonMostrar.addEventListener("click", () =>{
    console.log("abierto");
    miCuadro1.style.visibility = 'visible';
    miCaja1.style.visibility = 'visible';
 })