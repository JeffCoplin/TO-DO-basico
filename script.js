// Inicializar tareas desde localStorage o vacío
var tareas = JSON.parse(localStorage.getItem("tareas")) || {
  todo: [],
  doing: [],
  done: []
};

// Cargar tareas al iniciar
cargarTareas();

function addTask() {
  var tareaTexto = document.getElementById("input-task").value;
  if (tareaTexto === "") {
    alert("Escribe una tarea");
    return;
  }

  // Agregar al arreglo y localStorage
  tareas.todo.push(tareaTexto);
  guardarLocal();

  // Mostrar en pantalla
  crearTareaElemento(tareaTexto, "todo");

  document.getElementById("input-task").value = "";
}

function crearTareaElemento(texto, estado) {
  var tareaDiv = document.createElement("div");
  tareaDiv.className = "to-list flex items-center gap-2 mb-2";

  var radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "task";
  radio.className =
    estado === "todo"
      ? "w-5 h-5 accent-gray-400"
      : estado === "doing"
      ? "w-5 h-5 accent-blue-400"
      : "w-5 h-5 accent-green-400";
  if (estado === "done") radio.disabled = true;

  // Configurar click según estado
  if (estado === "todo") {
    radio.onclick = function () {
      moverTarea(texto, "todo", "doing");
    };
  } else if (estado === "doing") {
    radio.onclick = function () {
      moverTarea(texto, "doing", "done");
    };
  }

  var label = document.createElement("label");
  label.textContent = texto;

  // Botón eliminar
  var eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "🗑️";
  eliminarBtn.className = "ml-2 text-red-500";
  eliminarBtn.onclick = function () {
    eliminarTarea(texto, estado);
  };

  tareaDiv.appendChild(radio);
  tareaDiv.appendChild(label);
  tareaDiv.appendChild(eliminarBtn);

  document.querySelector(
    estado === "todo"
      ? ".TO-DO"
      : estado === "doing"
      ? ".DOING"
      : ".DONE"
  ).appendChild(tareaDiv);
}

function eliminarTarea(texto, estado) {
  // Eliminar del arreglo de tareas
  tareas[estado] = tareas[estado].filter((t) => t !== texto);

  guardarLocal();
  recargarListas();
}

function moverTarea(texto, origen, destino) {
  // Eliminar de origen
  tareas[origen] = tareas[origen].filter((t) => t !== texto);

  // Agregar a destino
  tareas[destino].push(texto);

  guardarLocal();
  recargarListas();
}

function guardarLocal() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function recargarListas() {
  document.querySelector(".TO-DO").innerHTML =
    `<div class="header-list"><h2>TO DO</h2></div>`;
  document.querySelector(".DOING").innerHTML =
    `<div class="header-list"><h2>DOING</h2></div>`;
  document.querySelector(".DONE").innerHTML =
    `<div class="header-list"><h2>DONE</h2></div>`;
  cargarTareas();
}

function cargarTareas() {
  tareas.todo.forEach((t) => crearTareaElemento(t, "todo"));
  tareas.doing.forEach((t) => crearTareaElemento(t, "doing"));
  tareas.done.forEach((t) => crearTareaElemento(t, "done"));
}
