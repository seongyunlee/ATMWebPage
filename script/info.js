const Content_ = document.querySelector(".content");
const Table_ = document.querySelector(".info_table");
const BackBtn_ = document.querySelector(".back");

function getData(){
    const info = localStorage.getItem("info");
    return JSON.parse(info);

}
function setInfo(){
    const info = getData();
    console.log(info);
    const tbody = document.querySelector('tbody');
    const key = ['Date','out','in','balance']
    for(var line of info.record){
        console.log(line)
        let tr = document.createElement('tr');
        for(var k of key){
            let td = document.createElement('td');
            td.innerHTML = line[k];
            tr.append(td);
        }
        tbody.append(tr);
    }
    Content_.innerHTML = "Current Balance: $"+info.balance;
}

BackBtn_.addEventListener("click",()=>{location.href="./main.html"});
setInfo();
