"use strict";
const idField = document.querySelector("#keyId");
const submitBtn = document.querySelector("#submit");

let deleteFetch = () => {
  let idValue = idField.value;
  fetch(`http://localhost:8080/key/delete/${idValue}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status !== 204) {
      console.error(`Status: ${response.status}`);
      return;
    }
    makeCard(idValue);
    console.log(response);
  });
};
let makeCard = (idValue) => {
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
  p.textContent = `Deleted Key : ${idValue}`;

  card.appendChild(img);
  card.appendChild(div2);
  div2.appendChild(p);
  parentDiv.appendChild(card);
};
submitBtn.addEventListener("click", deleteFetch);
