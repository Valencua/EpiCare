const edit = document.getElementById('edit');
const miInput = document.getElementById('miInput');
const miInput1 = document.getElementById('miInput1');
const miInput2 = document.getElementById('miInput2');
const miInput3 = document.getElementById('miInput3');
const miInput4 = document.getElementById('miInput4');
var contador = 0;


edit.addEventListener('click', function () {
   miInput.readOnly = !miInput.readOnly;
   miInput1.readOnly = !miInput1.readOnly;
   miInput2.readOnly = !miInput2.readOnly;
   miInput3.readOnly = !miInput3.readOnly;
   miInput4.readOnly = !miInput4.readOnly;
   contador ++;
   if (contador % 2 ==0)
   {
      edit.textContent = "Editar";
   }
   else{
      edit.textContent = "Hecho";
   }
});