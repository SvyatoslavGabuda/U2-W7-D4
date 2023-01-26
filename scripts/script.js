// https://striveschool-api.herokuapp.com/books

const createCards = async function () {
  try {
    const res = await fetch("https://striveschool-api.herokuapp.com/books");
    if (res.ok) {
      const libri = await res.json();
      console.log(libri);
      const contenitoreCard = document.getElementById("contenitoreCard");

      //   libri.forEach((libro) => {
      //     contenitoreCard.innerHTML += `<div class="col-3">
      //     <div class="card">
      //       <img
      //         src=${libro.img}
      //         class="card-img-top"
      //         alt="..."
      //       />
      //       <div class="card-body">
      //         <h5 class="card-title">${libro.tile}</h5>
      //         <p class="card-text">
      //           ${libro.category} price: ${libro.price}
      //         </p>
      //         <a href="#" class="btn btn-primary">Go somewhere</a>
      //       </div>
      //     </div>
      //   </div>`;
      //   });
      const preferiti = [];
      libri.forEach((libro) => {
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
        const prefBtn = document.createElement("button");
        prefBtn.innerHTML = `<i class="bi bi-star"></i>`;

        prefBtn.onclick = function () {
          preferiti.push(libro);
          localStorage.setItem("preferiti", JSON.stringify(preferiti));
          console.log(preferiti);
          prefBtn.style.backgroundColor = "orangered";

          prefBtn.setAttribute("disabled", true);
        };

        cardBody.appendChild(title);
        cardBody.appendChild(paragraf);
        cardBody.appendChild(btn);
        cardBody.appendChild(prefBtn);
        paragraf.appendChild(price);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        contenitoreCard.appendChild(col);
      });

      // Funzione per paginazione -------------------------------------------------------------------
      const createPagination = function () {
        const contenitoreBtn = document.getElementById("contenitoreBtn");
        const allMyBooks = document.querySelectorAll(".myBook");

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("nextBtn");
        nextBtn.innerText = ">>>";
        const previousBtn = document.createElement("button");
        previousBtn.classList.add("previousBtn");
        previousBtn.innerText = "<<<";

        let maxElementsXPage = 4;
        const pageTotalNum = Math.ceil(libri.length / maxElementsXPage);
        let currentPage = 1;

        const createBtnPagination = function () {
          const colPrevBtn = document.createElement("div");
          colPrevBtn.classList.add("col");
          colPrevBtn.appendChild(previousBtn);
          contenitoreBtn.appendChild(colPrevBtn);

          for (let i = 1; i <= pageTotalNum; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.classList.add("numerazionePagina");
            btn.style.width = "100%";

            const col = document.createElement("div");
            col.classList.add("col");
            col.appendChild(btn);
            col.style.padding = "0";
            col.style.width = "100%";
            contenitoreBtn.appendChild(col);
          }
          const colNextBtn = document.createElement("div");
          colNextBtn.classList.add("col");
          colNextBtn.appendChild(nextBtn);
          contenitoreBtn.appendChild(colNextBtn);
        };

        const setPage = function (pageNumber) {
          currentPage = pageNumber;
          const start = (pageNumber - 1) * maxElementsXPage;
          const end = pageNumber * maxElementsXPage;

          allMyBooks.forEach((book, index) => {
            book.classList.add("hide");
            if (index >= start && index < end) {
              book.classList.remove("hide");
            }
          });
          if (currentPage === 1) {
            previousBtn.setAttribute("disabled", true);
          } else {
            previousBtn.removeAttribute("disabled");
          }
          if (currentPage === pageTotalNum) {
            nextBtn.setAttribute("disabled", true);
          } else {
            nextBtn.removeAttribute("disabled");
          }
        };
        createBtnPagination();
        setPage(1);
        previousBtn.addEventListener("click", () => {
          setPage(currentPage - 1);
        });

        nextBtn.addEventListener("click", () => {
          setPage(currentPage + 1);
        });
        const bottoni = document.querySelectorAll(".numerazionePagina");

        bottoni.forEach((btn) => {
          const pageIndex = Number(btn.innerText);
          if (pageIndex) {
            btn.addEventListener("click", () => {
              setPage(pageIndex);
            });
          }
        });
      };
      createPagination();
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = createCards;
