let sections = ["act", "ud", "man"];
let carrouselLinks = ["quick1", "quick2", "quick3"];

let carrousel = document.getElementById("carCont");
let views = carrousel.querySelectorAll(".carousel-item");

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
}

function fillRecentArticles() {
  const articles = document.querySelectorAll("article");

  const recentPublications = document.getElementById("recentPublications");
  const ul = recentPublications.querySelector("ul");

  const maxArticles = Math.min(articles.length, 10);

  for (let i = 0; i < maxArticles; i++) {
    const article = articles[i];
    const title = article.querySelector(".header").textContent;
    const date = article.querySelector(".date").textContent;
    const imageSrc = article.querySelector("img").getAttribute("src");

    const li = document.createElement("li");
    li.innerHTML = `
            <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <img class="bd-placeholder-img" src="${imageSrc}" alt="Artículo">
                <div class="col-lg-8">
                    <h6 class="mb-0">${title}</h6>
                    <small class="text-body-secondary">${date}</small>
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
  if (text.length > 160) {
    return text.substring(0, 160) + " ...";
  }
  return text;
}

for (let i = 0; i < carrouselLinks.length; i++) {
  document
    .getElementById(carrouselLinks[i])
    .addEventListener("click", function (event) {
      displaySection(sections[i]);
    });
}
