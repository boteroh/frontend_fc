// Función para abrir modal para crear o actualizar usuario

function openModal(user = null, view = false) {
    const modalTitle = document.querySelector('#modal h1');
    const saveButton = document.querySelector('#modal button[type="submit"]');

    if (view && user) {
        modalTitle.textContent = "VIEW USER";
        saveButton.textContent = "OK";

        document.getElementById('names').value = user.names;
        document.getElementById('lastname').value = user.lastName;
        document.getElementById('document').value = user.documentId;
        document.getElementById('role').value = user.role;
        document.getElementById('area').value = user.area;
        document.getElementById('username').value = user.userName;

        document.getElementById('password').value = "*******";
        document.getElementById('confirm-password').value = "*******";

        document.getElementById('names').disabled = true;
        document.getElementById('lastname').disabled = true;
        document.getElementById('document').disabled = true;
        document.getElementById('role').disabled = true;
        document.getElementById('area').disabled = true;
        document.getElementById('username').disabled = true;

        document.getElementById('password').disabled = true;
        document.getElementById('confirm-password').disabled = true;

        saveButton.setAttribute('onclick', 'updateUser()');
    } else {
        
        if (user) {
            modalTitle.textContent = "EDIT USER";
            saveButton.textContent = "Update User";
    
            document.getElementById('names').value = user.names;
            document.getElementById('lastname').value = user.lastName;
            document.getElementById('document').value = user.documentId;
            document.getElementById('role').value = user.role;
            document.getElementById('area').value = user.area;
            document.getElementById('username').value = user.userName;
    
            document.getElementById('password').value = "*******";
            document.getElementById('confirm-password').value = "*******";
    
            saveButton.setAttribute('onclick', 'updateUser()');
        } else {
            
            modalTitle.textContent = "NEW USER";
            saveButton.textContent = "Save User";
    
            document.getElementById('newUserForm').reset();
    
            saveButton.setAttribute('onclick', 'createUser()');
        }
    }

    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('modal').classList.add('flex');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('modal').classList.remove('flex');
}
