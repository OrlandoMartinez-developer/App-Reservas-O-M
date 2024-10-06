document.getElementById('registerFom').addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const registerData = {
        username: document.getElementById('UserName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Llamar al backend para registrar el usuario
    try {
        const result = await window.versions.registerUser(registerData);
        console.log('Usuario registrado con ID:', result);
        // Puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
});