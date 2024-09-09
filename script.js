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
                            <span class="prioridad ${tarea.prioridad}"> </span>
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

    tarjeta.innerHTML = template;
    columna.appendChild(tarjeta);
    
    tarjeta.addEventListener("click", () => {
              currentTarget = tarea;
              editTareaHandler();
            });
  }

  function loadTareas(tareeas) {
    tareeas.forEach(tarea => {
      crearTarea(tarea);
    });
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
        titulo: titulo.value,
        descripcion: descripcion.value,
        asignado: asignado.value,
        estado: estado.value,
        prioridad: prioridad.value,
        fecha: fecha.value
    }

    postData(nuevaTarea);

    titulo.value = "";
    descripcion.value = "";
    asignado.value = "";
    estado.value = "";
    prioridad.value = "";
    fecha.value = "";
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

    actualizarTareaPatch(tarea);
    fetchDataAW();
  }

  function eliminarButton() {
    const eliminarButton = document.getElementById("eliminar-button");
    eliminarButton.addEventListener("click", eliminarButtonHandler);  
  }

  function eliminarButtonHandler(event) {
    event.preventDefault();

    deleteTarea(currentTarget);
    fetchDataAW();
  }

  async function fetchDataAW() {
    try {
      const url = "http://localhost:3000/tareas"
      const response = await fetch(url, { method: "GET" });
      const data = await response.json(); // extract JSON from response
      loadTareas(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function postData(tarea) {
    console.log("tarea:", tarea)

    try {
      const url = "http://localhost:3000/tareas"
      const response = await fetch(url, { 
        method: "POST",
        body: JSON.stringify(tarea) });
      const data = await response.json(); // extract JSON from response
      loadTareas(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function actualizarTareaPatch(tarea) {
    console.log("tarea: " + tarea.titulo);

    try {
      const url = `http://localhost:3000/tareas/${tarea.id}`
      const response = await fetch(url, { 
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea)
      });

      const data = await response.json(); // extract JSON from response
  
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function deleteTarea(tarea) {
    try {
      const url = `http://localhost:3000/tareas/${tarea.id}`
      const response = await fetch(url, { 
        method: "DELETE",
        body: JSON.stringify(tarea)
      });

      const data = await response.json(); // extract JSON from response
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  fetchDataAW();

  /*{
        "id": "0",
        "titulo": "Nutrirse",
        "descripcion": "Comer una manzana.",
        "asignado": "Persona",
        "estado": "Backlog",
        "prioridad": "Alta",
        "fecha": "2024-09-12"
    },
    {
        "id": "1",
        "titulo": "Bañar al perro",
        "descripcion": "Llevar al perro al veterinario.",
        "asignado": "Cucaracha",
        "estado": "Blocked",
        "prioridad": "Media",
        "fecha": "2024-09-22"
    }*/