/* Validar si un campo requerido en un formulario está vacío.
* @param {number} id
* @return {boolean} true || false
*/
function validarCampoVacio(id){
   if(document.getElementById(id).value == ""){
       addInvalid(id);
       return false;
   } else {
       addValid(id);     
       return true;
   }
}
/**
* Validar un campo que no es obligatorio en un formulario.
* @param {Number} id 
*/
function validarCampoAlternativo(id){
   addValid(id);
   return true;
}
/**
* Agregar la clase "valid" a un elemento y remover "invalid", indicando que está correcto.
* @param {Number} id 
*/
function addValid(id) {
   document.getElementById(id).classList.remove("is-invalid");
   document.getElementById(id).classList.add("is-valid");    
}
/**
* Agregar la clase "invalid" a un elemento y remover "valid", indicando que está incorrecto.
* @param {Number} id 
*/
function addInvalid(id) {
       document.getElementById(id).classList.remove("is-valid");
       document.getElementById(id).classList.add("is-invalid");
}

/* ------ Validar campos especificos ------ */
/**
 * Validar un campo no obligatorio para un email. Si tiene un valor verificar que sea un email válido.
 * @param {String} email
 * @return {boolean} true|| false
 */
function validarEmailAlternativo(email) {
    if (document.getElementById(email).value == "") {
        addValid(email);
        console.log("Email vacio OK: "+email);
        return true;
    } else {
        return validarRegex(email,"email");
    }
}
/**
 * Validar que dos contraseñas coincidan entre si. En especial para un formulario de registro.
 * @param {String} contra1
 * @param {String} contra2
 * @return {boolean} true|| false
 */
function validarPasswordSignUp(contra1,contra2){
    if (validarRegex(contra1, "password") && validarRegex(contra2, "password")) {
        if (document.getElementById(contra1).value == document.getElementById(contra2).value) {
            addValid(contra1);
            addValid(contra2);
            return true;
        } else {
            addInvalid(contra1);
            addInvalid(contra2);
            alert("Las contraseñas no coinciden.");
            return false;
        }
    } else {
        return false;
    }
}
/* ------ Validar campos usando expresiones regulares ------ */
/**
 * Validar mediante expresiones regulares el formato de números enteros y decimales, contraseñas, email y username.
 * @param {Number} id
 * @param {String} tipo
 * @return {boolean} true || false
 */
function validarRegex(id, tipo) {
    var re = null;
    switch (tipo) {
        case "entero":
            re = /^[0-9]+$/;
            break;
        case "decimal":
            re = /^[0-9]+[,|\.]?[0-9]+$/;
            break;
        case "password":
            re = /^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!?$%:;\+\-_.,<>]).*$/;
            break;
        case "username":
            re = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            break;
        case "email":
            re = /^(([^<>()%&[\]\.,;:\s@\"]+(\.[^<>()%&[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()%&[\]\.,;:\s@\"]+\.)+[^<>()%&[\]\.,;:\s@\"]{2,})$/;
            break;
    }
    console.log(re);
    if ( re.test(document.getElementById(id).value) ) {
        console.log(tipo+" valido: " + document.getElementById(id).value);
        addValid(id);
        return true;
    } else {
        console.log(tipo+" invalido: " + document.getElementById(id).value);
        addInvalid(id);
        return false;
    }
}

/* ------ BLOQUEAR EL TECLADO PARA QUE SOLO CIERTOS CARACTERES PUEDAN SER USADOS ------ */
$(".regexEntero").keypress(
    /**
     * Bloquear el teclado para que sólo se puedan escribir los dígitos del 0 - 9.
     */
    function(){
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null: event.charCode >= 48 && event.charCode <= 57;
});
$(".regexDecimal").keypress(
    /**
     * Bloquear el teclado para que sólo se puedan escribir los dígitos del 0 - 9 y usar el punto o la coma decimal.
     */
    function(){
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null: event.charCode >= 48 && event.charCode <= 57 /*|| event.charCode == 44 */|| event.charCode == 46;
});  
$(".regexAlfanumerico").keypress(
    /**
     * Bloquear el teclado para que sólo se puedan escribir caracteres alfanuméricos los dígitos del 0 - 9.
     */
    function(){
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null: event.charCode >= 48 && event.charCode <= 57 || event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122;
});