// Función para convertir una fecha a formato yyyy-MM-dd
function formatDateToInput(date) {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

// Cargar las reservaciones al inicio
async function loadReservations() {
  try {
    reservations = await window.versions.getReservations();
    renderTable(reservations); // Renderizar las reservaciones en la tabla
  } catch (error) {
    console.error("Error al cargar las reservaciones:", error);
  }
}

function renderTable(filteredReservations) {
  const reservationTable = document.getElementById("reservationTable");
  reservationTable.innerHTML = ""; // Limpia la tabla antes de agregar nuevas filas

  filteredReservations.forEach((reservation) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4">${reservation.id}</td>
      <td class="py-2 px-4">${reservation.maestro}</td>
      <td class="py-2 px-4">${reservation.materia}</td>
      <td class="py-2 px-4">${reservation.laboratorio}</td>
      <td class="py-2 px-4">${reservation.fecha}</td>
      <td class="py-2 px-4">${reservation.horaEntrada}</td>
      <td class="py-2 px-4">${reservation.horaSalida}</td>
      <td class="py-2 px-4 space-x-2">
        <button class="edit-btn px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 m-1" data-id="${reservation.id}">Editar</button>
        <button class="delete-btn px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 m-1" data-id="${reservation.id}">Eliminar</button>
      </td>
    `;

    reservationTable.appendChild(row);
  });

  // Asignar eventos a los botones de editar y eliminar
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const reservationId = event.target.getAttribute('data-id');
      const reservation = reservations.find(r => r.id == reservationId);
      openEditModal(reservation); // Abrir el modal de edición
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const reservationId = event.target.getAttribute('data-id');

      if (confirm("¿Eliminar esta reservación?")) {
        try {
          // Llamar al backend para eliminar la reservación en la base de datos
          await window.versions.deleteReservation(reservationId);
          // Eliminar la reservación del array local
          reservations = reservations.filter(r => r.id != reservationId);
          // Vuelve a renderizar la tabla
          renderTable(reservations);
        } catch (error) {
          console.error("Error al eliminar la reservación:", error);
        }
      }
    });
  });
}

// Función para abrir el modal de edición
function openEditModal(reservation) {
  const editModal = document.getElementById("editModal");
  const editReservationForm = document.getElementById("editReservationForm");

  // Rellenar los campos del formulario con los datos de la reservación a editar
  document.getElementById("editReservationId").value = reservation.id;
  document.getElementById("editMaestro").value = reservation.maestro;
  document.getElementById("editMateria").value = reservation.materia;
  document.getElementById("editLaboratorio").value = reservation.laboratorio;
  document.getElementById("editFecha").value = formatDateToInput(reservation.fecha);
  document.getElementById("editHoraEntrada").value = reservation.horaEntrada.slice(0, 5);
  document.getElementById("editHoraSalida").value = reservation.horaSalida.slice(0, 5);

  // Mostrar el modal
  editModal.classList.remove("hidden");

  // Manejar la cancelación del modal
  document.getElementById("closeModal").onclick = () => {
    editModal.classList.add("hidden"); // Cerrar el modal correctamente
  };

  // Manejar el envío del formulario de edición
  editReservationForm.onsubmit = async (e) => {
    e.preventDefault();

    const updatedReservation = {
      id: document.getElementById("editReservationId").value,
      maestro: document.getElementById("editMaestro").value,
      materia: document.getElementById("editMateria").value,
      laboratorio: document.getElementById("editLaboratorio").value,
      fecha: document.getElementById("editFecha").value,
      horaEntrada: document.getElementById("editHoraEntrada").value,
      horaSalida: document.getElementById("editHoraSalida").value,
    };

    
    try {
      // Llamar al backend para actualizar la reservación en la base de datos
      await window.versions.updateReservation(updatedReservation);

      const index = reservations.findIndex(r => r.id == updatedReservation.id);
      reservations[index] = updatedReservation;

      // Vuelve a renderizar la tabla
      renderTable(reservations);
      editModal.classList.add("hidden");
    } catch (error) {
      console.error("Error al actualizar la reservación:", error);
    }
  };
}


// Asegúrate de que el código se ejecute cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const filterMaestro = document.getElementById("filterMaestro");
  const filterMateria = document.getElementById("filterMateria");
  const filterLab = document.getElementById("filterLab");
  const searchInput = document.getElementById("searchInput");
  const reservationTable = document.getElementById("reservationTable");

  let reservations = [loadReservations]; // Aquí debes inicializar tus reservaciones

  // Cargar las reservaciones
  loadReservations();

  // Agregar eventos a los filtros
  filterMaestro.addEventListener("change", () => {
    const selectedMaestro = filterMaestro.value;
    const filteredReservations = selectedMaestro
      ? reservations.filter(reservation => reservation.maestro === selectedMaestro)
      : reservations;
    renderTable(filteredReservations);
  });

  filterMateria.addEventListener("change", () => {
    const selectedMateria = filterMateria.value;
    const filteredReservations = selectedMateria
      ? reservations.filter(reservation => reservation.materia === selectedMateria)
      : reservations;
    renderTable(filteredReservations);
  });

  filterLab.addEventListener("change", () => {
    const selectedLab = filterLab.value;
    const filteredReservations = selectedLab
      ? reservations.filter(reservation => reservation.laboratorio === selectedLab)
      : reservations;
    renderTable(filteredReservations);
  });
});