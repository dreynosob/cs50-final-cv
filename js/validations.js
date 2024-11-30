/*
       Function que simula el efecto de loading cuando se envian datos al backend o se procesan
      */
function showLoading() {
  document.getElementById("loadingScreen").style.display = "flex";
  setTimeout(hideLoading, 2000);
}
/*
       Function que esconde el loading
      */
function hideLoading() {
  document.getElementById("loadingScreen").style.display = "none";
}
/*
       Function que maneja los diferentes mensajes de error
      */
function errorMessage(errorField, field, isrequired, message) {
  if (isrequired) {
    document.getElementById(
      `${errorField}`
    ).textContent = `${field} es obligatorio`;
    document.getElementById(`${errorField}`).style.display = "block";
  } else {
    document.getElementById(
      `${errorField}`
    ).textContent = `${field} con formato no válido`;
    document.getElementById(`${errorField}`).style.display = "block";
  }
}
/*
      Usamos eventos del DOM, para asegurarnos que se ejecuta nuestro JS, una vez el DOM ha sido cargado
      */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-cv");
  const container = document.getElementById("form-container");
  hideLoading();

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar envio automatico
    showLoading();

    // Selección de elementos de error y botones
    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach((span) => (span.style.display = "none"));
    const btnLimpiar = document.getElementById("limpiar");
    const btnEnviar = document.getElementById("enviar");

    let hasErrors = false;

    // Usamos expresiones regulares para las valiaciones
    const nameRegex = new RegExp("^[A-Z]{1}[A-Za-z áéúíó ñ]{2,14}$");
    const emailRegex = new RegExp("^(.+)@(\\S+)$");
    const telRegex = new RegExp("^[679]{1}[0-9]{8}$");
    const dniRegex = new RegExp("^[0-9]{8}[A-Z]{1}$");

    // Selección de los campos del formulario que nos interesan
    const userName = document.getElementById("name").value;
    const apellido = document.getElementById("apellido").value;
    const DNI = document.getElementById("dni").value;
    const fechaNacimiento = document.getElementById("nacimiento").value;
    const telefono = document.getElementById("tel").value;
    const email = document.getElementById("email").value;
    const checkbox = document.getElementById("checkbox").checked;

    // Campos de error
    const errorName = "error-name";
    const errorApellido = "error-apellido";
    const errorDNI = "error-dni";
    const errorTel = "error-tel";
    const errorNacimiento = "error-nacimiento";
    const errorEmail = "error-email";

    // Condicionales para ejecutar las validaciones
    if (userName.trim() === "") {
      errorMessage(errorName, "Nombre", true, "Nombre");
      hasErrors = true;
    } else if (!nameRegex.test(userName)) {
      errorMessage(errorName, "Nombre", false, "Nombre");
      hasErrors = true;
    }
    if (apellido.trim() === "") {
      errorMessage(errorApellido, "Apellido", true, "Apellido");
      hasErrors = true;
    }
    if (DNI.trim() === "") {
      errorMessage(errorDNI, "DNI", true, "DNI");
      hasErrors = true;
    } else if (!dniRegex.test(DNI)) {
      errorMessage(errorDNI, "DNI", false, "DNI");
      hasErrors = true;
    }
    if (fechaNacimiento.trim() === "") {
      errorMessage(
        errorNacimiento,
        "Fecha de Nacimiento",
        true,
        "Fecha de Nacimiento"
      );
      hasErrors = true;
    }
    if (telefono.trim() === "") {
      errorMessage(errorTel, "Teléfono", true, "Teléfono");
      hasErrors = true;
    } else if (!telRegex.test(telefono)) {
      errorMessage(errorTel, "Número de Teléfono", false, "Número de Teléfono");
      hasErrors = true;
    }

    if (email.trim() === "") {
      errorMessage(errorEmail, "Email", true, "Email");
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      errorMessage(errorEmail, "Email", false, "Email");
      hasErrors = true;
    }
    if (!checkbox) {
      document.getElementById("error-checkbox").textContent =
        "Debe aceptar los términos y condiciones para continuar";
      document.getElementById("error-checkbox").style.display = "block";
    }
    // Final, que muestra el mensaje de éxito si no hay errores y resetea el formulario despues de cierto tiempo
    if (!hasErrors) {
      showLoading();
      setTimeout(() => {
        document.getElementById("success").textContent =
          "¡Formulario enviado con éxito, nos pondremos en contacto contigo vía email. Gracias!";
        document.getElementById("success").style = "display: inline-block";
      }, 2000);
      // Clear the form
      setTimeout(() => {
        document.getElementById("success").style = "display: none";
        btnLimpiar.click();
      }, 6000);
    }
  });
});
