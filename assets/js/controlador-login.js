$(document).ready(function(){
    console.log('El DOM login.html ha sido cargado ♥');
});

function iniciarSesion() {
    let valEmail = validarRegex('login-txt-email','email');
    let valPassword = validarRegex('login-txt-password','password');
    if (valEmail && valPassword) {
        alert('Inicio de sesión exitoso');
    }
}