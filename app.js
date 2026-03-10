const form = document.getElementById("form-tarea");
const input = document.getElementById("input-tarea");
const intensidadInput = document.getElementById("select-intensidad");
const lista = document.querySelector(".lista-semanal");
const buscador = document.getElementById("buscar-tarea");
const toggleBtn = document.getElementById("toggle-dark");
const icon = document.getElementById("icon-dark");

let tareas = [];

document.addEventListener("DOMContentLoaded", () => {
  const guardadas = localStorage.getItem("tareas");
  if (guardadas) {
    tareas = JSON.parse(guardadas);
    tareas.forEach(mostrarTarea);
  }
  actualizarEstadoVacio();

  const tema = localStorage.getItem("tema");
  if (tema === "dark") {
    document.documentElement.classList.add("dark");
    icon.textContent = "☀️";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = input.value.trim();
  const intensidad = intensidadInput.value;
  if (!texto) return;

  const newTask = { id: Date.now(), texto, intensidad };
  tareas.push(newTask);
  guardar();
  mostrarTarea(newTask);
  form.reset();
});

function mostrarTarea(tarea) {
  const li = document.createElement("li");
  li.dataset.id = tarea.id;

  const color =
    tarea.intensidad === "alta"
      ? "bg-red-600"
      : tarea.intensidad === "media"
      ? "bg-orange-400"
      : "bg-teal-500";

  li.className =
    "flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-800 " +
    "border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 " +
    "dark:hover:bg-slate-700 transition";

  // Versión original del contenido (comentada):
  // li.innerHTML = `
  //   <span class="tarea-text">${tarea.texto}</span>
  //   <div class="flex items-center gap-3">
  //     <span class="inline-block w-4 h-4 rounded-full ${color}"></span>
  //     <button class="borrar text-red-500 hover:scale-110 transition" aria-label="Borrar">✖</button>
  //   </div>
  // `;

  // Versión mejorada accesible del botón borrar (activa):
  li.innerHTML = `
    <span class="tarea-text">${tarea.texto}</span>
    <div class="flex items-center gap-3">
      <span class="inline-block w-4 h-4 rounded-full ${color}"></span>
      <button class="borrar text-red-500 hover:scale-110 transition"
              aria-label="Borrar tarea">
        <span aria-hidden="true">✖</span>
        <span class="sr-only">Borrar tarea</span>
      </button>
    </div>
  `;

  lista.appendChild(li);
  actualizarEstadoVacio();
}

// La clase `sr-only` ya existe en Tailwind y oculta visualmente el texto, pero lo mantiene accesible.

lista.addEventListener("click", (e) => {
  if (!e.target.classList.contains("borrar")) return;

  const li = e.target.closest("li");
  const id = Number(li.dataset.id);

  li.remove();
  tareas = tareas.filter((t) => t.id !== id);
  guardar();
  actualizarEstadoVacio();
});

// Estado vacío + feedback visual (versión activa):
const mensajeVacio = document.getElementById("mensaje-vacio");

function actualizarEstadoVacio() {
  if (!mensajeVacio) return;
  const hayTareas = lista.querySelectorAll("li").length > 0;
  mensajeVacio.style.display = hayTareas ? "none" : "";
}

if (buscador) {
  buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const elementos = lista.querySelectorAll("li");

    elementos.forEach((li) => {
      const contenido = li.querySelector(".tarea-text").textContent.toLowerCase();
      li.style.display = contenido.includes(texto) ? "" : "none";
    });
  });
}

function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

toggleBtn.addEventListener("click", function() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");

  icon.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("tema", isDark ? "dark" : "light");
});