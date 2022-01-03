import {programmers as members} from "./data.js"

const USERS = "users";
let programmers = getFromStorage(USERS) || saveToStorage(members);
function list() {
  let container = document.querySelector(".container");
  container.innerHTML += `<div class="card" class="new-add person">
  <img src="/img/newUser.jpg" alt="person-icon">
  <div class="btn">
  <a href="#addItem" class="biolink"><button>New Person</button></a>
  </div>
  </div>`
  
  programmers.forEach((programmer) => {
    container.innerHTML += `<div class="card">
        <img src="/img/${
          programmer.imagePath || "./img/person-icon.jpg"
        }" alt="person-icon">
        <div class = "bio">
        <span className="firstName">${programmer.firstName}</span>
        <span className="lastName">${programmer.lastName}</span>
         </div>
          <div class="btn">
          <a href="#bioPage?=${
            programmer.id
          }" class="biolink"><button>Read More</button></a>
          </div>
          </div>`;
  });
}

list();

document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let formElements = document.querySelector(".new-member").elements;

    let newUserCV = {
      imagePath: "/newUser.jpg",
      id: new Date().valueOf(),
    };

    console.log(formElements);
    for (let index = 0; index < formElements.length; index++) {
      newUserCV[formElements[index].name] = formElements[index].value;
    }

    programmers.push(newUserCV);
    saveToStorage(programmers);
    window.location.hash = "";
  });

function saveToStorage(data) {
  let stringifiedData = JSON.stringify(data);
  window.localStorage.setItem(USERS, stringifiedData);

  return data;
}

function getFromStorage(key) {
  let dataFromStorage = window.localStorage.getItem(key);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
}

window.addEventListener("load", () => {
  console.log(window.location);
});
window.addEventListener("load", function () {
  console.log("LOAD eventlistener called");
});
window.addEventListener("hashchange", function () {
  const wLocation = this.window.location;
  switch (wLocation.pathname) {
    case "/index.html":
      let cvList = document.querySelector("#cv-list");
      let cvPage = document.querySelector("#cv-page");
      let addNew = document.querySelector("#add-new");
      let hash = window.location.hash;

      switch (hash) {
        case "":
          cvList.classList.remove("hidden");
          cvPage.classList.add("hidden");
          addNew.classList.add("hidden");
          break;
        case "#addItem":
          cvList.classList.add("hidden");
          cvPage.classList.add("hidden");
          addNew.classList.remove("hidden");
          break;
        default:
          if (hash.includes("#bioPage")) {
            cvList.classList.add("hidden");
            cvPage.classList.remove("hidden");
            addNew.classList.add("hidden");
            let id = hash.split("=")[1];
            console.log(hash,id)
            let foundUser = findUserById(id)
            addUserData(foundUser);

          }
          break;
      }
      break;
  }

});
function findUserById(id){
  console.log("programmers = ",programmers)
let found = programmers.find(function(programmer){
return programmer.id.toString() === id.toString();
});
return found;
}


function addUserData(programmer) {
  console.log("personalData===", programmer);
  document.querySelector(".firstName").innerHTML = programmer.firstName;
  document.querySelector(".lastName").innerHTML = programmer.lastName;
  document.querySelector(".email").innerHTML = programmer.email;
  document.querySelector(".educationName ").innerHTML = programmer.education;
  document.querySelector(".companyName ").innerHTML =programmer.experience || "";
  document.querySelector(".imgImage").setAttribute("src","/img/" + programmer.imagePath || "./img/person-icon.jpg");
  document.querySelector(".phone label").innerHTML = programmer.phone || "";
}