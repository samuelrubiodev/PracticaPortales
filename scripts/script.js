let fecha = document.querySelector("#fecha-actual");

const date = new Date();

fecha.textContent = date.toISOString();
