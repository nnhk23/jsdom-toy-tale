let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', createToy)



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
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


const url = 'http://localhost:3000/toys'

function getToys() {
  return fetch(url)
    .then(resp => resp.json())
    .then(toys => {
      console.log(toys)
      toys.forEach(toy => {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const image = document.createElement('img')
        const p = document.createElement('p')
        const btnLike = document.createElement('button')
        bigDiv = document.querySelector('#toy-collection')

        div.className = 'card'
        
        h2.innerText = toy.name

        image.src = toy.image
        image.className = 'toy-avatar'

        p.innerText = `${toy.likes} Likes`

        btnLike.className = 'like-btn'
        btnLike.innerText = "Like <3"
        btnLike.addEventListener('click', (e) => likeIncrement(e, toy, p))

        // div.innerHTML += h2.outerHTML + image.outerHTML + p.outerHTML + btnLike.outerHTML

        div.append(h2, image, p, btnLike)

        bigDiv.appendChild(div)

        // console.log(bigDiv)
        // image.setAttribute('src', toy['image'])
      })
    }
    )
}

function createToy(e) {
  e.preventDefault()
  const name = e.target.name.value
  const pic = e.target.image.value
  console.log(pic)

  const toyObj = {
    name: name,
    image: pic,
    likes: 0
  }

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then((toyObj) => {
    getToys()
  })
}

function likeIncrement(e, toy, p){
  // e.preventDefault()
  const id = toy.id

  fetch(url + `/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: toy.likes += 1})
  })
  .then(resp => resp.json())
  .then(toy => {
    p.innerText = `${toy.likes} Likes`
  })
}

