const apiUrl = 'https://api-proyecto-3.onrender.com/api/ventas';


const btn_buscar = document.getElementById("btn_cliente");
btn_buscar.addEventListener("click", () => {
    const documento = document.getElementById("tipo_documento").value;
    const numero_documento = document.getElementById("numero_documento").value;
    const data = {documento, numero_documento};
    console.log(data);
    
    });

const btn_limpiar = document.getElementById("btn_limpiar");
btn_limpiar.addEventListener("click", () => {
    document.getElementById("tipo_servicio").value = '';
    document.getElementById("turno").value = '';
    document.getElementById("horario").value = '';
    document.getElementById("tipo_sesion").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("monto_pago").value = '';
    document.getElementById("fecha_pago").value = '';
    document.getElementById("fecha_registro").value = '';
    document.getElementById("medio_pago").value = '';

    });


     document.getElementById("ver_registros").addEventListener("click", () => {
         fetch(apiUrl)
             .then(response => response.json()) 
             .then(data => {
                 const tablaBody = document.getElementById("tablaBody");
                 tablaBody.innerHTML = ""
                 data.forEach(venta => {
                     const fila = document.createElement("tr");
                     fila.innerHTML = `
                         <td><input type="checkbox">${venta.id}</td>
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
                          <img src="/img/image 108.png" alt="">
                      </button>
                      <button class="button_crud">
                          <img src="/img/image 109.png" alt="">
                      </button>
                      <button class="button_crud">
                          <img src="/img/image 112.png" alt="">
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