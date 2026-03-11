/**
 * Versión FINAL
 * ---------------------------------------------------------
 * Funciones Refactorizadas clave:
 * - mostrarTarea(tarea)            [creación segura + .tarea-text + X roja]
 * - filtrarTareas(query)           [normaliza y usa display para compatibilidad]
 * - actualizarEstadoVacio()        [usa computedStyle para contar visibles]
 * - setTareas(next) + renderLista()[estado + re-render + reaplicar filtro]
 * - applyTheme(), toggleTheme()    [tema + a11y]
 */
/* ===================== DOM refs ===================== */
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const intensitySelect = document.getElementById("intensity-select");
const taskList = document.querySelector(".task-list");
const searchInput = document.getElementById("task-search");
const emptyState = document.getElementById("empty-state");
const formErrorSummary = document.getElementById("form-error-summary");
const taskInputError = document.getElementById("task-input-error");
const intensityError = document.getElementById("intensity-select-error");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const liveRegion = document.getElementById("live");

/* ===================== UI text ===================== */
const UI_TEXT = {
  added: "Tarea añadida",
  removed: "Tarea eliminada",
  empty: "No hay entrenamientos todavía. Añade el primero arriba.",
};

/* ===================== State ===================== */
const state = {
  tasks: [],
  theme: "light",
};

/* ===================== Validation Rules ===================== */
const RULES = {
  minLength: 3,
  maxLength: 80,
  maxTasks: 200,
  blockChars: /[<>]/g,
  requireWord: /[\p{L}\p{N}]/u,
  bannedWords: ["prueba", "test"], // puedes añadir más
};

/* ===================== Helpers ===================== */
function norm(s = "") {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function debounce(fn, ms = 180) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function announce(msg) {
  if (liveRegion) liveRegion.textContent = msg;
}

/* ===================== Storage ===================== */
function loadTasks() {
  try {
    const raw = localStorage.getItem("tareas");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("tareas", JSON.stringify(state.tasks));
  } catch {}
}

function getStoredTheme() {
  try {
    return localStorage.getItem("tema");
  } catch {
    return null;
  }
}

function saveTheme(m) {
  try {
    localStorage.setItem("tema", m);
  } catch {}
}

/* ===================== Validation Helpers ===================== */
function setFieldError(inputEl, errorEl, msg) {
  inputEl.setAttribute("aria-invalid", "true");
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function clearFieldError(inputEl, errorEl) {
  inputEl.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

function setFormErrorSummary(msg) {
  formErrorSummary.textContent = msg;
  formErrorSummary.classList.remove("hidden");
}

function clearFormErrorSummary() {
  formErrorSummary.classList.add("hidden");
  formErrorSummary.textContent = "";
}

/* ===================== Validators ===================== */
function validateTaskText(rawText, currentTasks) {
  const cleaned = rawText.replace(/\s+/g, " ").trim();
  if (!cleaned) return { ok: false, msg: "Escribe una tarea." };

  if (RULES.blockChars.test(cleaned))
    return { ok: false, msg: "No se permiten < o >." };

  if (cleaned.length < RULES.minLength)
    return { ok: false, msg: `Mínimo ${RULES.minLength} caracteres.` };

  if (cleaned.length > RULES.maxLength)
    return { ok: false, msg: `Máximo ${RULES.maxLength} caracteres.` };

  if (!RULES.requireWord.test(cleaned))
    return { ok: false, msg: "Debe contener letras o números." };

  const normalized = norm(cleaned);

  if (RULES.bannedWords.some((w) => normalized.includes(norm(w))))
    return { ok: false, msg: "La tarea contiene palabras no permitidas." };

  if (currentTasks.some((t) => norm(t.text) === normalized))
    return { ok: false, msg: "Esa tarea ya existe." };

  return { ok: true, text: cleaned };
}

function validateIntensity(i) {
  const allowed = new Set(["high", "medium", "low"]);
  return allowed.has(i)
    ? { ok: true }
    : { ok: false, msg: "Intensidad inválida." };
}

function validateMaxTasks(count) {
  return count >= RULES.maxTasks
    ? { ok: false, msg: `Máximo ${RULES.maxTasks} tareas.` }
    : { ok: true };
}

/* ===================== Theme ===================== */
function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  state.theme = isDark ? "dark" : "light";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  applyTheme(state.theme !== "dark");
  saveTheme(state.theme);
}

function initTheme() {
  const stored = getStoredTheme();
  const preferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored ? stored === "dark" : preferDark);
}

/* ===================== Render ===================== */
const INTENSITY_BADGE = {
  high: "bg-red-600",
  medium: "bg-orange-400",
  low: "bg-teal-500",
};

function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.dataset.intensity = task.intensity;

  const color = INTENSITY_BADGE[task.intensity];

  li.className =
    "flex items-center justify-between gap-3 p-3 bg-white dark:bg-slate-800 " +
    "border border-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition";

  const left = document.createElement("span");
  left.className = "inline-flex items-center gap-2";

  const dot = document.createElement("span");
  dot.className = `inline-block w-2.5 h-2.5 rounded-full ${color}`;

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  left.append(dot, text);

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className =
    "delete-task px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 active:scale-95 transition";
  delBtn.textContent = "✖";

  li.append(left, delBtn);
  taskList.appendChild(li);
}

