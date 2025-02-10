const apiUrl = 'https://api-proyecto-3.onrender.com/api/clientes';

document.addEventListener('DOMContentLoaded', async function () {

    const clientId = localStorage.getItem('clientId');
    const editNumberElement = document.getElementById('edit-numero')
    
    if (editNumberElement) {
        editNumberElement.value = clientId;
    } else {
        console.log('Elemento con id "edit-numero" no encontrado');
    }

    console.log(localStorage.getItem('fechaRegistro'))
    console.log(localStorage.getItem('clientId'))
    // Verificar que los botones existen
    const editButtons = document.querySelectorAll('.edit-btn');
    console.log(`Found ${editButtons.length} edit buttons.`);

    // Agregar funcionalidad a los botones de editar 
    const id = document.getElementById('edit-numero').value;
    document.getElementById('edit-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const selectedCliente = document.querySelector('input[name="cliente"]:checked').value;
        const updatedCliente = {
            nombre: document.getElementById('edit-nombres').value,
            apellido: document.getElementById('edit-apellidos').value,
            correo: document.getElementById('edit-correo').value,
            celular: document.getElementById('edit-celular').value,
            direccion: document.getElementById('edit-direccion').value,
            ciudad: document.getElementById('edit-ciudad').value,
            provincia: document.getElementById('edit-provincia').value,
            distrito: document.getElementById('edit-distrito').value,
            pais: document.getElementById('edit-pais').value,
            fecha_registro: localStorage.getItem('fechaRegistro'),
            tipo_cliente: selectedCliente,
            tipo_documento: document.getElementById('edit-tipo-documento').value,
        }

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCliente)
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result); // Muestra la respuesta del backend
                if (result.id) {
                    const alerta=document.getElementById('alert-editar')
                    alerta.innerHTML='Cliente actualizado correctamente'
                } else {
                    console.error('La actualización no se realizó correctamente');
                }
            } else {
                console.error(`Error en la actualización. Estado HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
        }
    });



    // Manejar la búsqueda de un cliente al hacer clic en el botón de buscar
    document.querySelector('.buscar-button').addEventListener('click', async function (event) {
        event.preventDefault();
        const id =localStorage.getItem('clientId');
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const cliente = await response.json();
            // Rellenar los inputs del formulario con los datos del cliente
            document.getElementById('edit-nombres').value = cliente.nombre;
            document.getElementById('edit-apellidos').value = cliente.apellido;
            const selectDocumento = document.getElementById('edit-tipo-documento');
            if (selectDocumento) {
                const option = selectDocumento.querySelector(`option[value="${cliente.tipo_documento}"]`);
                if (option) {
                    option.selected = true;
                } else {
                    console.error(`Option with value "${cliente.documento}" not found.`);
                }
            }
            document.getElementById('edit-correo').value = cliente.correo;
            document.getElementById('edit-celular').value = cliente.celular;
            document.getElementById('edit-direccion').value = cliente.direccion;
            document.getElementById('edit-ciudad').value = cliente.ciudad;
            document.getElementById('edit-provincia').value = cliente.provincia;
            document.getElementById('edit-distrito').value = cliente.distrito;
            const selectPais = document.getElementById('edit-pais');
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

    document.getElementById('limpiar-button').addEventListener('click', function () {
        document.getElementById('edit-nombres').value = '';
        document.getElementById('edit-apellidos').value = '';
        document.getElementById('edit-correo').value = '';
        document.getElementById('edit-celular').value = '';
        document.getElementById('edit-direccion').value = '';
        document.getElementById('edit-ciudad').value = '';
        document.getElementById('edit-provincia').value = '';
        document.getElementById('edit-distrito').value = '';
        document.querySelectorAll('input[name="cliente"]').forEach(radio => radio.checked = false);
        document.querySelector('select').selectedIndex = 0;
    });

    document.getElementById('retornar-button').addEventListener('click', function() {
        window.location.href = '/clientes';
    });

});




