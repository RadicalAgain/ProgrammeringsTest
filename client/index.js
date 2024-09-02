/*
Adrian Alagic
Programmeringstest@CustomerFirst
Date: 9/2/2024
*/
import { fetchAllUserData, fetchUserData } from './requests.js';


//global ID for row onClick
let globalId = 0;

//Loading all users at startup
window.onload = displayAllUserData;

window.onclick = (e) => {

    if (e.target == modal) {
      modal.style.display = "none";
    }

  }



//Elements
const modal = document.querySelector('.userModal');
const modalBody = document.querySelector('.modalBody');



/*
Displays each user by visually appending them to a table
*/
async function displayAllUserData() {

    const response = await fetchAllUserData(); 
    const tableBody = document.querySelector('.tableBody');     
    response.data.forEach(user => {
                appendUserToTable(user, tableBody)
            });

}



/*
Creates a row of user information and appends it to the existing table tableBody
Parameters: user, tableBody, user is an object with first name, last name and tableBody is the table
*/
function appendUserToTable(user, tableBody) {

    const row = document.createElement('tr');
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = user.first_name;
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = user.last_name;
    row.appendChild(lastNameCell);

    addRowUserPopupOnClick(row, user);
    tableBody.appendChild(row);

}



/*
Displays a modal with all of the user's information (name, last name, email, avatar)
Parameters: user, a user object with first name, last name, email, and avatar
*/
function displayModal(user) {

    modal.style.display = 'block';
    modalBody.innerHTML = '';
    const container = document.createElement('div');

    const firstNameElement = document.createElement('p');
    firstNameElement.innerHTML = `<strong>First Name:</strong> ${user.first_name}`;
    container.appendChild(firstNameElement);

    const lastNameElement = document.createElement('p');
    lastNameElement.innerHTML = `<strong>Last Name:</strong> ${user.last_name}`;
    container.appendChild(lastNameElement);

    const emailElement = document.createElement('p');
    emailElement.innerHTML = `<strong>Email:</strong> ${user.email}`;
    container.appendChild(emailElement);

    const avatarElement = document.createElement('p');
    const avatarImg = document.createElement('img');
    avatarImg.src = user.avatar;
    avatarImg.width = 150;
    avatarElement.appendChild(avatarImg);
    container.appendChild(avatarElement);

    modalBody.appendChild(container);
  
}


/*
Adds an event listener to each row in the table that opens the modal when clicked
Paramaters: row and user, row is the table row, user is the object information
*/
function addRowUserPopupOnClick(row, user) {

    row.onclick = async () => {
        globalId = user.id
        console.log(globalId)
        const userData = await fetchUserData(globalId)
        displayModal(userData.data);
    };

}