function renderList() {
  taskList.textContent = "";
  const search = searchInput.value;
  state.tasks.forEach(renderTask);
  if (search) filterTasks(search);
  else updateEmptyState();
}

function updateEmptyState() {
  const visible = [...taskList.querySelectorAll("li")].some(
    (li) => getComputedStyle(li).display !== "none"
  );
  emptyState.style.display = visible ? "none" : "";
}

/* ===================== Filtering ===================== */
function filterTasks(query) {
  const q = norm(query);
  taskList.querySelectorAll("li").forEach((li) => {
    const txt = li.querySelector(".task-text");
    const content = norm(txt.textContent);
    li.style.display = content.includes(q) ? "" : "none";
  });
  updateEmptyState();
}

/* ===================== State setter ===================== */
function setTasks(next) {
  state.tasks = next;
  saveTasks();
  renderList();
}

/* ===================== Init ===================== */
initTheme();
state.tasks = loadTasks();
renderList();

/* ===================== Live validation ===================== */
taskInput.addEventListener(
  "input",
  debounce(() => {
    clearFieldError(taskInput, taskInputError);
    const check = validateTaskText(taskInput.value, state.tasks);
    if (!check.ok)
      setFieldError(taskInput, taskInputError, check.msg);
  }, 220)
);

/* ===================== Submit handler con validaciones ===================== */
let submitLocked = false;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitLocked) return;
  submitLocked = true;
  setTimeout(() => (submitLocked = false), 700);

  clearFormErrorSummary();
  clearFieldError(taskInput, taskInputError);
  clearFieldError(intensitySelect, intensityError);

  const countCheck = validateMaxTasks(state.tasks.length);
  if (!countCheck.ok) {
    setFormErrorSummary(countCheck.msg);
    taskInput.focus();
    return;
  }

  const rawText = taskInput.value;
  const intensity = intensitySelect.value;

  const textCheck = validateTaskText(rawText, state.tasks);
  if (!textCheck.ok) {
    setFieldError(taskInput, taskInputError, textCheck.msg);
    setFormErrorSummary("Corrige los errores del formulario.");
    taskInput.focus();
    return;
  }

  const intCheck = validateIntensity(intensity);
  if (!intCheck.ok) {
    setFieldError(intensitySelect, intensityError, intCheck.msg);
    setFormErrorSummary("Corrige los errores del formulario.");
    intensitySelect.focus();
    return;
  }

  const newTask = { id: Date.now(), text: textCheck.text, intensity };
  setTasks([...state.tasks, newTask]);
  taskForm.reset();
  announce(UI_TEXT.added);

  if (searchInput.value) filterTasks(searchInput.value);
});

/* ===================== Delete ===================== */
taskList.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-task");
  if (!btn) return;

  const li = btn.closest("li");
  const id = Number(li.dataset.id);
  setTasks(state.tasks.filter((t) => t.id !== id));
  announce(UI_TEXT.removed);

  if (searchInput.value) filterTasks(searchInput.value);
});

/* ===================== Search ===================== */
searchInput.addEventListener(
  "input",
  debounce(() => filterTasks(searchInput.value), 180)
);

/* ===================== Theme toggle ===================== */
themeToggle.addEventListener("click", toggleTheme);