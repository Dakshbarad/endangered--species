const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  //handle submit
  submitHandler();
});

async function submitHandler() {
  var name = document.getElementById("name");
  var scientific_name = document.getElementById("scientific-name");
  var about = document.getElementById("about");
  var image = document.getElementById("image");
  var conservation_status = document.getElementById("conservation-status");
  var number_remaining = document.getElementById("number-remaining");
  var submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", () => {
    var newData = {
      name: name.value,
      scientific_name: scientific_name.value,
      about: about.value,
      image: image.value,
      conservation_status: conservation_status.value,
      number_remaining: number_remaining.value,
    };
    sendApiData(newData);
  });
}

async function sendApiData(newData) {
  console.log("-------------", newData);
  //Put the data
  const response = await fetch(`${API_URL}/api/animals`, {
    method: "POST",
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
  console.log(response.json());
  window.location.href = "/animals";
}
