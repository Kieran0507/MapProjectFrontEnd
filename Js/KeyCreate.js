"use strict";
const keyNameField = document.querySelector("#keyName");
const mapIdField = document.querySelector("#mapId");
const keycardRadio = document.querySelector("#Keycard");
const submitBtn = document.querySelector("#btn");

let viewByMapId = async function (id) {
  try {
    const response = await fetch(`http://localhost:8080/map/viewById/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse.name;
  } catch (error) {
    console.error(`Error status was: ${error}`);
  }

  // .then((response) => {
  //     if (response.status !== 202) {
  //       console.error(`Error status was: ${response.status}`);
  //       return;
  //     }
  //     response
  //       .json()
  //       .then((data) => {
  //         console.log(data.name);

  //         response(data.name);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
};

const postFetch = (object) => {
  fetch("http://localhost:8080/key/create", {
    method: "POST",
    headers: {
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(object),
  }).then((response) => {
    if (response.status !== 201) {
      console.error(`Status: ${response.status}`);
      return;
    }
    console.log(response);
  });
};
let makeCard = async function (key) {
  let mapName = await viewByMapId(key.map.id);

  console.log(mapName);
  let card = document.createElement("div");
  card.className = "card col-3";
  card.style = "width: 18rem";

  let img = document.createElement("img");
  img.src = "../resources/TheLabBanner.png";
  img.className = "card-img-top";
  img.alt = "The Lab Banner";

  let div2 = document.createElement("div");
  div2.className = "card-body";

  let p = document.createElement("p");
  p.className = "card-text";
  p.textContent = `Created Keys Name: ${key.name} Is a keycard : ${key.keycard} 
  Belonging to map ${mapName}`;

  card.appendChild(img);
  card.appendChild(div2);
  div2.appendChild(p);
  parentDiv.appendChild(card);
};
let postKey = () => {
  let keyNameValue = keyNameField.value;
  let MapIdValue = mapIdField.value;
  let keycardValue = keycardRadio.checked;
  let newKey;
  if (keycardValue == true) {
    newKey = {
      name: keyNameValue,
      keycard: true,
      map: {
        id: MapIdValue,
      },
    };
  } else {
    newKey = {
      name: keyNameValue,
      keycard: false,
      map: {
        id: MapIdValue,
      },
    };
  }
  makeCard(newKey);
  postFetch(newKey);
  console.log(newKey);
};

submitBtn.addEventListener("click", postKey);
