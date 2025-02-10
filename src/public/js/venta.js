const apiUrl = 'https://api-proyecto-3.onrender.com/api/ventas';

function limpiar() {
    document.getElementById("tipo_servicio").value = '';
    document.getElementById("turno").value = '';
    document.getElementById("horario").value = '';
    document.getElementById("tipo_sesion").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("monto_pago").value = '';
    document.getElementById("fecha_pago").value = '';
    document.getElementById("medio_pago").value = '';
    
}

function obtener_datos() {
    
    fetch(apiUrl)
    .then(response => response.json()) 
    .then(data => {
        const tablaBody = document.getElementById("tablaBody");
        tablaBody.innerHTML = ""
        data.forEach(venta => {
            const fila = document.createElement("tr");
            fila.dataset.id = venta.id;

            fila.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.cliente_id}</td>
                <td>${venta.tipo_servicio}</td>
                <td>${venta.turno}</td>
               <td>${venta.tipo_sesion}</td>
                <td>${venta.horario}</td>
                <td>${venta.estado}</td>
                <td>${venta.monto_pago}</td>
                <td>${(venta.fecha_pago).slice(0,10)}</td>
                <td>${(venta.fecha_registro).slice(0,10)}</td>
                <td>${venta.medio_pago}</td>
                <td>
             <button class="button_crud">
                 <img src="/img/image 108.png" alt="" class="eliminar">
             </button>
             <button class="button_crud">
                 <img src="/img/image 109.png" alt="" class="editar">
             </button>
             <button class="button_crud">
                 <img src="/img/image 112.png" alt="" class="ver">
             </button>
         </td>

            `;
            tablaBody.appendChild(fila);
        });
    })
    .catch(error => console.error("Error al obtener los datos:", error));
    
}
const btn_buscar = document.getElementById("btn_cliente");
btn_buscar.addEventListener("click", () => {
    const numero_documento = document.getElementById("cliente_id").value;
    fetch(`https://api-proyecto-3.onrender.com/api/clientes/${numero_documento}`)
             .then(response => response.json()) 
              .then(data => {
             
                document.getElementById("nombre_cliente").value = `${data.nombre} ${data.apellido}`;
                document.getElementById("email_cliente").value = data.correo;
                document.getElementById("telefono_cliente").value = data.celular;
            
             
    
    });
});



const btn_limpiar = document.getElementById("btn_limpiar");
btn_limpiar.addEventListener("click", () => {
    limpiar();
    });


     document.getElementById("ver_registros").addEventListener("click", () => {
         fetch(apiUrl)
             .then(response => response.json()) 
             .then(data => {
                 const tablaBody = document.getElementById("tablaBody");
                 tablaBody.innerHTML = ""
                 data.forEach(venta => {
                     const fila = document.createElement("tr");
                     fila.dataset.id = venta.id;

                     fila.innerHTML = `
                         <td>${venta.id}</td>
                         <td>${venta.cliente_id}</td>
                         <td>${venta.tipo_servicio}</td>
                         <td>${venta.turno}</td>
                        <td>${venta.tipo_sesion}</td>
                         <td>${venta.horario}</td>
                         <td>${venta.estado}</td>
                         <td>${venta.monto_pago}</td>
                         <td>${(venta.fecha_pago).slice(0,10)}</td>
                         <td>${(venta.fecha_registro).slice(0,10)}</td>
                         <td>${venta.medio_pago}</td>
                         <td>
                      <button class="button_crud">
                          <img src="/img/image 108.png" alt="" class="eliminar">
                      </button>
                      <button class="button_crud">
                          <img src="/img/image 109.png" alt="" class="editar">
                      </button>
                      <button class="button_crud">
                          <img src="/img/image 112.png" alt="" class="ver">
                      </button>
                  </td>

                     `;
                     tablaBody.appendChild(fila);
                 });
             })
             .catch(error => console.error("Error al obtener los datos:", error));
     });

   //crear venta

   document.getElementById("btn_registrar").addEventListener("click", () => {
    const nuevaVenta = {
        cliente_id: document.getElementById("cliente_id").value,
        tipo_servicio: document.getElementById("tipo_servicio").value,
        turno: document.getElementById("turno").value,
        tipo_sesion: document.getElementById("tipo_sesion").value,
        horario: document.getElementById("horario").value,
        estado: document.getElementById("estado").value,
        monto_pago: document.getElementById("monto_pago").value,
        fecha_pago: document.getElementById("fecha_pago").value,
        medio_pago: document.getElementById("medio_pago").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaVenta)
    })
    .then(response => response.json())
    .then(data => {
        alert("Venta creada con éxito");
    })
    .catch(error => console.error("Error al crear la venta:", error));
});

