async function loadReservations() {
  try {
    // Obtener todas las reservaciones desde la base de datos
    const reservations = await window.versions.getReservations();
    renderTable(reservations); // Renderizar las reservaciones en la tabla
  } catch (error) {
    console.error("Error al cargar las reservaciones:", error);
  }
}

// Definir la función renderTable fuera del evento DOMContentLoaded
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
      <td class="py-2 px-4 space-x-2">
        <button class="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">Editar</button>
        <button class="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600">Eliminar</button>
      </td>
    `;

    // Acción del botón Editar
    row.querySelector('.bg-blue-500').addEventListener("click", () => {
      const newData = prompt("Editar reservación:", JSON.stringify(reservation));
      if (newData) {
        const updatedReservation = JSON.parse(newData);
        Object.assign(reservation, updatedReservation);
        renderTable(filteredReservations);
      }
    });

    // Acción del botón Eliminar
    row.querySelector('.bg-red-500').addEventListener("click", () => {
      if (confirm("¿Eliminar esta reservación?")) {
        filteredReservations = filteredReservations.filter(r => r.id !== reservation.id);
        renderTable(filteredReservations);
      }
    });

    reservationTable.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const filterMaestro = document.getElementById("filterMaestro");
  const filterMateria = document.getElementById("filterMateria");
  const filterLab = document.getElementById("filterLab");
  const filterDateFrom = document.getElementById("filterDateFrom");
  const printButton = document.querySelector('.bg-green-500'); // Botón para imprimir PDF

  // Ejecutar la función loadReservations para cargar las reservas desde la base de datos
  loadReservations();

  // Filtros y búsqueda
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredReservations = reservations.filter(reservation =>
      reservation.maestro.toLowerCase().includes(searchTerm) ||
      reservation.materia.toLowerCase().includes(searchTerm) ||
      reservation.laboratorio.toLowerCase().includes(searchTerm) ||
      reservation.fecha.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredReservations);
  });

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

  filterDateFrom.addEventListener("change", () => {
    const selectedDate = filterDateFrom.value;
    const filteredReservations = selectedDate
      ? reservations.filter(reservation => reservation.fecha >= selectedDate)
      : reservations;
    renderTable(filteredReservations);
  });

  printButton.addEventListener('click', () => {
    window.print(); // Imprime la página actual
  });
});
