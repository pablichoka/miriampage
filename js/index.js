function init(){
    document.getElementById('ud').style.display = 'none';
    document.getElementById('man').style.display = 'none';
}

let sections = ['actividades', 'ud', 'man']

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