const loadComments = function () {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(function (valore) {
      if (valore.ok) {
        return valore.json();
      }
    })
    .then(function (object) {
      const arrayDiCommenti = object;
      console.log(arrayDiCommenti);
      const commentBox = document.getElementById("commentBox");
      console.log(commentBox);
      arrayDiCommenti.forEach((element) => {
        commentBox.innerHTML += `<div class="row">
          <div class="col">
              <h4> ${element.email}</h4>
              <h6>${element.name}</h6>
              <p>${element.body}</p>
          </div>

      </div> `;
      });
    })
    .catch(function (error) {
      console.log("error");
    });
};
loadComments();
