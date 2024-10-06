document.getElementById("reservationForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturar los datos del formulario
    const reservationData = {
        maestro: document.getElementById("maestroInput").value,
        materia: document.getElementById("materiaInput").value,
        fecha: document.getElementById("fechaInput").value,
        hora: document.getElementById("horaInput").value,
        horaSalida: document.getElementById("horaSalidaInput").value,
        laboratorio: document.getElementById("laboratorioInput").value,
    };

    try {
        // Crear una nueva reservación en la base de datos a través del contexto expuesto en preload
        const reservationId = await window.versions.createReservation(reservationData);
        alert("Reservación creada con ID: " + reservationId);
    } catch (error) {
        console.error("Error al crear la reservación:", error);
    } 

    let isValid = true; // Variable para controlar el estado de validación

    // Validar el campo "maestro"
    let maestro = reservationData.maestro;
    let laboratorio = reservationData.laboratorio;
    let regex = /^[A-Za-z\s]+$/; // Solo letras y espacios

    if (!regex.test(maestro)) {
        alert("El campo 'Maestro' solo puede contener letras");
        isValid = false; // Establecer isValid a false si hay un error
    }
    
    // Validar laboratorio
    laboratorio = parseInt(laboratorio); // Asegurarse de que sea un número
    if (isNaN(laboratorio) || laboratorio <= 0) {
        alert("El número de laboratorio debe ser un número positivo");
        isValid = false; // Establecer isValid a false si hay un error
    }

    // Si la validación es correcta, continuar
    if (isValid) {
        console.log("Reservación válida y creada");
        this.reset(); // Resetear el formulario
    }
});

// Evento para ajustar automáticamente la hora de salida
document.getElementById("horaInput").addEventListener("change", function() {
    const horaEntrada = this.value; // Obtener la hora de entrada

    // Dividir la hora y los minutos
    let [horas, minutos] = horaEntrada.split(':').map(Number);

    // Sumar 2 horas a la hora de entrada
    horas += 2;

    // Si las horas son 24 o más, restar 24 para ajustarse al formato de 24 horas
    if (horas >= 24) {
        horas -= 24;
    }

    // Formatear la hora de salida en formato de texto (HH:MM)
    const horaSalida = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
    
    // Establecer el valor de la hora de salida
    document.getElementById("horaSalidaInput").value = horaSalida;
});