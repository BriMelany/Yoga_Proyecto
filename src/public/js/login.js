async function login() {

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    console.log("Enviando datos a la API:", { username, password });

    try {
        const response = await fetch("https://api-proyecto-3.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();

            if (data.success) {
                alert("Inicio de sesión exitoso");
                console.log("Redirigiendo a:", data.redirect);
                window.location.href = data.redirect; 
            } else {
                alert(data.message);
            }
        } else {
            console.error("Respuesta no es JSON:", await response.text());
            alert("Hubo un problema con la respuesta del servidor.");
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Hubo un problema con la conexión al servidor.");
    }
}