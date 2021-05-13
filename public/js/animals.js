const API_URL = "http://localhost:3000/";

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
  AnimalsList.forEach(animal => {
      console.log(animal);
      code += `<div class="animal">
                <img src="${animal.Image}" alt="${animal.Name}">
                <h2>${animal.Name}</h2>
                <h3>${animal.Scientific_Name}</h3>
                <a href="${API_URL}/editAnimal/${animal.id}"><button>edit</button></a>
                <button  onclick={deleteData(${animal.Id})}>delete</button>
            </div>`;

  });
  displayAnimals.innerHTML = code;
}

function editData(id){
    console.log(`Hello id ${id}`);
}

function deleteData(id){

}

async function getApiData(url) {
  //Fetching data
  const response = await fetch(url);
  //Converting data to JSON
  var data = await response.json();
  return data;
}
