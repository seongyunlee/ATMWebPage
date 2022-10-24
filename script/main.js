const Menus = document.querySelectorAll(".menu");
const ReturnBtn_ = document.querySelector("#return-card")

//link to correspond page
function clickMenu(event){
    location.href="./"+event.target.id+".html";
}

for(var i=0;i<Menus.length;i++){
    Menus[i].addEventListener("click",clickMenu);
}

//set listeners to element
ReturnBtn_.addEventListener("click",(e)=>{location.href="../index.html"})
