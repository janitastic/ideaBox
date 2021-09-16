var list = [];

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');

saveButton.addEventListener('click', createNewIdea);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
ideaSection.addEventListener('click', function(event) {
  if (event.target.id === 'delete') {
    deleteCard(Number(event.target.parentNode.parentNode.id));
  }
});
ideaSection.addEventListener('click', function(event) {
  if (event.target.id === 'star') {
    favoriteCard(Number(event.target.parentNode.parentNode.id));
  }
});

function checkInputs(){
  var title = titleInput.value;
  var body = bodyInput.value;
  if (!title || !body){
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

checkInputs();

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
  checkInputs()
}

function createNewIdea() {
   var title = titleInput.value;
   var body = bodyInput.value;
   var newIdea = new Idea(title, body);
   newIdea.saveToStorage();
   // list.push(newIdea);
   displayCard()
   clearInputs()
   event.preventDefault()

// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)
}

function displayCard() {
  for(var i = 0; i < localStorage.length; i++){
    var ideaTitle = localStorage[i].title;
    var ideaBody = localStorage[i].body;
    var ideaId = localStorage[i].id;
    var starImg;
    var starAlt
    if (localStorage[i].star) {
      starImg = 'assets/star-active.svg'
      starAlt = 'unfavorite this idea'
    } else {
      starImg = 'assets/star.svg'
      starAlt = 'favorite this idea'
    }
  ideaSection.innerHTML += `
    <article class='idea-cards' id="${ideaId}">
      <header>
        <img src="${starImg}" id="star" alt="${starAlt}">
        <img src="assets/delete.svg" id="delete" alt="delete">
      </header>
      <div class='card-body'>
        <h3>${ideaTitle}</h3>
        <p class='card-text'>${ideaBody}</p>
      </div>
      <footer><img src="assets/comment.svg" alt="comment">comment</footer>
    </article>`
    }
    event.preventDefault();
  }
//   ideaSection.innerHTML = '';
//   for(var i = 0; i < list.length; i++) {
//     var ideaTitle = list[i].title;
//     var ideaBody = list[i].body;
//     var ideaId = list[i].id;
//     var starImg;
//     var starAlt
//     if (list[i].star) {
//       starImg = 'assets/star-active.svg'
//       starAlt = 'unfavorite this idea'
//     } else {
//       starImg = 'assets/star.svg'
//       starAlt = 'favorite this idea'
//     }
//   ideaSection.innerHTML += `
//     <article class='idea-cards' id="${ideaId}">
//       <header>
//         <img src="${starImg}" id="star" alt="${starAlt}">
//         <img src="assets/delete.svg" id="delete" alt="delete">
//       </header>
//       <div class='card-body'>
//         <h3>${ideaTitle}</h3>
//         <p class='card-text'>${ideaBody}</p>
//       </div>
//       <footer><img src="assets/comment.svg" alt="comment">comment</footer>
//     </article>`
//   }
//   console.log(ideaSection)
// }

function deleteCard(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
    }
  }
  displayCard();
}

function favoriteCard(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      // list[i].star = (!list[i].star)
      list[i].updateIdea();
    }
  }
  displayCard();
}


/*
Goals:
the goal is to save the list array into local storage and when the page refreshes, the ideas are still saved.
Input:
we want push our list array into local storage.
Output:
when the user refreshes, the idea card is still saved in local storage.

code:
1. we want to turn saved idea into a string using JSON.stringify() for our local storage to read that array.

2.

?: we call our method withing the createNewIdea function after a new class is made;

*/
