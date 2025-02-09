// const botones = document.getElementsByClassName("btn");
//   Array.from(botones).forEach(boton => {
//     boton.addEventListener("click", () => alert("¡Botón clickeado!"));
//   });


const btn_buscar = document.getElementById("btn_cliente");
btn_buscar.addEventListener("click", () => {
    const documento = document.getElementById("tipo_documento").value;
    const numero_documento = document.getElementById("numero_documento").value;
    const data = {documento, numero_documento};
    console.log(data);
    
    });

const btn_guardar = document.getElementById("btn_registrar");
btn_guardar.addEventListener("click", () => {
    const nombre = document.getElementById("servicio").value;
    const turno = document.getElementById("turno").value;
    const horario = document.getElementById("horario").value;
    const tipo = document.getElementById("tipo").value;
    const estado = document.getElementById("estado").value;
    const monto = document.getElementById("monto").value;
    const fecha_pago = document.getElementById("fecha_pago").value;
    const medio_pago = document.getElementById("medio_pago").value;
    
    const data = {nombre, turno,horario, tipo, estado, monto, fecha_pago,medio_pago};

    console.log(data);
    
    });

const btn_limpiar = document.getElementById("btn_limpiar");
btn_limpiar.addEventListener("click", () => {
    document.getElementById("servicio").value = '';
    document.getElementById("turno").value = '';
    document.getElementById("horario").value = '';
    document.getElementById("tipo").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("monto").value = '';
    document.getElementById("fecha_pago").value = '';
    document.getElementById("medio_pago").value = '';
    });


    document.getElementById("ver_registros").addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json()) 
            .then(data => {
                const tablaBody = document.getElementById("tablaBody");
                tablaBody.innerHTML = "";

                data.forEach(usuario => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.phone}</td>
                    `;
                    tablaBody.appendChild(fila);
                });
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    });