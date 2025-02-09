const apiUrl = 'http://localhost:3000/api/clientes';

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
                <th scope="row">${cliente.documento}</th>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.celular}</td>
                <td>${cliente.tipoCliente}</td>
                <td>${cliente.fechaRegistro}</td>
                <td>${cliente.direccion}</td>
                <td>
                    <button class="edit-btn" data-id="${cliente.id}">
                        <img src="/img/image108.png" alt="Edit">
                    </button>
                    <button class="delete-btn" data-id="${cliente.id}">
                        <img src="/img/image109.png" alt="Delete">
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Agregar funcionalidad a los botones de editar y eliminar
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                document.getElementById('edit-form').addEventListener('submit', async function (event) {
                    event.preventDefault();
                    const selectedCliente = document.querySelector('input[name="cliente"]:checked').value;
                    const updatedCliente = {
                        nombres: document.getElementById('nombres').value,
                        apellidos: document.getElementById('apellidos').value,
                        correo: document.getElementById('correo').value,
                        celular: document.getElementById('celular').value,
                        tipoCliente: selectedCliente,
                        direccion: document.getElementById('direccion').value,
                        fechaRegistro: new Date().toISOString().split('T')[0] // Genera la fecha actual
                    };
                    try {
                        const response = await fetch(`${apiUrl}/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedCliente)
                        });
                        const result = await response.json();
                        console.log(result.message);
                        // Actualiza la tabla con los nuevos datos
                        const row = button.closest('tr');
                        row.querySelector('td:nth-child(2)').textContent = updatedCliente.nombres;
                        row.querySelector('td:nth-child(3)').textContent = updatedCliente.apellidos;
                        row.querySelector('td:nth-child(4)').textContent = updatedCliente.correo;
                        row.querySelector('td:nth-child(5)').textContent = updatedCliente.celular;
                        row.querySelector('td:nth-child(6)').textContent = updatedCliente.tipoCliente;
                        row.querySelector('td:nth-child(7)').textContent = updatedCliente.fechaRegistro;
                        row.querySelector('td:nth-child(8)').textContent = updatedCliente.direccion;
                    } catch (error) {
                        console.error('Error updating client:', error);
                    }
                });
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                try {
                    const response = await fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const result = await response.json();
                    console.log(result.message);
                    // Elimina la fila de la tabla
                    const row = button.closest('tr');
                    row.remove();
                } catch (error) {
                    console.error('Error deleting client:', error);
                }
            });
        });

        // Manejar la creación de un nuevo cliente al enviar el formulario
        document.getElementById('edit-form').addEventListener('submit', async function (event) {
            event.preventDefault();
            const selectedCliente = document.querySelector('input[name="create-cliente"]:checked').value;
            const newCliente = {
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                correo: document.getElementById('correo').value,
                celular: document.getElementById('celular').value,
                tipoCliente: selectedCliente,
                direccion: document.getElementById('direccion').value,
                fechaRegistro: new Date().toISOString().split('T')[0] // Genera la fecha actual
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
                    <th scope="row">${result.documento}</th>
                    <td>${newCliente.nombres}</td>
                    <td>${newCliente.apellidos}</td>
                    <td>${newCliente.correo}</td>
                    <td>${newCliente.celular}</td>
                    <td>${newCliente.tipoCliente}</td>
                    <td>${newCliente.fechaRegistro}</td>
                    <td>${newCliente.direccion}</td>
                    <td>
                        <button class="edit-btn" data-id="${result.documento}">
                            <img src="/img/image108.png" alt="Edit">
                        </button>
                        <button class="delete-btn" data-id="${result.documento}">
                            <img src="/img/image109.png" alt="Delete">
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            } catch (error) {
                console.error('Error creating client:', error);
            }

        });

        // Manejar la búsqueda de un cliente al hacer clic en el botón de buscar
        document.querySelector('.number-button').addEventListener('click', async function (event) {
            event.preventDefault();
            const id= document.getElementById('numero').value;
            try {
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const cliente = await response.json();
                // Rellenar los inputs del formulario con los datos del cliente
                document.getElementById('nombres').value = cliente.nombres;
                document.getElementById('apellidos').value = cliente.apellidos;
                document.getElementById('correo').value = cliente.correo;
                document.getElementById('celular').value = cliente.celular;
                document.getElementById('direccion').value = cliente.direccion;
                document.querySelector(`input[name="cliente"][value="${cliente.tipoCliente}"]`).checked = true;
            } catch (error) {
                console.error('Error fetching client:', error);
            }

        });

        document.getElementById('clear-button').addEventListener('click', function() {
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
    fechaRegistro.textContent = new Date().toISOString().split('T')[0]
})
