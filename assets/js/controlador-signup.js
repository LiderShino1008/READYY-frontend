$(document).ready(function(){
    console.log('El DOM signup.html ha sido cargado ♥');
});

/**
 * Mostrar en pantalla los campos necesarios para registrarse de acuerdo
 * al tipo de usuario seleccionado.
 * @param {String} tipo Tipo de usuario
 */
function mostrarUT(tipo) {
    switch (tipo) {
        case 'cliente':
            // Ocultar campos de administrador de negocios
            document.getElementById('reg-div-adm').classList.remove('d-flex');
            document.getElementById('reg-div-adm').classList.add('d-none');
            // Mostrar campos de cliente
            if (document.getElementById('reg-div-cliente').classList.contains('d-none')) {
                document.getElementById('reg-div-cliente').classList.remove('d-none');
                document.getElementById('reg-div-cliente').classList.add('d-flex');
            }
            // Si no esta visible mostrar boton para registrarse
            if (document.getElementById('reg-div-btn').classList.contains('d-none')) {
                document.getElementById('reg-div-btn').classList.remove('d-none');
                document.getElementById('reg-div-btn').classList.add('d-flex');
            }
            break;

        case 'adm':
            // Mostrar campos de cliente
            if (document.getElementById('reg-div-cliente').classList.contains('d-none')) {
                document.getElementById('reg-div-cliente').classList.remove('d-none');
                document.getElementById('reg-div-cliente').classList.add('d-flex');
            }
            // Mostrar campos de administrador de negocios
            document.getElementById('reg-div-adm').classList.remove('d-none');
            document.getElementById('reg-div-adm').classList.add('d-flex');
            // Mostrar boton para registrarse
            if (document.getElementById('reg-div-btn').classList.contains('d-none')) {
                document.getElementById('reg-div-btn').classList.remove('d-none');
                document.getElementById('reg-div-btn').classList.add('d-flex');
            }
            break;
    }
}

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