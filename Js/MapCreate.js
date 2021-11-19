"use strict";

let nameField = document.querySelector("#mapName");
const btn = document.querySelector("#submit");
const parentDiv = document.querySelector("#parentDiv");

const postFetch = (object) => {
  fetch("http://localhost:8080/map/create", {
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
let makeCard = (map) => {
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
  p.textContent = `Created Maps Name: ${map.name}`;

  card.appendChild(img);
  card.appendChild(div2);
  div2.appendChild(p);
  parentDiv.appendChild(card);
};
let postMap = () => {
  let mapNameValue = nameField.value;

  let newMap;
  if (mapNameValue == "") {
    return;
  } else {
    newMap = {
      name: mapNameValue,
    };
  }
  postFetch(newMap);
  makeCard(newMap);
};
btn.addEventListener("click", postMap);
