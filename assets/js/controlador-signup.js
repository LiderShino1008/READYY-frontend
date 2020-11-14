$(document).ready(function(){
    console.log('El DOM signup.html ha sido cargado ♥');
});

/**
 * Mostrar en pantalla los campos necesarios para registrarse de acuerdo
 * al tipo de usuario seleccionado.
 */
$('input[name="registro-userType"]').click(function() {
  if($(this).attr('value') == 'Cliente') {
        $('#reg-div-adm').hide();
        $('#reg-div-cliente').show();
    }

    else {

        $('#reg-div-adm').show();
        $('#reg-div-cliente').show();
   
 }

});

/**
 * Obtener el valor de un grupo de radio button por nombre.
 * @param {String} nombre Atributo nombre de elementos HTML
 */
function obtenerValorRB(nombre) {
    let valorRB = '';
    document.getElementsByName(nombre).forEach((element)=>{
        if(element.checked) {
            valorRB = element.value;
        }
    });
    return valorRB;
}