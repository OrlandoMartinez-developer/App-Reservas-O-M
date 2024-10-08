document.getElementById('ingresar').addEventListener("click", async function(event) {
    event.preventDefault();

    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Llamar al backend para iniciar sesión
    try {
        const result = await window.versions.loginUser(loginData);
        if (result.success) {
            console.log('Login exitoso, usuario ID:', result.userId);
            window.location.href = 'src/pages/formulario.html'
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
});