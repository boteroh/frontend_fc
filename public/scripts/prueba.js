document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#infoUsers tbody');
    const userForm = document.querySelector('#modal form');

    // Función para abrir la modal
    function openModal() {
        document.getElementById('modal').classList.remove('hidden');
    }

    // Función para cerrar la modal
    function closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    // Función para listar usuarios
    const listUsers = () => {
        fetch('http://localhost:3000/users/list-user', {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(res => res.json())
        .then(data => {
            let tableContent = '';
            if (data && data.users) {
                data.users.forEach(user => {
                    tableContent += `
                        <tr>
                          <td class="p-2.5">${user.documentId}</td>
                          <td class="p-2.5">${user.names}</td>
                          <td class="p-2.5">${user.lastname}</td>
                          <td class="p-2.5">${user.role}</td>
                          <td class="p-2.5">${user.username}</td>
                          <td class="p-2.5">
                            <button class="mx-1">
                              <img src="/img/icons8-ver-24.png" alt="Visualizar" class="h-4 w-4">
                            </button>
                            <button class="mx-1">
                              <img src="/img/icons8-editar.svg" alt="Editar" class="h-4 w-4">
                            </button>
                            <button class="mx-1">
                              <img src="/img/icons8-eliminar.svg" alt="Eliminar" class="h-4 w-4">
                            </button>
                          </td>
                        </tr>`;
                });
                tableBody.innerHTML = tableContent;
            } else {
                tableBody.innerHTML = "<tr><td colspan='6'>No hay usuarios disponibles</td></tr>";
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            tableBody.innerHTML = "<tr><td colspan='6'>Error al cargar los usuarios</td></tr>";
        });
    };

    // Función para manejar el envío del formulario
    userForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Obtener los datos del formulario
        const formData = new FormData(userForm);
        const data = {
            names: formData.get('names'),
            lastname: formData.get('lastname'),
            documentId: formData.get('document'),
            role: formData.get('role'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirm-password')
        };

        // Validar contraseñas
        if (data.password !== data.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Enviar los datos al servidor
        fetch('http://localhost:3000/users/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                closeModal();
                listUsers(); // Actualiza la tabla
            } else {
                console.error('Error adding user:', result.message);
                alert('Error al agregar el usuario.');
            }
        })
        .catch(error => {
            console.error('Error adding user:', error);
            alert('Error al agregar el usuario.');
        });
    });

    // Inicializar la lista de usuarios
    listUsers();
});
