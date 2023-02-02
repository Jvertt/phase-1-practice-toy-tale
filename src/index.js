let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = toyFormContainer.querySelectorAll(".input-text")
  fetch('http://localhost:3000/toys', { 
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": inputs[0].value,
      "image": inputs[1].value,
      "likes": 0
    })
  })
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function getToy(toys){
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then (toys => {
  const toyCollection = document.querySelector("#toy-collection");
  console.log(toyCollection)
  toys.forEach(toy => {
    const toyCard = document.createElement("div");
    toyCard.classList.add("card");
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class = "toy-avatar"
    <p>${toy.likes} likes</p>
    <button class ="like-btn" id="${toy.id}">like</button>
    `;
    toyCollection.appendChild(toyCard);
  })
  const likeButtons = document.querySelectorAll(".like-btn")
console.log(likeButtons)
likeButtons.forEach(likeButton => {
console.log(likeButton.previousSibling.previousSibling.previousSibling.textContent)
let likes = parseInt(likeButton.previousSibling.previousSibling.previousSibling.textContent)
likeButton.previousSibling.previousSibling.previousSibling = `${likes++} likes`
  likeButton.addEventListener("click", function(){
    fetch(`http://localhost:3000/toys/${likeButton.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
    })
})
})
})
})
}
getToy();


