/**
 * Versión FINAL (lista para producción)
 * ---------------------------------------------------------
 * ✔ Búsqueda funcionando (con normalización de acentos/espacios)
 * ✔ El filtro se mantiene al añadir/borrar/renderizar
 * ✔ X de borrar en ROJO
 * ✔ Sin innerHTML (creación de nodos segura)
 * ✔ Tema oscuro accesible y persistente
 * ✔ Persistencia robusta en localStorage
 * 
 * Funciones clave:
 * - mostrarTarea(tarea)            [creación segura + .tarea-text + X roja]
 * - filtrarTareas(query)           [normaliza y usa display para compatibilidad]
 * - actualizarEstadoVacio()        [usa computedStyle para contar visibles]
 * - setTareas(next) + renderLista()[estado + re-render + reaplicar filtro]
 * - applyTheme(), toggleTheme()    [tema + a11y]
 */

// ===================== Referencias del DOM =====================
const form = document.getElementById("form-tarea");
const input = document.getElementById("input-tarea");
const intensidadInput = document.getElementById("select-intensidad");
const lista = document.querySelector(".lista-semanal");
const buscador = document.getElementById("buscar-tarea");
const toggleBtn = document.getElementById("toggle-dark");
const icon = document.getElementById("icon-dark");
const mensajeVacio = document.getElementById("mensaje-vacio");

// Región aria-live (por si no existe en el HTML)
let live = document.getElementById("live");
if (!live) {
  live = document.createElement("p");
  live.id = "live";
  live.setAttribute("aria-live", "polite");
  live.className = "sr-only";
  document.body.appendChild(live);
}

// ===================== Estado =====================
const state = {
  tareas: [],
  theme: "light",
};

// ===================== Persistencia =====================
function load() {
  try {
    const raw = localStorage.getItem("tareas");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem("tareas", JSON.stringify(state.tareas));
  } catch {}
}

function saveTheme(mode) {
  try { localStorage.setItem("tema", mode); } catch {}
}

function getStoredTheme() {
  try { return localStorage.getItem("tema"); } catch { return null; }
}

// ===================== Utilidades =====================
function announce(msg) {
  if (live) live.textContent = msg;
}

function debounce(fn, ms = 180) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// Normaliza: minúsculas, quita tildes y espacios repetidos
function norm(s = "") {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function setTareas(next) {
  state.tareas = next;
  guardar();
  renderLista();
}

function renderLista() {
  if (!lista) return;
  const currentQuery = buscador?.value || ""; // re-aplicar filtro si existía
  lista.textContent = "";
  state.tareas.forEach(mostrarTarea);
  if (currentQuery) filtrarTareas(currentQuery);
  else actualizarEstadoVacio();
}

// ===================== Tema oscuro =====================
function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  state.theme = isDark ? "dark" : "light";
  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(isDark));
    toggleBtn.setAttribute(
      "aria-label",
      isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
  }
}

function toggleTheme() {
  applyTheme(state.theme !== "dark");
  saveTheme(state.theme);
}

function applyInitialTheme() {
  const stored = getStoredTheme();
  const preferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored ? stored === "dark" : preferDark);
}

// ===================== Construcción segura de cada tarea =====================
function mostrarTarea(tarea) {
  const li = document.createElement("li");
  li.dataset.id = String(tarea.id);
  li.dataset.intensidad = tarea.intensidad;

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

  // Lado izquierdo: punto de color + texto de la tarea
  const left = document.createElement("span");
  left.className = "inline-flex items-center gap-2";

  const dot = document.createElement("span");
  dot.className = `inline-block w-2.5 h-2.5 rounded-full ${color}`;

  const text = document.createElement("span");
  text.className = "tarea-text"; // <- clave para el buscador
  text.textContent = tarea.texto;

  left.append(dot, text);

  // Botón borrar (X roja)
  const del = document.createElement("button");
  del.type = "button";
  del.className =
    "borrar px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 " +
    "active:scale-95 transition";
  del.setAttribute("aria-label", "Borrar tarea");
  del.textContent = "✖";

  li.append(left, del);
  lista.appendChild(li);
}

// ===================== Estado vacío =====================
function actualizarEstadoVacio() {
  if (!mensajeVacio || !lista) return;
  // Contar visibles con computedStyle (fiable con display:none)
  const visibles = Array.from(lista.querySelectorAll("li")).some((li) => {
    return window.getComputedStyle(li).display !== "none";
  });
  mensajeVacio.style.display = visibles ? "none" : "";
}

// ===================== Búsqueda =====================
function filtrarTareas(query) {
  if (!lista) return;
  const q = norm(query || "");
  const items = lista.querySelectorAll("li");

  items.forEach((li) => {
    const tnode = li.querySelector(".tarea-text");
    const contenido = norm(tnode ? tnode.textContent : li.textContent);
    li.style.display = q ? (contenido.includes(q) ? "" : "none") : "";
  });

  actualizarEstadoVacio();
}

// ===================== Listeners =====================
applyInitialTheme();

document.addEventListener("DOMContentLoaded", () => {
  // Cargar tareas y pintar
  state.tareas = load();
  renderLista();

  // Añadir
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = (input?.value || "").trim();
      if (!texto) return;
      const intensidad = intensidadInput?.value || "media";

      const newTask = { id: Date.now(), texto, intensidad };
      setTareas([...(state.tareas || []), newTask]);
      form.reset();
      announce("Tarea añadida");

      if (buscador?.value) filtrarTareas(buscador.value); // mantener filtro activo
    });
  }

  // Borrar (delegación)
  if (lista) {
    lista.addEventListener("click", (e) => {
      const btn = e.target instanceof Element ? e.target.closest(".borrar") : null;
      if (!btn) return;
      const li = btn.closest("li");
      if (!li) return;

      const id = Number(li.dataset.id);
      setTareas((state.tareas || []).filter((t) => t.id !== id));
      announce("Tarea eliminada");

      if (buscador?.value) filtrarTareas(buscador.value); // mantener filtro activo
    });
  }

  // Buscar (debounce)
  if (buscador) {
    const debounced = debounce(() => filtrarTareas(buscador.value), 180);
    buscador.addEventListener("input", debounced);
  }

  // Tema
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
});