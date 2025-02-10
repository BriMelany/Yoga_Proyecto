async function consultar() {
    const documento = document.getElementById("documento").value;
    const anio = document.getElementById("anio").value;

    if (!documento || !anio) {
        alert("Ingrese el N° Documento y el Año");
        return;
    }

    try {
        const url = `https://api-proyecto-3.onrender.com/api/reporte/${documento}/${anio}`;
        
// Esto es para verificar si la respuesta de la API es incorrecta
const proxy = "https://cors-anywhere.herokuapp.com/";

const response = await fetch(proxy + url);

const data = await response.json();
        if (!response.ok) {
            eliminarRepo2(); 
            limpiarCampos(); // Limpia los inputs cuando no hay datos
            if (response.status === 404) {
                alert("No se encontraron registros para este cliente en el año ingresado.");
                return;
            }
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        //const data = await response.json();
        console.log("Datos recibidos:", data);

        if (!data.ventas || data.ventas.length === 0) {
            eliminarRepo2(); 
            limpiarCampos();
            alert("No se encontraron ventas para este cliente en el año ingresado.");
            return;
        }
            eliminarRepo2();
//Si hay ventas para el cliente consultado en ese año se verán en el main las veces que exista venta
        const contenedor = document.querySelector("main");
        data.ventas.forEach(venta => {
            const seccionRepo2 = document.createElement("section");
            seccionRepo2.classList.add("repo2");

            seccionRepo2.innerHTML = `
                <div class="sup">
                    <div class="repoClientes">
                        <h1>Cliente</h1>
                        <textarea readonly>
        Nombre: ${data.cliente.nombre} ${data.cliente.apellido}
        Documento: ${data.cliente.id}
        Correo: ${data.cliente.correo}
        Teléfono: ${data.cliente.telefono}
                        </textarea>
                    </div>
                    <div class="repoVenta">
                        <h1>Venta</h1>
                        <textarea readonly>
        Servicio: ${venta.tipo_servicio}
        Sesión: ${venta.tipo_sesion}
        Turno: ${venta.turno}
        Estado: ${venta.estado}
                        </textarea>
                    </div>
                    <div class="repoPago">
                        <h1>Costo</h1>
                        <textarea readonly>
        Costo: S/. ${Number(venta.costo).toFixed(2)}
        Fecha de Pago: ${venta.fecha_pago ? new Date(venta.fecha_pago).toISOString().split('T')[0] : 'No registrado'}
        Medio de Pago: ${venta.medio_pago || 'No registrado'}
                        </textarea>
                    </div>
                </div>
                <div class="inf">
                    <section class="iFecha">
                        <div class="fr"><h4>Fecha Registro</h4> <img src="../Imagenes/ifech.png" alt=""></div>
                        <div><h4>${venta.fecha_registro ? new Date(venta.fecha_registro).toISOString().split('T')[0] : 'No registrado'}</h4></div>
                    </section>
                    <section class="iFecha">
                        <div class="fr"><h4>N° Registro</h4> <img src="../Imagenes/ireg.png" alt=""></div>
                        <div><h4>${String(venta.numero_registro).padStart(6, '0')}</h4></div>
                    </section>
                </div>
            `;

            contenedor.appendChild(seccionRepo2);
        });

    } catch (error) {

        console.error("Error en la petición:", error.message);
        limpiarCampos();
        alert("Ocurrió un error al obtener los datos.");
    }
}

function eliminarRepo2() {
    const repo2s = document.querySelectorAll(".repo2");
   
    if (repo2s.length > 1) {
        repo2s.forEach((repo, index) => {
            if (index > 0) repo.remove(); 
        });
    }

    const primeraRepo2 = document.querySelector(".repo2");
    if (primeraRepo2) {
        primeraRepo2.style.visibility = "hidden"; 
        primeraRepo2.style.position = "absolute"; 
    }
}

function limpiarCampos() {
    const repo2 = document.querySelector(".repo2");
    if (!repo2) return; 

    repo2.querySelectorAll("textarea").forEach(textarea => {
        textarea.value = ""; 
    });

    document.getElementById("documento").value = "";
    document.getElementById("anio").value = "";
    repo2.querySelector(".iFecha:nth-child(1) h4:last-child").textContent = "00/00/0000 | 00:00:00 hrs";
    repo2.querySelector(".iFecha:nth-child(2) h4:last-child").textContent = "000000";

// Si no encuentra o es vacio la busqueda me retorna mi contenedor inicial sin modificar sus estilos
    repo2.style.visibility = "visible";
    repo2.style.position = "relative"; 
    repo2.style.display = "flex"; 
}

