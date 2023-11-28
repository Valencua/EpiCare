const botonDelete = document.getElementById('tacho');
const elementosSacar = document.querySelectorAll('#sacar');

botonDelete.addEventListener("click", () => {
    // Itera sobre todos los elementos con id 'sacar' y cambia su visibilidad
    elementosSacar.forEach(elemento => {
        // Alterna la visibilidad basada en el estado actual
        elemento.style.visibility = (elemento.style.visibility === 'visible') ? 'hidden' : 'visible';
    });
});