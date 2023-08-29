let sections = ["act", "ud", "man"];
let carrouselLinks = ["quick1", "quick2", "quick3"];

let carrousel = document.getElementById("carCont");
let views = carrousel.querySelectorAll(".carousel-item");

let recentPublications = document.getElementById("recentPublications");

let articles = Array.from(document.querySelectorAll('article'));

let actArticles = document
  .getElementById(sections[0])
  .querySelectorAll(".blog-post");
let udArticles = document
  .getElementById(sections[1])
  .querySelectorAll(".blog-post");
let manArticles = document
  .getElementById(sections[2])
  .querySelectorAll(".blog-post");

function init() {
  document.getElementById("ud").style.display = "none";
  document.getElementById("man").style.display = "none";

  fillCarrousel();
  fillRecentArticles();
  makeResponsive();
  responsiveImg()
}

function spanishDate(date) {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias_semana[date.getDay()] + ', ' + date.getDate() + ' de ' + meses[date.getMonth()] + ' de ' + date.getUTCFullYear();
}

function fillRecentArticles() {
  const ul = recentPublications.querySelector("ul");
  const maxArticles = Math.min(articles.length, 10);
  articles.sort(function (a, b) {
    var ordenA = new Date(a.getAttribute("date"));
    var ordenB = new Date(b.getAttribute("date"));
    return ordenA - ordenB;
  });

  for (let i = 0; i < maxArticles; i++) {
    const article = articles[i];
    const id = article.getAttribute('id');
    const title = article.querySelector(".header").textContent;
    const date = new Date(article.getAttribute("date"));
    const imageSrc = article.querySelector("img").getAttribute("src");
    const li = document.createElement("li");
    let esDate = spanishDate(date)

    li.innerHTML = `
            <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" 
            href="#${id}">
                <img class="bd-placeholder-img" src="${imageSrc}" style="width: 150px; height: 150px;" alt="Artículo">
                <div class="col-lg-8">
                    <h6 class="mb-0">${title}</h6>
                    <small class="text-body-secondary">${esDate}</small>
                </div>
            </a>
        `;
    ul.appendChild(li);
  }
}

function fillCarrousel() {
  const categories = [actArticles, udArticles, manArticles];
  const linkIds = carrouselLinks;

  for (let x = 0; x < 3; x++) {
    const randomIndex = randomArt(categories[x]);
    const article = categories[x][randomIndex];

    views[x].querySelector("h1").innerHTML =
      article.querySelector(".header").innerHTML;
    views[x].querySelector(".exp").innerHTML = characterLimiter(
      article.querySelector(".sum").innerHTML
    );

    document
      .getElementById(linkIds[x])
      .setAttribute("href", "#" + article.getAttribute("id"));
  }
}

function displaySection(id) {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] === id) {
      document.getElementById(sections[i]).style.display = "inherit";
    } else {
      document.getElementById(sections[i]).style.display = "none";
    }
  }
  let anchors = document.getElementById("navbar").querySelectorAll("a");
  for (var anchor of anchors) {
    if (anchor.href.includes(id)) {
      anchor.classList.remove("active");
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  }
}

function randomArt(artSection) {
  let artNumber = Math.random();
  return parseInt(Math.floor(artNumber * artSection.length));
}

function characterLimiter(text) {
  if (text.length > 100) {
    return text.substring(0, 100) + " ...";
  }
  return text;
}

function knowSectionFromId(id) {
  if (id.includes('act')) {
    return 'act';
  } else if (id.includes('ud')) {
    return 'ud';
  } else if (id.includes('man')) {
    return 'man';
  }
}


function makeResponsive() {
  let recentArticles = recentPublications.querySelectorAll("li");
  let maxItems = Math.min(10, articles.length);

  for (let i = 0; i < carrouselLinks.length; i++) {
    document
      .getElementById(carrouselLinks[i])
      .addEventListener("click", function (event) {
        displaySection(sections[i]);
      });
  }

  for (let i = 0; i < maxItems; i++) {
    recentArticles[i].addEventListener("click", function (event) {
      console.log(knowSectionFromId(articles[i].id));
      displaySection(knowSectionFromId(articles[i].id));
    })
  }
}

function responsiveImg(){
  const zoomableImages = document.querySelectorAll(".zoomable");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  zoomableImages.forEach(image => {
      image.addEventListener("click", () => {
          const zoomedImage = document.createElement("img");
          zoomedImage.src = image.src;
          zoomedImage.classList.add("zoomed-image");
          overlay.innerHTML = "";
          overlay.appendChild(zoomedImage);
          document.body.appendChild(overlay);
          overlay.classList.add("active");

          overlay.addEventListener("click", () => {
              overlay.classList.remove("active");
          });
      });
  });
}