//Gør så knappen i navbaren ikke refresher og ødelægger search fetch til API
var nav_form = document.getElementById("nav-form");
function handleForm(event) {
    event.preventDefault();
}
nav_form.addEventListener('submit', handleForm);