let tareas = [
    {
        id: 0,
        titulo: "Nutrirse",
        descripcion: "Comer una manzana.",
        asignado: "Persona",
        estado: "Backlog",
        prioridad: "Prioridad alta",
        fecha: "12-09-24"
    },
    {
        id: 1,
        titulo: "Bañar al perro",
        descripcion: "Llevar al perro al veterinario.",
        asignado: "Cucaracha",
        estado: "Blocked",
        prioridad: "Prioridad media",
        fecha: "22-09-24"
    }
]

let idActual = tareas.length;

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
    
    mostrarTarea(tarea, template);
  }

  function mostrarTarea(tarea, template) {

    const columna = document.getElementById(tarea.estado);
    const tarjeta = document.createElement("div");
    //columna.insertAdjacentHTML("beforeend", tarjeta);
    tarjeta.innerHTML = template;
    columna.appendChild(tarjeta);

  }

  function loadTareas() {
    tareas.forEach(tarea => {
      crearTarea(tarea);
    });
    tareas = [];
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

    console.log(estado.value);

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

    cancelarButton.addEventListener("click", cancelarButtonHandler);
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

  loadTareas();