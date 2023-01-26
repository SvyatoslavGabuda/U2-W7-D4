const caricaPreferiti = function () {
  if (localStorage.getItem("preferiti")) {
    libriPreferiti = JSON.parse(localStorage.getItem("preferiti"));
    console.log(libriPreferiti);
    const contenitorePreferiti = document.getElementById(
      "contenitorePreferiti"
    );
    libriPreferiti.forEach((libro) => {
      const col = document.createElement("div");
      col.classList.add("col-12");
      col.classList.add("col-sm-6");
      col.classList.add("col-md-3");
      col.classList.add("col-lg-3");
      col.classList.add("myBook");

      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("align-items-stretch");
      card.style.height = "100%";

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.setAttribute("src", libro.img);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.classList.add("d-flex");
      cardBody.classList.add("flex-column");
      cardBody.classList.add("justify-content-between");

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerText = libro.title;

      const paragraf = document.createElement("p");
      paragraf.classList.add("card-text");
      paragraf.innerText = `Genere: ${libro.category}`;

      const price = document.createElement("span");
      price.innerText = ` ${libro.price} $`;

      const nascondi = function () {
        btn.parentElement.parentElement.classList.add("d-none");
        console.log(btn.parentElement.parentElement);
      };

      const btn = document.createElement("button");
      btn.innerText = "SKIP";
      btn.addEventListener("click", nascondi);
      //   const prefBtn = document.createElement("button");
      //   prefBtn.innerHTML = `<i class="bi bi-star"></i>`;

      //   prefBtn.onclick = function () {
      //     preferiti.push(libro);
      //     localStorage.setItem("preferiti", JSON.stringify(preferiti));
      //     console.log(preferiti);
      //   };

      cardBody.appendChild(title);
      cardBody.appendChild(paragraf);
      cardBody.appendChild(btn);
      //   cardBody.appendChild(prefBtn);
      paragraf.appendChild(price);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      contenitorePreferiti.appendChild(col);
    });
  } else {
    console.log("non ci sono preferiti");
  }
};

const loadBtn = document.getElementById("load");
loadBtn.onclick = caricaPreferiti;
window.onload = caricaPreferiti;

const clearBtn = document.getElementById("clear");

const clear = function () {
  localStorage.removeItem("preferiti");
  contenitorePreferiti.remove();
};

clearBtn.onclick = clear;
