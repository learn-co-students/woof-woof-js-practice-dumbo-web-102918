document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(renderPups)
  const pupCollection = document.getElementById('dog-info')
})



function renderPups(pupsData) {
  pupsData.forEach(pup =>{
    const pupCollection = document.getElementById('dog-info')
    const div = document.createElement('div')
    div.dataset.id = pup.id
    const header = document.createElement('h2')
    const image = document.createElement('img')
    const button = document.createElement('button')
    header.innerText = pup.name
    image.src = pup.image
    if (pup.isGoodDog === true) {
      button.innerText = 'Good Dog'
    }else {
      button.innerText = 'Bad Dog'
    }
    div.appendChild(header)
    div.appendChild(image)
    div.appendChild(button)
    pupCollection.appendChild(div)
  })
}
