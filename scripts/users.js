
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
        tableContent += `
            <tr>
              <td class="p-2.5">${user.documentId}</td>
              <td class="p-2.5">${user.names}</td>
              <td class="p-2.5">${user.area}</td>
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

      console.log(list);

      // Add content to table
      tableBody.innerHTML = tableContent;
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

const createUser = async () => {
  // Obtener los valores de los campos del formulario directamente
  const user = {
      names: document.getElementById('names').value,
      lastname: document.getElementById('lastname').value,
      documentId: document.getElementById('document').value,
      role: document.getElementById('role').value,
      // username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      confirmpassword: document.getElementById('confirm-password').value,
      // Obtener los valores de los checkboxes
      area: Array.from(document.querySelectorAll('input[name^="area"]:checked')).map(cb => cb.nextSibling.textContent.trim())
  };

  // Validar que las contraseñas coinciden
  if (user.password !== user.confirmpassword) {
      alert('The passwords do not match.');
      return;
  }

  try {
      // Realizar la petición fetch
      const response = await fetch('http://localhost:3000/users/create-user', {
          method: 'POST',
          headers: {"Content-Type": "application/json; charset=UTF-8"},
          body: JSON.stringify(user)
      });

      // Obtener la respuesta como JSON
      const result = await response.json();

      if (response.ok) {
          alert(result.msg);
          closeModal();
          listUsers();
      } else {
          console.error('Error adding user:', result.message);
          alert('Error adding user.');
      }
  } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
  }
};

// Añadir el event listener al formulario
document.querySelector('#newUserForm').addEventListener('submit', function(event) {
  event.preventDefault();
  createUser();
});


//-------------------------------//
// <-----> CREATE NEW USER <---->//
//-------------------------------//
// const createUser = async () => {
//   const url = "http://localhost:3000/users/create-user";
//   const newUserForm = document.querySelector( '#newUserForm form' );

//   // Function to handle form submission
//   newUserForm.addEventListener( 'submit', function(event) {
//     event.preventDefault();

//     // Get the form data
//     const userData = new FormData(newUserForm);
//     const data = {
//       names: userData.get( 'names' ),
//       lastname: userData.get( 'lastname' ),
//       documentId: userData.get( 'document' ),
//       role: userData.get( 'role' ),
//       username: userData.get( 'lastname' ),
//       password: userData.get( 'password' ),
//       confirmpassword: userData.get( 'confirm-password' )
//     };

//     // VALIDATE PASSWORD
//     if( data.password !== data.confirmpassword ) {
//       alert( 'The passwords do not match.' );
//       return;
//     }
//   });

//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-type": "application/json; charset=UTF-8" },
//     body: JSON.stringify(data)
//   })
//   .then( response => response.json() )
//   .then( result => {
//     if ( result.success ) {
//       closeModal();
//       listUsers();
//     } else {
//       console.error( 'Error adding user:', result.message );
//       alert( 'Error adding usaer.' );
//     }
//   })
//   .catch( error => {
//     console.error( 'Error adding user:', error );
//     alert( 'Error adding user' );
//   });
//   listUsers();

// };

// const createUser = async () => {
//   const url = "http://localhost:3000/users/create-user";
//   const newUserForm = document.querySelector('#newUserForm');

//   if (!newUserForm) {
//     console.error('Form not found');
//     return;
//   }

//   // Handle form submission
//   newUserForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Get form data
//     const userData = new FormData(newUserForm);
//     const data = {
//       names: userData.get('names'),
//       lastName: userData.get('lastname'),
//       documentId: userData.get('document'),
//       role: userData.get('role'),
//       username: `${userData.get('names')}.${userData.get('lastname')}`,
//       password: userData.get('password'),
//       confirmpassword: userData.get('confirm-password')
//     };

//     // Validate passwords match
//     if (data.password !== data.confirmpassword) {
//       alert('The passwords do not match.');
//       return;
//     }

//     // Make the POST request
//     fetch(url, {
//       method: 'POST',
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//       body: JSON.stringify(data)
//     })

//     .then(response => {
//       console.log(response);  // Verifica el estado de la respuesta
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })

//     .then(result => {
//       if (result.success) {
//         closeModal();
//         listUsers();
//       } else {
//         console.error('Error adding user:', result.message);
//         alert('Error adding user.');
//       }
//     })
//     .catch(error => {
//       console.error('Error adding user:', error);
//       alert('Error adding user');
//     });
//   });
// };

// createUser();

// const createUser = () => {
//   const url = "http://localhost:3000/users/create-user";
//   const newUserForm = document.querySelector('#newUserForm');

//     // Función para abrir la modal
//     // function openModal() {
//     //   document.getElementById('modal').classList.remove('hidden');
//     // }

//     // Función para cerrar la modal
//     function closeModal() {
//         document.getElementById('modal').classList.add('hidden');
//     }

//   if (!newUserForm) {
//     console.error('Form not found');
//     return;
//   }

//   // Handle form submission
//   newUserForm.addEventListener('submit', async function (event) {
//     event.preventDefault();
    
//     // Get form data
//     const userData = new FormData(newUserForm);
//     const data = {
//       names: userData.get('names'),
//       lastName: userData.get('lastname'),
//       documentId: userData.get('document'),
//       role: userData.get('role'),
//       // username: `${userData.get('names')}.${userData.get('lastname')}`,
//       password: userData.get('password'),
//       confirmpassword: userData.get('confirm-password')
//     };

//     // Validate passwords match
//     if (data.password !== data.confirmpassword) {
//       alert('Las contraseñas no coinciden.');
//       return;
//     }

//     try {
//       // Make the POST request
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { "Content-type": "application/json; charset=UTF-8" },
//         body: JSON.stringify(data)
//       });

//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Response body:', result);

//       if (result.success) {
//         alert('Usuario añadido exitosamente.');
//         // Asegúrate de que estas funciones estén definidas
//         if (typeof closeModal === 'function') closeModal();
//         if (typeof listUsers === 'function') listUsers();
//       } else {
//         throw new Error(result.message || 'Error al añadir usuario.');
//       }
//     } catch (error) {
//       console.error('Error al añadir usuario:', error);
//       alert(`Error al añadir usuario: ${error.message}`);
//     }
//   });
// };

// createUser();

// const createUser = async () => {
//   const url = "http://localhost:3000/users/create-user";
//   const newUserForm = document.querySelector('#newUserForm');

//   // Verificar si el formulario existe
//   if (!newUserForm) {
//     console.error('Form not found');  // Si no encuentra el formulario, muestra este mensaje
//     return;
//   } else {
//     console.log('Form found');  // Si lo encuentra, muestra este mensaje
//   }

//   newUserForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const userData = new FormData(newUserForm);

//     const areas = [];
//     const areaInputs = ['area1', 'area2', 'area3', 'area4', 'area5', 'area6'];

//     areaInputs.forEach(areaId => {
//       const areaCheckbox = document.getElementById(areaId);
//       if (areaCheckbox && areaCheckbox.checked) {
//         areas.push(areaCheckbox.name);  // Or areaCheckbox.value
//       }
//     });

//     const data = {
//       names: userData.get('names'),
//       lastName: userData.get('lastname'),
//       documentId: userData.get('document'),
//       role: userData.get('role'),
//       area: areas,
//       password: userData.get('password'),
//       confirmpassword: userData.get('confirm-password')
//     };

//     // Log the data before sending
//     console.log('Data to be sent:', data);

//     if (data.password !== data.confirmpassword) {
//       alert('The passwords do not match.');
//       return;
//     }

//     fetch(url, {
//       method: 'POST',
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//       if (result.msg === "User created succesfully") {
//         closeModal();
//         listUsers();
//       } else {
//         alert('Error adding user: ' + result.msg);
//       }
//     })
//     .catch(error => {
//       console.error('Error adding user:', error);
//       alert('Error adding user');
//     });
//   });
// };


