
# App de Reservaciones

## Descripción
Esta aplicación permite a los usuarios gestionar reservaciones de laboratorios. Los usuarios pueden crear, editar, eliminar y filtrar reservaciones de manera sencilla. 

## Tecnologías Utilizadas
- **Electron**: Para construir la aplicación de escritorio.
- **MySQL**: Para la gestión de la base de datos.
- **JavaScript**: Lenguaje de programación principal para la lógica de la aplicación.
- **HTML/CSS**: Para la estructura y estilo de la interfaz de usuario.

## Requisitos Previos
Asegúrate de tener instalado lo siguiente en tu máquina:
- [Node.js](https://nodejs.org/) (v14 o superior)
- [MySQL](https://www.mysql.com/) (v5.7 o superior)

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/App_Reservas.git
   cd App_Reservas
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la base de datos:**
   - Crea una base de datos en MySQL llamada `biblioteca01`.
   - Asegúrate de que el usuario `root` sin contraseña tenga acceso a esta base de datos.

4. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

## Uso
- **Crear Reservación**: Completa el formulario con los detalles de la reservación.
- **Editar Reservación**: Haz clic en el botón "Editar" junto a la reservación que deseas modificar.
- **Eliminar Reservación**: Haz clic en el botón "Eliminar" y confirma la acción.
- **Filtrar Reservaciones**: Utiliza los filtros y la barra de búsqueda para encontrar reservaciones específicas.

## Estructura de Archivos
```
App_Reservas/
├── src/
│   ├── main.js          # Archivo principal de Electron
│   ├── renderer.js      # Lógica del frontend
│   ├── database.js      # Conexión y consultas a la base de datos
│   ├── precarga.js      # Script de precarga
│   └── rs.js            # Lógica para la gestión de reservaciones
├── package.json          # Configuración del proyecto y dependencias
└── README.md             # Documentación del proyecto
```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor crea un `fork` del repositorio y envía un `pull request`.

## Licencia
Este proyecto está licenciado bajo la [MIT License](LICENSE).

### Instrucciones:
- **Reemplaza `tu-usuario` en la URL del repositorio con tu nombre de usuario de GitHub.**
- **Asegúrate de que la estructura de archivos y la configuración de tu proyecto coincidan con la documentación.**


Puedes copiar y pegar este texto directamente en tu archivo `README.md`. Si necesitas más cambios o adiciones, ¡solo dímelo!
