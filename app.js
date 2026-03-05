
const form = document.getElementById("form-tarea");
const input = document.getElementById("input-tarea");
const intensidadInput = document.getElementById("select-intensidad");
const lista = document.querySelector(".lista-semanal");
const buscador = document.getElementById("buscar-tarea");

let tareas = [];  // Array global para almacenar las tareas.

document.addEventListener("DOMContentLoaded", function () {

    const guardadas = localStorage.getItem("tareas");

    if (guardadas) {
        tareas = JSON.parse(guardadas);

        tareas.forEach(function (tarea) {
            mostrarTarea(tarea);
        });
    }
});


/* Añadir una tarea */
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const texto = input.value.trim();
    const intensidad = intensidadInput.value;

    if (texto === "") return;  // Validación básica

    const nuevaTarea = {
        id: Date.now(),    // creamos id para identificar cada tarea
        texto: texto,
        intensidad: intensidad
    };

    tareas.push(nuevaTarea);  // Actualizamos el array

    guardar();                // Guardamos en LocalStorage
    mostrarTarea(nuevaTarea); // Actualizamos la lista

    form.reset();             
});

function mostrarTarea(tarea) {

    const li = document.createElement("li");
    li.classList.add("entreno");
    li.dataset.id = tarea.id;

    li.innerHTML = `
        <span>${tarea.texto}</span>

        <div style="display:flex;align-items:center;gap:10px;">
            <span class="${tarea.intensidad}"></span>
            <button class="borrar">✖</button>
        </div>
    `;

    lista.appendChild(li);
}

lista.addEventListener("click", function (e) {

    if (e.target.classList.contains("borrar")) {

        const li = e.target.closest("li");     
        const id = parseInt(li.dataset.id);    

        li.remove();                            

        tareas = tareas.filter(function (tarea) {
            return tarea.id !== id;             
        });

        guardar();                             
    }
});
function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

if (buscador) {

    buscador.addEventListener("input", function () {

        const texto = buscador.value.toLowerCase();

        const elementos = document.querySelectorAll(".entreno");

        elementos.forEach(function (li) {

            const contenido = li.querySelector("span").textContent.toLowerCase();

            if (contenido.includes(texto)) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
    });
}