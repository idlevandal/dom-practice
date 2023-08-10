import { closeButtonStyles, personNameStyles } from "./styles.js";
import { User } from "./user.js";

// const child = document.querySelector(".child");
const parent = document.querySelector(".parent");
const grandparent = document.querySelector(".grandparent");
const btn = document.querySelector(".btn");
const spinner = document.querySelector(".loader-container");
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const form = document.getElementById('form');

// // PROMISE VERSION
// function getUsers() {
//     showSpinner(true);
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(json => {
//         showSpinner(false);
//         json.forEach(el => addDiv(el.name));
//       });
// }

// // ASYNC VERSION
async function getUsers() {
    showSpinner(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    showSpinner(false);
    json.forEach(el => addDiv(el.name));
}
// JSON Placerholer endpoints.
//   /posts	100 posts
//   /comments	500 comments
//   /albums	100 albums
//   /photos	5000 photos
//   /todos	200 todos
//   /users	10 users

function showSpinner(isSpinnerVisible) {
    isSpinnerVisible ? spinner.style.display = "flex" : spinner.style.display = "none";
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;

    // STORE SINGLE ENTITIES
    // localStorage.setItem('first-name', firstNameValue);
    // localStorage.setItem('last-name', lastNameValue);

    // STORE AS OBJECT
    localStorage.setItem('user', JSON.stringify({firstName: firstNameValue, lastName: lastNameValue}));

    window.location.href = "next.html";
})

btn.addEventListener("click", getUsers);

function addDiv(person) {
    const newBox = document.createElement('div');
    const closeButton = document.createElement('div');
    const personName = document.createElement('div');
    closeButton.innerHTML = 'X';
    personName.innerHTML = person;

    Object.assign(closeButton.style, closeButtonStyles);
    Object.assign(personName.style, personNameStyles);

    newBox.appendChild(closeButton);
    newBox.appendChild(personName);
    closeButton.addEventListener('click', (e) => {
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
    });

    newBox.classList.add("newDiv");
    document.querySelector(".container").appendChild(newBox);
}
