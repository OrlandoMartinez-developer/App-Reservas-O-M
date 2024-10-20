# App de Reservaciones

## Descripción

La App de Reservaciones es una aplicación que permite gestionar las reservaciones de laboratorios de manera eficiente. Los usuarios pueden crear, editar, eliminar y filtrar reservaciones, así como generar reportes en formato PDF. Está diseñada para su uso en entornos académicos donde se requiere la organización de laboratorios.

## Tecnologías Utilizadas

- **Electron**: Para empaquetar la aplicación en un entorno de escritorio multiplataforma.
- **MySQL**: Base de datos relacional para el almacenamiento de las reservaciones.
- **JavaScript**: Lógica principal de la aplicación.
- **HTML y CSS**: Estructura y diseño de la interfaz.
- **Tailwind CSS**: Framework de diseño para estilos modernos y responsivos.
- **jsPDF**: Para la generación de documentos PDF con las reservaciones.

## Requisitos Previos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js** (v14 o superior)
- **MySQL** (v5.7 o superior)
- **Git** (para clonar el repositorio)

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/App_Reservas.git
    cd App_Reservas
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Configurar la base de datos:

    - Crea una base de datos MySQL llamada `biblioteca01`.
    - Asegúrate de que el usuario root sin contraseña tenga acceso a esta base de datos.
    - Puedes ejecutar el siguiente comando en MySQL para crear la base de datos:

    ```sql
    CREATE DATABASE biblioteca01;
    ```

4. Iniciar la aplicación:

    Una vez que la base de datos esté configurada, ejecuta la aplicación con el siguiente comando:

    ```bash
    npm start
    ```

## Uso

### Crear una Reservación

- Completa el formulario de reservación con los campos requeridos: maestro, materia, fecha, hora y número de laboratorio.
- Haz clic en **Guardar** para registrar la reservación.

### Editar una Reservación

- Selecciona la reservación que deseas editar de la lista.
- Modifica los campos y haz clic en **Guardar** para actualizar la información.

### Eliminar una Reservación

- Encuentra la reservación que deseas eliminar en la lista.
- Haz clic en el botón **Eliminar** y confirma la acción.

### Filtrar y Buscar Reservaciones

- Utiliza la barra de búsqueda para buscar reservaciones por maestro, materia o laboratorio.
- Aplica filtros para visualizar reservaciones por maestro, materia o número de laboratorio.

### Generar Reporte en PDF

- Filtra las reservaciones por un rango de fechas específico.
- Haz clic en el botón **Generar PDF** para exportar las reservaciones en un archivo PDF.

## Contribuciones

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección:

    ```bash
    git checkout -b nombre-de-tu-rama
    ```

3. Realiza tus cambios y envía un pull request.
