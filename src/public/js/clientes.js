const apiUrl = 'https://api-proyecto-3.onrender.com/api/clientes';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        const tbody = document.getElementById('clientes-tbody');
        result.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th scope="row">${cliente.id}</th>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.celular}</td>
                <td>${cliente.tipo_cliente}</td>
                <td>${cliente.fecha_registro}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button class="delete-btn" data-id="${cliente.id}">
                        <img src="/img/image108.png" alt="Edit">
                    </button>
                    <button class="edit-btn" data-id="${cliente.id}">
                        <img src="/img/image109.png" alt="Delete">
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        console.log(`Found ${deleteButtons.length} delete buttons.`);


        document.addEventListener('click', function (event) {
            if (event.target.closest('.edit-btn')) {
                const button = event.target.closest('.edit-btn'); 
                const row = button.closest('tr'); 
        
                if (row) {
                    const cell = row.querySelector('td:nth-child(7)'); 
                    if (cell) {
                        const fechaRegistro = cell.textContent.trim();
                        localStorage.setItem('fechaRegistro', fechaRegistro);
                        console.log("Fecha guardada:", fechaRegistro);
                    } else {
                        console.error("No se encontró la celda de fecha.");
                    }
                } else {
                    console.error("No se encontró la fila.");
                }
        
                const clientId = button.getAttribute('data-id'); //
                localStorage.setItem('clientId', clientId);
                window.location.href = `/edit`;
            }
        });
        



        deleteButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                console.log(`Attempting to delete client with ID: ${id}`);
                try {
                    const response = await fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        // Verifica si la respuesta tiene contenido antes de intentar analizarla como JSON
                        const text = await response.text();
                        if (text) {
                            const result = JSON.parse(text);
                            console.log(result.message);
                        } else {
                            console.log('Client deleted successfully, but no message returned.');
                        }
                        // Elimina la fila de la tabla
                        const row = button.closest('tr');
                        row.remove();
                    } else {
                        console.error('Error deleting client:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error deleting client:', error);
                }
            });
        });

        // Manejar la creación de un nuevo cliente al enviar el formulario
        document.getElementById('create-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const selectedCliente = document.querySelector('input[name="cliente"]:checked').value;
            const newCliente = {
                id: document.getElementById('numero').value,
                nombre: document.getElementById('nombres').value,
                apellido: document.getElementById('apellidos').value,
                correo: document.getElementById('correo').value,
                celular: document.getElementById('celular').value,
                direccion: document.getElementById('direccion').value,
                ciudad: document.getElementById('ciudad').value,
                provincia: document.getElementById('provincia').value,
                distrito: document.getElementById('distrito').value,
                pais: document.getElementById('pais').value,
                fecha_registro: new Date().toISOString().split('T')[0],
                tipo_cliente: selectedCliente,
                tipo_documento: document.getElementById('tipo-documento').value,
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCliente)
                });

                const result = await response.json();
                console.log(result.message);

                // Agrega el nuevo cliente a la tabla
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${result.id}</th>
                    <td>${result.nombre}</td>
                    <td>${result.apellido}</td>
                    <td>${result.correo}</td>
                    <td>${result.celular}</td>
                    <td>${result.tipo_cliente}</td>
                    <td>${result.fecha_registro}</td>
                    <td>${result.direccion}</td>
                    <td>
                        <button class="edit-btn" data-id="${result.id}">
                            <img src="/img/image108.png" alt="Edit">
                        </button>
                        <button class="delete-btn" data-id="${result.id}">
                            <img src="/img/image109.png" alt="Delete">
                        </button>
                    </td>
                `;

                document.querySelector('tbody').appendChild(tr);
            } catch (error) {
                console.error('Error creating client:', error);
            }
        });


        document.querySelector('.number-button').addEventListener('click', async function (event) {
            event.preventDefault();
            const id = document.getElementById('numero').value;
            try {
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const cliente = await response.json();
                // Rellenar los inputs del formulario con los datos del cliente
                document.getElementById('nombres').value = cliente.nombre;
                document.getElementById('apellidos').value = cliente.apellido;
                const selectDocumento = document.getElementById('tipo-documento');
                if (selectDocumento) {
                    const option = selectDocumento.querySelector(`option[value="${cliente.tipo_documento}"]`);
                    if (option) {
                        option.selected = true;
                    } else {
                        console.error(`Option with value "${cliente.tipo_documento}" not found.`);
                    }
                }
                document.getElementById('correo').value = cliente.correo;
                document.getElementById('celular').value = cliente.celular;
                document.getElementById('direccion').value = cliente.direccion;
                document.getElementById('ciudad').value = cliente.ciudad;
                document.getElementById('provincia').value = cliente.provincia;
                document.getElementById('distrito').value = cliente.distrito;
                const selectPais = document.getElementById('pais');
                if (selectPais) {
                    const option = selectPais.querySelector(`option[value="${cliente.pais}"]`);
                    if (option) {
                        option.selected = true;
                    } else {
                        console.error(`Option with value "${cliente.pais}" not found.`);
                    }
                }
                const radioCliente = document.querySelector(`input[name="cliente"][value="${cliente.tipo_cliente}"]`);
                if (radioCliente) {
                    radioCliente.checked = true;
                }

            } catch (error) {
                console.error('Error fetching client:', error);
            }
        });

        document.getElementById('clear-button').addEventListener('click', function () {
            document.getElementById('nombres').value = '';
            document.getElementById('apellidos').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('celular').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('numero').value = '';
            document.getElementById('ciudad').value = '';
            document.getElementById('provincia').value = '';
            document.getElementById('distrito').value = '';
            document.querySelectorAll('input[name="cliente"]').forEach(radio => radio.checked = false);
            document.querySelector('select').selectedIndex = 0;
        });

    } catch (error) {
        console.error('Error fetching clients:', error);
    }

});

document.addEventListener('DOMContentLoaded', async function () {
    const fechaRegistro = document.getElementById('fechaRegistro')
    fechaRegistro.textContent = new Date().toISOString().split('T').join(' ').split('Z')[0];

})

