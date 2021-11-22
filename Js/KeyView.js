"use strict";
const parentDiv = document.querySelector("#parentDiv");
const viewByIdBtn = document.querySelector("#viewById");
const viewAllBtn = document.querySelector("#viewAll");
const idField = document.querySelector("#keyId");

let viewAll = () => {
  fetch("http://localhost:8080/key/viewAll").then((response) => {
    if (response.status !== 200) {
      console.error(`Error status was: ${response.status}`);
      return;
    }
    response
      .json()
      .then((data) => {
        for (let obj of data) {
          console.log(obj);
          makeCard(obj);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
let viewById = () => {
  let idValue = idField.value;
  fetch(`http://localhost:8080/key/viewById/${idValue}`).then((response) => {
    if (response.status !== 202) {
      console.error(`Error status was: ${response.status}`);
      return;
    }
    response
      .json()
      .then((data) => {
        console.log(data);
        makeCard(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
let makeCard = (key) => {
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
  p.textContent = `Key Name: ${key.name}, Is a Keycard: ${key.keycard}, Map Name: ${key.map.name}`;

  card.appendChild(img);
  card.appendChild(div2);
  div2.appendChild(p);
  parentDiv.appendChild(card);
};

viewAllBtn.addEventListener("click", viewAll);
viewByIdBtn.addEventListener("click", viewById);
