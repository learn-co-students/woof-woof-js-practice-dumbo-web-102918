document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/pups").then(res => res.json()).then(loadDogsHandler);
  document.getElementById('dog-bar').addEventListener("click", editDog);
  document.getElementById('dog-info').addEventListener("click", toggleGoodDog);
  document.getElementById('good-dog-filter').addEventListener("click", filterDogHandler);

});

function loadDogsHandler(dogs) {
  const divRoot = document.getElementById('dog-bar');

  for(dog of dogs) {
    const spanChild = document.createElement("span");
    spanChild.innerText = `${dog.name}`;
    spanChild.dataset.id = dog.id;
    divRoot.appendChild(spanChild);
  }
}

function editDog(e){
  if(e.target.tagName === "SPAN") {
      const dogID = e.target.dataset.id;
      fetch(`http://localhost:3000/pups/${dogID}`).then(res => res.json()).then(editDogHandler);
  }
}

function editDogHandler(pupObj) {
  const divParent = document.getElementById("dog-info");
  const imgChild = document.createElement("img");
  const h2Child = document.createElement("h2");
  const btnChild = document.createElement("button");

  divParent.innerHTML = "";
  imgChild.src = pupObj.image;
  h2Child.innerText = pupObj.name;
  btnChild.setAttribute("type", "button");
  btnChild.dataset.id = pupObj.id;
  btnChild.dataset.isGoodDog = pupObj.isGoodDog;
  if(pupObj.isGoodDog) btnChild.innerText = "Good Dog!";
  else btnChild.innerText = "Bad Dog!";

  divParent.appendChild(imgChild);
  divParent.appendChild(h2Child);
  divParent.appendChild(btnChild);
}

function toggleGoodDog(e) {
  if(e.target.type === "button"){
    const dogID = e.target.dataset.id;
    const isGoodDogNewValue = !(JSON.parse(e.target.dataset.isGoodDog));
    e.target.innerText = isGoodDogNewValue ? "Good Dog!" : "Bad Dog!";
    e.target.dataset.isGoodDog = isGoodDogNewValue;
    fetch(`http://localhost:3000/pups/${dogID}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isGoodDog: isGoodDogNewValue }) });
  }
}

function filterDogHandler(e) {
  document.getElementById("dog-bar").innerHTML = "";
  if(e.target.innerText === "Filter good dogs: OFF") {
    fetch("http://localhost:3000/pups").then(res => res.json()).then(pups => {
      let pupsFilterOn = pups.filter(pup => pup.isGoodDog === true)
      loadDogsHandler(pupsFilterOn);
    });
    e.target.innerText = "Filter good dogs: ON";
  } else {
    e.target.innerText = "Filter good dogs: OFF"
    fetch("http://localhost:3000/pups").then(res => res.json()).then(loadDogsHandler);
  }
}
