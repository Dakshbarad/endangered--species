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

async function presentData(data) {
  console.log(data);
  var name = document.getElementById("name");
  var scientific_name = document.getElementById("scientific-name");
  var about = document.getElementById("about");
  var image = document.getElementById("image");
  var conservation_status = document.getElementById("conservation-status");
  var number_remaining = document.getElementById("number-remaining");
  var submitBtn = document.getElementById("submit-btn");

  name.value = data.Name;
  scientific_name.value = data.Scientific_Name;
  about.value = data.About;
  image.value = data.Image;
  conservation_status.value = data.Conservation_Status;
  number_remaining.value = data.Number_Remaining;

  submitBtn.addEventListener("click", () => {
    var newData = {
      name: name.value,
      scientific_name: scientific_name.value,
      about: about.value,
      image: image.value,
      conservation_status: conservation_status.value,
      number_remaining: number_remaining.value,
    };
    if (
      name.value &&
      scientific_name.value &&
      about.value &&
      image.value &&
      conservation_status.value &&
      number_remaining.value
    ) {
      sendApiData(newData);
    } else {
      alert("Fill all values.");
    }
  });
}

async function getApiData(url) {
  //Fetching data
  const response = await fetch(url);
  //Converting data to JSON
  var data = await response.json();
  return data;
}

async function sendApiData(newData) {
  console.log("-------------", newData);
  //Put the data
  const response = await fetch(`${API_URL}/api/animals/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  window.location.href = "/animals";
}