// botones editar y eliminar venta

document.getElementById("tablaBody").addEventListener("click", (event) => {
    if (event.target.classList.contains("editar")) {
        const fila = event.target.closest("tr"); // Obtener la fila
        const id = fila.dataset.id; // Obtener el ID de la fila

        // Obtener los valores de las celdas
        const cliente_id = fila.children[1].textContent;
        const tipo_servicio = fila.children[2].textContent;
        const turno = fila.children[3].textContent;
        const tipo_sesion = fila.children[4].textContent;
        const horario = fila.children[5].textContent;
        const estado = fila.children[6].textContent;
        const monto_pago = fila.children[7].textContent;
        const fecha_pago = fila.children[8].textContent;
        const medio_pago = fila.children[10].textContent;


        // Llenar el formulario de edición con los datos actuales

         document.getElementById("cliente_id").value = cliente_id;
         document.getElementById("tipo_servicio").value = tipo_servicio;
         document.getElementById("turno").value = turno;
         document.getElementById("horario").value = horario;
         document.getElementById("estado").value = estado;
         document.getElementById("monto_pago").value = monto_pago;
         document.getElementById("fecha_pago").value = fecha_pago;
         document.getElementById("tipo_sesion").value = tipo_sesion;
         document.getElementById("medio_pago").value = medio_pago;
         document.getElementById("venta_id").textContent = id;
         document.getElementById("btn_actualizar").disabled = false;
         document.getElementById("btn_registrar").disabled = true;





        
        console.log("Editando venta con ID:", id);
    }

    if (event.target.classList.contains("eliminar")) {
        const fila = event.target.closest("tr"); // Obtener la fila
        const id = fila.dataset.id; // Obtener el ID de la fila

        if (confirm(`¿Seguro que deseas eliminar la venta con ID ${id}?`)) {
            fetch(`https://api-proyecto-3.onrender.com/api/ventas/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    fila.remove(); // Eliminar la fila de la tabla
                    alert("Venta eliminada con éxito");
                } else {
                    alert("Error al eliminar la venta");
                }
            })
            .catch(error => console.error("Error al eliminar la venta:", error));
        }
    }
});

 //actualizar registro

 document.getElementById("btn_actualizar").addEventListener("click", () => {
    const venta_id = document.getElementById("venta_id").textContent
    const nuevaData = {
        cliente_id: document.getElementById("cliente_id").value,
        tipo_servicio: document.getElementById("tipo_servicio").value,
        turno: document.getElementById("turno").value,
        tipo_sesion: document.getElementById("tipo_sesion").value,
        horario: document.getElementById("horario").value,
        estado: document.getElementById("estado").value,
        monto_pago: document.getElementById("monto_pago").value,
        fecha_pago: document.getElementById("fecha_pago").value,
        medio_pago: document.getElementById("medio_pago").value,

    };

    fetch(`${apiUrl}/${venta_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Venta actualizada con éxito");
    })
    .catch(error => console.error("Error al crear la venta:", error));

    document.getElementById("btn_actualizar").disabled = true;
         document.getElementById("btn_registrar").disabled = false;
         limpiar();
        obtener_datos();
            
});