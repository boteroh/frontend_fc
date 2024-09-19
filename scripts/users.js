
//-------------------------------//
// <-----> LIST ALL USERS <----->//
//-------------------------------//
const listUsers = async () => {
  const url = "http://localhost:3000/users/list-user";
  const tableBody = document.querySelector('#infoUsers tbody');
  let tableContent = '';

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })

  .then((res) => {
    console.log(res);
    // Verify if the response is of JSON type
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      throw new Error(`Respuesta inesperada, tipo de contenido: ${contentType}`);
    }
  })

  .then(function(data) {
    console.log(data);
    // Verify that the 'users' property exists
    if (data && data.users) {
      let list = data.users;

      // Iterate through the users and generate the table rows
      list.map(function(user) {
        console.log('user object', user);

        tableContent += `
            <tr>
              <td class="p-2.5">${user.documentId}</td>
              <td class="p-2.5">${user.names}</td>
              <td class="p-2.5">${user.area}</td>
              <td class="p-2.5">${user.role}</td>
              <td class="p-2.5">${user.userName ? user.userName : 'No username available'}</td>
              <td class="p-2.5">
                <button class="mx-1 view-btn" data-id="${user.documentId}"">
                  <img src="/img/icons8-ver-24.png" alt="View" class="h-4 w-4">
                </button>
                <button class="mx-1 edit-btn" data-id="${user.documentId}">
                  <img src="/img/icons8-editar.svg" alt="Edit" class="h-4 w-4">
                </button>
                <button class="mx-1 delete-btn" data-id="${user.documentId}">
                  <img src="/img/icons8-eliminar.svg" alt="delete" class="h-4 w-4">
                </button>
              </td>
            </tr>`;
      });

      // Add content to table
      tableBody.innerHTML = tableContent;

      // Add event listeners to the edit buttons after the table has been populated
      const editButtons = document.querySelectorAll( '.edit-btn' );
      editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const userID = event.currentTarget.getAttribute( 'data-id' );
          updateUser(userID);
        });
      });

    } else {
      // Control if not found users
      tableBody.innerHTML = "<tr><td colspan='5'>No hay usuarios disponibles</td></tr>";
    }
  })

  .catch(function(error) {
    console.error('Error al obtener los usuarios:', error);
    tableBody.innerHTML = "<tr><td colspan='5'>Error al cargar los usuarios</td></tr>";
  });
};

document.addEventListener('DOMContentLoaded', listUsers);

//---------------------------------------------------------------------------------------------------------------------------//

//-------------------------------//
// <-----> CREATE NEW USER <---->//
//-------------------------------//
const createUser = async () => {
  const url = "http://localhost:3000/users/create-user"

  const names = document.getElementById('names').value;
  const lastName = document.getElementById('lastname').value;
  const userName = `${names}.${lastName}` 
  document.getElementById('username').value = userName.toLowerCase();
  
  const user = {
    documentId: document.getElementById('document').value,
    names: names,
    lastName: lastName,
    area: document.getElementById('area').value,
    role: document.getElementById('role').value,
    userName: userName,
    password: document.getElementById('password').value,
    confirmpassword: document.getElementById('confirm-password').value,
  }
  // alert(user.username); // Verifica qué dato está devolviendo el objeto
  fetch(url, {
    method: 'POST',
    momde: 'cors',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then((resp) => resp.json())
  .then(json => {
    alert(json.msg)
  })
};

// Update input Username
document.getElementById('lastname').addEventListener('input', () => {
  const names = document.getElementById('names').value;
  const lastName = document.getElementById('lastname').value;
  
  // Concat and update input username
  const userName = `${names}.${lastName}`; 
  document.getElementById('username').value = userName.toLowerCase();
});

//-------------------------------//
// <-------> UPDATE USER <------>//
//-------------------------------//
const updateUser = async() => {
  const url = "http://localhost:3000/users/update"
  const user = {
    names: document.getElementById( 'names' ).value,
    lastName: document.getElementById( 'lastname' ).value,
    area: document.getElementById( 'area' ).value,
    role: document.getElementById( 'role' ).value,
    userName: document.getElementById( 'username' ).value,
  }
  fetch(url, {
    method: 'PUT',
    momde: 'cors',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then((resp) => resp.json())
  .then(json => {
    alert(json.msg)
  });
};