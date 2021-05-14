const API_URL = "http://localhost:3000";

var currentUrl = window.location.href;
var strings = currentUrl.split("/");
var id = parseInt(strings[strings.length - 1]);

document.addEventListener("DOMContentLoaded", () => {
  //Get and display the list of animals
  setValues();
});

async function setValues() {
  //Fetch the data of the animal
  var animalData = await getApiData(`${API_URL}/api/animals/${id}`);
  //Present the data
  presentData(animalData);
}

function presentData(data) {
  var displayBox = document.getElementById("display-box");
  var status =
    data.Conservation_Status === "Endangered" ? "status-2" : "status";
  var code = `<section id="header">
                    <a href="/animals"><h3><- Go Back</h3></a>
                </section>
                <section id="animal">
                    <img class="animal-image" src="${data.Image}" alt="${data.Name}" />
                    <div class="data-box">
                    <section class="text-section">
                        <h2 class="${status}">${data.Conservation_Status}</h2>
                        <p class="sub-heading">Name</p>
                        <h2 class="name">${data.Name}</h2>
                        <p class="sub-heading">Scientific Name</p>
                        <h3 class="scientific-name">${data.Scientific_Name}</h3>
                        <p class="sub-heading">Number Remaining</p>
                        <h3 class="remaining">${data.Number_Remaining}</h3>
                        <p class="sub-heading">About</p>
                        <h3 class="about">${data.About}</h3>
                    </section>
                    </div>
                </section>`;
  displayBox.innerHTML = code;
}

async function getApiData(url) {
  //Fetching data
  const response = await fetch(url);
  //Converting data to JSON
  var data = await response.json();
  return data;
}
