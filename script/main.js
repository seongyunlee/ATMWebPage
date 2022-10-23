const Menus = document.querySelectorAll(".menu");
const ReturnBtn_ = document.querySelector("#return-card")

function clickMenu(event){
    location.href="./"+event.target.id+".html";
}
function getData(){
    const info = localStorage.getItem("info");
    if(info!=null){
        return JSON.parse(info);
    }
    else{
        const new_record = [{Date:(new Date()).toString(),out:0,in:0,balance:2000}];
        const new_info = {balance:2000,record:new_record};
        localStorage.setItem("info",JSON.stringify(new_info));
        console.log(new_info);
        return new_info;
    }
}
for(var i=0;i<Menus.length;i++){
    Menus[i].addEventListener("click",clickMenu);
}
ReturnBtn_.addEventListener("click",(e)=>{location.href="../index.html"})
getData();