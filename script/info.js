const Content_ = document.querySelector(".content");
const Table_ = document.querySelector(".info_table");
const BackBtn_ = document.querySelector(".back");


//get data from localstorage
function getData(){
    const info = localStorage.getItem("info");
    return JSON.parse(info)[sessionStorage.getItem("user")]; //only show the currently login data
}

//show the data in table.
function setInfo(){
    const info = getData();
    console.log(info);
    const tbody = document.querySelector('tbody');
    const key = ['Date','out','in','balance']
    for(var line of info.log){
        console.log(line)
        let tr = document.createElement('tr'); //create new table row element
        for(var k of key){
            let td = document.createElement('td');
            td.innerHTML = line[k];
            tr.append(td);
        }
        tbody.append(tr);//append row on table body
    }
    Content_.innerHTML = "Current Balance: $"+info.balance;//show the current balance
}
//set listeners to element
BackBtn_.addEventListener("click",()=>{location.href="./main.html"});
setInfo();
