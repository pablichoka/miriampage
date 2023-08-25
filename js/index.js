    let sections = ['act', 'ud', 'man'];
    let carrouselLinks = ['quick1', 'quick2', 'quick3']

    let carrousel = document.getElementById('carCont');
    let views = carrousel.querySelectorAll('.carousel-item');

    let actArticles = document.getElementById(sections[0]).querySelectorAll('.blog-post');
    let udArticles = document.getElementById(sections[1]).querySelectorAll('.blog-post');
    let manArticles = document.getElementById(sections[2]).querySelectorAll('.blog-post');

function init(){

    document.getElementById('ud').style.display = 'none';
    document.getElementById('man').style.display = 'none';

    let i = randomArt(actArticles);
    let j = randomArt(udArticles);
    let k = randomArt(manArticles);

    views[0].querySelector('h1').innerHTML = actArticles[i].querySelector('.header').innerHTML;
    views[1].querySelector('h1').innerHTML = udArticles[j].querySelector('.header').innerHTML;
    views[2].querySelector('h1').innerHTML = manArticles[k].querySelector('.header').innerHTML;

    views[0].querySelector('.exp').innerHTML = actArticles[i].querySelector('.sum').innerHTML;
    views[1].querySelector('.exp').innerHTML = udArticles[j].querySelector('.sum').innerHTML;
    views[2].querySelector('.exp').innerHTML = manArticles[k].querySelector('.sum').innerHTML;

    document.getElementById(carrouselLinks[0]).setAttribute('href', '#act' + i);
    document.getElementById(carrouselLinks[1]).setAttribute('href', '#ud' + j);
    document.getElementById(carrouselLinks[2]).setAttribute('href', '#man' + k);

}

function displaySection(id){
    for(let i = 0; i<sections.length; i++){
        if(sections[i] === id){
            document.getElementById(sections[i]).style.display = "inherit";
        }else{
            document.getElementById(sections[i]).style.display="none"
        }
    }
    let anchors = document.getElementById('navbar').querySelectorAll('a');
    for (var anchor of anchors) {
        if(anchor.href.includes(id)){
            anchor.classList.remove('active');
            anchor.classList.add('active');
        }else{
            anchor.classList.remove('active');
        }
    }
}

function randomArt(artSection){
    let artNumber = Math.random();
    return parseInt((Math.floor(artNumber * (artSection.length)))); //returns a number between [0, length - 1];
}

for(let i = 0; i<carrouselLinks.length; i++){
    document.getElementById(carrouselLinks[i]).addEventListener("click", function (event) {
        // event.preventDefault();
        displaySection[sections[i]];
    })
}