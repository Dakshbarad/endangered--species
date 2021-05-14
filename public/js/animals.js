const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  //Get and display the list of animals
  displayAnimals();
});

async function displayAnimals() {
  var AnimalsList = await getApiData(`${API_URL}/api/animals`);
  //Get the animallist element
  var displayAnimals = document.getElementById("display-animals");
  displayAnimals.innerHTML = "";
  //Creating the animal div
  var code = ``;
  AnimalsList.forEach((animal) => {
    console.log(animal);
    var status = animal.Conservation_Status === "Endangered" ? "status-2" : "status";
    code += `<a href="${API_URL}/animals/${animal.Id}">
                <div class="animal">
                <h2 class="${status}">${animal.Conservation_Status}</h2>
                <img class="animal-image" src="${animal.Image}" alt="${animal.Name}">
                <div class="data-box">
                <section class="text-section">
                <p class="sub-heading">Name</p>
                <h2 class="name">${animal.Name}</h2>
                <p class="sub-heading">Scientific Name</p>
                <h3 class="scientific-name">${animal.Scientific_Name}</h3>
                </section>
                <section class="btn-section">
                <a href="${API_URL}/animals/edit/${animal.Id}"><button class="edit-btn">edit</button></a>
                <button  onclick={deleteData(${animal.Id})} class="delete-btn">delete</button>
                <section>
                </div>
            </div>
            </a>`;
  });
  displayAnimals.innerHTML = code;
  var status = document.getElementsByName("status");
}

function editData(id) {
  console.log(`Hello id ${id}`);
}

async function deleteData(id) {
  console.log("-------------", id);
  //DELETE the row
  const response = await fetch(`${API_URL}/api/animals/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  window.location.href = "/animals";
}

async function getApiData(url) {
  //Fetching data
  const response = await fetch(url);
  //Converting data to JSON
  var data = await response.json();
  return data;
}
