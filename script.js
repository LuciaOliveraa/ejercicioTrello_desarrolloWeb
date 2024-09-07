let tareas = [
    {
        id: 0,
        titulo: "Nutrirse",
        descripcion: "Comer una manzana.",
        asignado: "Persona",
        estado: "Backlog",
        prioridad: "Prioridad alta",
        fecha: "2024-09-12"
    },
    {
        id: 1,
        titulo: "Bañar al perro",
        descripcion: "Llevar al perro al veterinario.",
        asignado: "Cucaracha",
        estado: "Blocked",
        prioridad: "Prioridad media",
        fecha: "2024-09-22"
    }
]

let idActual = tareas.length;
let currentTarget = null;

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot, .button-close') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });

    agregarTarea();
    cancelarButton();
    actualizarButton();
    eliminarButton();
  });

  function crearTarea(tarea) {
    const template = `<div id=${tarea.id} class="card js-modal-trigger" data-target="modal-editar-tarea">
                        <header class="header">
                            <span class="prioridad"> ${tarea.prioridad} </span>
                            <p class="title"> ${tarea.titulo}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                ${tarea.descripcion}
                            </div>
                        </div>
                        <footer class="card-footer">
                            <span class="card-footer-item"> ${tarea.asignado} </span>
                            <span class="card-footer-item"> ${tarea.fecha} </span>
                        </footer>
                    </div>`
    console.log(tarea.titulo);
    mostrarTarea(tarea, template);
  }

  function mostrarTarea(tarea, template) {

    const columna = document.getElementById(tarea.estado);
    const tarjeta = document.createElement("div");
    //columna.insertAdjacentHTML("beforeend", tarjeta);
    tarjeta.innerHTML = template;
    columna.appendChild(tarjeta);
    
    tarjeta.addEventListener("click", () => {
              currentTarget = tarea;
              editTareaHandler();
            });
  }

  function loadTareas() {
    const columnas = ["Backlog", "To do", "In progress", "Blocked", "Done"];
    
    //vacia columnas
    columnas.forEach(columnaId => {
        const columna = document.getElementById(columnaId);
        columna.innerHTML = "";
    });

    //llena columnas
    tareas.forEach(tarea => {
      crearTarea(tarea);
    });
    //tareas = [];
  }

  function agregarTarea() {
    const aceptarButton = document.getElementById("aceptar-button");

    aceptarButton.addEventListener("click", agregarTareaHandler);
  }

  function agregarTareaHandler(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo-input");
    const descripcion = document.getElementById("descripcion-input");
    const asignado = document.getElementById("asignado-input");
    const estado = document.getElementById("estado-input");
    const prioridad =document.getElementById("prioridad-input");
    const fecha = document.getElementById("fecha-input");

    const nuevaTarea = {
        id: idActual +1,
        titulo: titulo.value,
        descripcion: descripcion.value,
        asignado: asignado.value,
        estado: estado.value,
        prioridad: prioridad.value,
        fecha: fecha.value
    }

    tareas.push(nuevaTarea);
    idActual = idActual +1;

    titulo.value = "";
    descripcion.value = "";
    asignado.value = "";
    estado.value = "";
    prioridad.value = "";
    fecha.value = "";

    loadTareas();
  }

  function cancelarButton() {
    const cancelarButton = document.getElementById("cancelar-button");
    const cancelarButton2 = document.getElementById("cancelar-button2");

    cancelarButton.addEventListener("click", cancelarButtonHandler);
    cancelarButton2.addEventListener("click", cancelarButtonHandler);
  }

  function cancelarButtonHandler(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo-input");
    const descripcion = document.getElementById("descripcion-input");
    const asignado = document.getElementById("asignado-input");
    const estado = document.getElementById("estado-input");
    const prioridad =document.getElementById("prioridad-input");
    const fecha = document.getElementById("fecha-input");

    titulo.value = "";
    descripcion.value = "";
    asignado.value = "";
    estado.value = "";
    prioridad.value = "";
    fecha.value = "";
  }

  function editTareaHandler(event) {
    const tarea = currentTarget;

    const titulo = document.getElementById("titulo-edit");
    const descripcion = document.getElementById("descripcion-edit");
    const asignado = document.getElementById("asignado-edit");
    const estado = document.getElementById("estado-edit");
    const prioridad =document.getElementById("prioridad-edit");
    const fecha = document.getElementById("fecha-edit");

    titulo.value = tarea.titulo;
    descripcion.value = tarea.descripcion;
    asignado.value = tarea.asignado;
    estado.value = tarea.estado;
    prioridad.value = tarea.prioridad;
    fecha.value = tarea.fecha;

    console.log(tarea);
    console.log(titulo.value);
    console.log(descripcion.value);
    console.log(asignado.value);
    console.log(estado.value);
    console.log(prioridad.value);
    console.log(fecha.value);

    const editModal = document.getElementById('modal-editar-tarea');
    editModal.classList.add('is-active');
  }

  function actualizarButton() {
    const actualizarButton = document.getElementById("actualizar-button");
    actualizarButton.addEventListener("click", actualizarButtonHandler);   
  }

  function actualizarButtonHandler(event) {
    event.preventDefault();
    const tarea = currentTarget;
    
    const titulo = document.getElementById("titulo-edit");
    const descripcion = document.getElementById("descripcion-edit");
    const asignado = document.getElementById("asignado-edit");
    const estado = document.getElementById("estado-edit");
    const prioridad =document.getElementById("prioridad-edit");
    const fecha = document.getElementById("fecha-edit");

    tarea.titulo = titulo.value;
    tarea.descripcion = descripcion.value;
    tarea.asignado = asignado.value;
    tarea.estado = estado.value;
    tarea.prioridad = prioridad.value;
    tarea.fecha = fecha.value;

    //tareas.push(tarea); //esta linea necesitaba una eliminación de la tarea, en vez, uso las líneas de a continuación para modificar la tarea.
    
   const index = tareas.findIndex(t => t.id === tarea.id);
    if (index !== -1) {
        tareas[index] = tarea; 
    }

    loadTareas();
  }

  function eliminarButton() {
    const eliminarButton = document.getElementById("eliminar-button");
    eliminarButton.addEventListener("click", eliminarButtonHandler);  
  }

  function eliminarButtonHandler(event) {
    event.preventDefault();
    tareas.splice(tareas.indexOf(currentTarget));
    loadTareas();
  }

  loadTareas();