# App Reservas O&M — Sistema de Gestión de Reservas

> Aplicación web para gestionar reservas de salones y espacios en la Universidad O&M.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Stars](https://img.shields.io/github/stars/OrlandoMartinez-developer/App-Reservas-O-M?style=flat-square)

---

## ¿Qué hace este proyecto?

Aplicación web frontend para la comunidad universitaria O&M que permite ver la disponibilidad de salones, aulas y espacios comunes, y realizar reservas de forma rápida sin necesidad de ir presencialmente a la administración. Construida con HTML, CSS y JavaScript vanilla — sin dependencias externas, fácil de mantener y desplegar.

## Stack técnico

| Capa | Tecnología |
|---|---|
| Markup | HTML5 |
| Estilos | CSS3 (Flexbox + Grid) |
| Lógica | JavaScript (ES6+) |
| Almacenamiento | LocalStorage / JSON |
| Deploy | GitHub Pages / cualquier hosting estático |

## Estructura del proyecto

```
App-Reservas-O-M/
├── index.html              # Página principal / listado de espacios
├── reservar.html           # Formulario de reserva
├── mis-reservas.html       # Panel de reservas del usuario
├── admin.html              # Panel de administración
├── css/
│   ├── main.css            # Estilos globales
│   ├── components.css      # Componentes reutilizables
│   └── responsive.css      # Media queries
├── js/
│   ├── app.js              # Lógica principal
│   ├── reservas.js         # Gestión de reservas
│   ├── calendario.js       # Vista de calendario
│   └── storage.js          # Abstracción de LocalStorage
└── assets/
    └── img/                # Imágenes de los espacios
```

## Instalación y uso

No requiere instalación ni servidor. Clona el repositorio y abre `index.html` directamente en el navegador:

```bash
git clone https://github.com/OrlandoMartinez-developer/App-Reservas-O-M.git
cd App-Reservas-O-M
# Abre index.html en tu navegador
```

O accede a la versión live en GitHub Pages si está habilitado.

## Funcionalidades

| Función | Descripción |
|---|---|
| **Catálogo de espacios** | Ver todos los salones con capacidad, equipamiento y foto |
| **Disponibilidad** | Calendario visual de disponibilidad por espacio y fecha |
| **Reservar** | Formulario para solicitar reserva (fecha, hora, motivo) |
| **Mis reservas** | Ver, editar y cancelar reservas propias |
| **Panel admin** | Aprobar/rechazar solicitudes, gestionar espacios |

## Flujo de reserva

```
1. Usuario selecciona espacio
       ↓
2. Verifica disponibilidad en calendario
       ↓
3. Completa formulario (fecha, hora inicio/fin, motivo)
       ↓
4. Reserva queda en estado "Pendiente"
       ↓
5. Admin aprueba o rechaza
       ↓
6. Usuario recibe confirmación
```

## Deploy en GitHub Pages

1. Ve a **Settings → Pages** en tu repositorio
2. Selecciona la rama `main` y carpeta `/ (root)`
3. La app queda disponible en `https://tu-usuario.github.io/App-Reservas-O-M/`

## Notas del proyecto

Este proyecto fue desarrollado como solución freelance para la comunidad universitaria O&M. Demuestra el uso de JavaScript vanilla para manejar estado de la aplicación, manipulación del DOM y persistencia simple con LocalStorage sin necesidad de frameworks o backends.

## Autor

**Orlando Martinez** — ERP Consultant & Software Developer  
Santo Domingo, República Dominicana  
[Portfolio](https://orlando-developer.web.app) · [GitHub](https://github.com/OrlandoMartinez-developer)
