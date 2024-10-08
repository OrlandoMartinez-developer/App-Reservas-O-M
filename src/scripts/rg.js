document.getElementById('registerFom').addEventListener("submit", async function(event) {


    const registerData = {
        username: document.getElementById('UserName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if(!registerData.username || !registerData.password || !registerData.email){
        alert("Rellene todo los campos")
        return;
    }
    // Llamar al backend para registrar el usuario
    try {
            const result = await window.versions.registerUser(registerData);
            console.log('Usuario registrado con ID:', result);
            window.location.href = ('index.html')
    }catch (error){
        console.error('Error al registrar el usuario:', error);
    }
});