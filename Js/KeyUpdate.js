"use strict";
const keyNameField = document.querySelector("#keyName");
const mapIdField = document.querySelector("#mapId");
const keycardRadio = document.querySelector("#Keycard");
const submitBtn = document.querySelector("#btn");
const idField = document.querySelector("#keyId");

let putFetch = (object) => {
  let idValue = idField.value;
  fetch(`http://localhost:8080/key/update/${idValue}`, {
    method: "PUT",
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
  putFetch(newKey);
  console.log(newKey);
};
submitBtn.addEventListener("click", postKey);
