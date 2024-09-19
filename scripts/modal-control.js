// Control all modals
// function openModal() {
//     document.getElementById('modal').classList.remove('hidden');
//     document.getElementById('modal').classList.add('flex');
// }

// function closeModal() {
//     document.getElementById('modal').classList.add('hidden');
//     document.getElementById('modal').classList.remove('flex');
// }

// Función para abrir modal para crear o actualizar usuario
function openModal(user = null) {
    const modalTitle = document.querySelector('#modal h1');
    const saveButton = document.querySelector('#modal button[type="submit"]');

    if (user) {
        // Si se pasa un usuario, es para actualizar
        modalTitle.textContent = "EDIT USER";
        saveButton.textContent = "Update User";

        // Rellenar los campos del formulario con los datos del usuario
        document.getElementById('names').value = user.names;
        document.getElementById('lastname').value = user.lastName;
        document.getElementById('document').value = user.documentId; // Si tienes este campo
        document.getElementById('role').value = user.role;
        document.getElementById('area').value = user.area;
        document.getElementById('username').value = user.userName;
        // Passwords empty
        document.getElementById('password').value = "";
        document.getElementById('confirm-password').value = "";

        // Cambia la función del botón para que sea de actualización
        saveButton.setAttribute('onclick', 'updateUser()');
    } else {
        // Si no se pasa un usuario, es para crear
        modalTitle.textContent = "NEW USER";
        saveButton.textContent = "Save User";

        // Limpiar los campos del formulario
        document.getElementById('newUserForm').reset();

        // Cambia la función del botón para que sea de creación
        saveButton.setAttribute('onclick', 'createUser()');
    }

    // Mostrar el modal
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

// Función para cerrar modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('modal').classList.remove('flex');
}
