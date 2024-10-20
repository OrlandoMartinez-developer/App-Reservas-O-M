// Función para convertir una fecha a formato yyyy-MM-dd
function formatDateToInput(date) {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

// Inicializa el array de reservaciones
let reservations = [];

// Función para cargar las reservaciones desde la base de datos
async function loadReservations() {
  try {
    reservations = await window.versions.getReservations(); // Obtener las reservas desde el backend
    populateFilters(reservations); // Poblar los filtros con los datos obtenidos
    renderTable(reservations); // Renderizar las reservaciones en la tabla
  } catch (error) {
    console.error("Error al cargar las reservaciones:", error);
  }
}

// Función para poblar los filtros con datos únicos
function populateFilters(reservations) {
  const maestros = new Set(reservations.map(res => res.maestro));
  const materias = new Set(reservations.map(res => res.materia));
  const laboratorios = new Set(reservations.map(res => res.laboratorio));

  const filterMaestro = document.getElementById("filterMaestro");
  const filterMateria = document.getElementById("filterMateria");
  const filterLab = document.getElementById("filterLab");

  // Limpiar los filtros antes de agregar nuevas opciones
  filterMaestro.innerHTML = '<option value="">Maestros</option>';
  filterMateria.innerHTML = '<option value="">Materia</option>';
  filterLab.innerHTML = '<option value="">Laboratorio</option>';

  // Agregar opciones a cada filtro
  maestros.forEach(maestro => {
    const option = document.createElement("option");
    option.value = maestro;
    option.textContent = maestro;
    filterMaestro.appendChild(option);
  });

  materias.forEach(materia => {
    const option = document.createElement("option");
    option.value = materia;
    option.textContent = materia;
    filterMateria.appendChild(option);
  });

  laboratorios.forEach(lab => {
    const option = document.createElement("option");
    option.value = lab;
    option.textContent = lab;
    filterLab.appendChild(option);
  });
}

// Función para renderizar la tabla con las reservaciones
function renderTable(filteredReservations) {
  const reservationTable = document.getElementById("reservationTable");
  reservationTable.innerHTML = ""; // Limpiar la tabla

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
      <td class="py-2 px-4 flex flex-col space-y-2">
        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 edit-btn" data-id="${reservation.id}">
          Editar
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 delete-btn" data-id="${reservation.id}">
          Eliminar
        </button>
      </td>
    `;
    reservationTable.appendChild(row);
  });

  // Asignar eventos a los botones de editar y eliminar
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const reservationId = event.target.getAttribute('data-id');
      const reservation = reservations.find(r => r.id == reservationId);
      openEditModal(reservation); // Abrir modal de edición
    });
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const reservationId = event.target.getAttribute('data-id');
      if (confirm("¿Eliminar esta reservación?")) {
        try {
          await window.versions.deleteReservation(reservationId); // Eliminar en backend
          reservations = reservations.filter(r => r.id != reservationId); // Actualizar array local
          renderTable(reservations); // Renderizar tabla nuevamente
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

  document.getElementById("editReservationId").value = reservation.id;
  document.getElementById("editMaestro").value = reservation.maestro;
  document.getElementById("editMateria").value = reservation.materia;
  document.getElementById("editLaboratorio").value = reservation.laboratorio;
  document.getElementById("editFecha").value = formatDateToInput(reservation.fecha);
  document.getElementById("editHoraEntrada").value = reservation.horaEntrada.slice(0, 5);
  document.getElementById("editHoraSalida").value = reservation.horaSalida.slice(0, 5);

  editModal.classList.remove("hidden");

  document.getElementById("closeModal").onclick = () => {
    editModal.classList.add("hidden");
  };

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
      await window.versions.updateReservation(updatedReservation);
      const index = reservations.findIndex(r => r.id == updatedReservation.id);
      reservations[index] = updatedReservation;
      renderTable(reservations);
      editModal.classList.add("hidden");
    } catch (error) {
      console.error("Error al actualizar la reservación:", error);
    }
  };
}

// Configuración al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const filterMaestro = document.getElementById("filterMaestro");
  const filterMateria = document.getElementById("filterMateria");
  const filterLab = document.getElementById("filterLab");

  loadReservations();

  filterMaestro.addEventListener("change", () => {
    const selectedMaestro = filterMaestro.value;
    const filteredReservations = selectedMaestro
      ? reservations.filter(res => res.maestro === selectedMaestro)
      : reservations;
    renderTable(filteredReservations);
  });

  filterMateria.addEventListener("change", () => {
    const selectedMateria = filterMateria.value;
    const filteredReservations = selectedMateria
      ? reservations.filter(res => res.materia === selectedMateria)
      : reservations;
    renderTable(filteredReservations);
  });

  filterLab.addEventListener("change", () => {
    const selectedLab = filterLab.value;
    const filteredReservations = selectedLab
      ? reservations.filter(res => res.laboratorio === selectedLab)
      : reservations;
    renderTable(filteredReservations);
  });
});