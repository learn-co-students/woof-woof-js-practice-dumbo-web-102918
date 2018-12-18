document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pupBar);
  const pupSpan = document.getElementById('dog-bar')
  pupSpan.addEventListener('click', toggleData)
  const pupInfoDiv = document.getElementById('dog-info')
  pupInfoDiv.addEventListener('click', toggleGoodOrBad)
})

function toggleGoodOrBad(event) {
  const dogId = event.target.dataset.id
  let isGoodDogValue = event.target.innerText === "Good Dog" ? true : false
  // event.target.innerText = !isGoodDogValue ? 'Good Dog' : 'Bad Dog'
  fetch(`http://localhost:3000/pups/${ dogId }`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: !isGoodDogValue
    })
  })
  .then(res => res.json())
  .then(pupsInfo)
}

function pupBar(pupsData) {
  const pupSpan = document.getElementById('dog-bar')
  pupsData.forEach(pup => {
    const span = document.createElement('span')
    span.dataset.id = pup.id
    span.innerText = pup.name
    pupSpan.appendChild(span)
  })
}

function toggleData(event) {
  if (event.target.tagName === 'SPAN') {
    const dogId = event.target.dataset.id
    fetch(`http://localhost:3000/pups/${ dogId }`)
    .then(res => res.json())
    .then(pupsInfo);
  }
}

function pupsInfo(pupData) {
  const pupCollection = document.getElementById('dog-info')
  pupCollection.innerHTML = ''
  const image = document.createElement('img')
  const header = document.createElement('h2')
  const button = document.createElement('button')
  button.dataset.id = pupData.id
  header.innerText = pupData.name
  image.src = pupData.image
  if (pupData.isGoodDog === true) {
    button.innerText = 'Good Dog'
  }else {
    button.innerText = 'Bad Dog'
  }
  pupCollection.appendChild(header)
  pupCollection.appendChild(image)
  pupCollection.appendChild(button)

}
