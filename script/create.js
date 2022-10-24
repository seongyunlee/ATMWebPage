//html elements
const Account_ = document.querySelector("#create-card");
const AccountDiv_ =document.querySelector("#account");
const BackBtn_ = document.querySelector("#back");

//append new Account to LocalStorage
function appendData(num,pw){
    const info = JSON.parse(localStorage.getItem("info"));
    info[num]={log:[{Date:(new Date()).toString(),out:0,in:0,balance:0}],balance:0,password:pw};
    localStorage.setItem("info",JSON.stringify(info));
}
//make new Account Information;
function createAccount(){
    const account  = Math.floor(Math.random()*(9999999999999999-1000000000000000))+1000000000000000;
    const password =    Math.floor(Math.random()*(9999-1000))+1000;
    AccountDiv_.innerHTML="Your account is " +account+"<br>Password is "+password;
    appendData(account.toString(),password);

}
//set listners to element
BackBtn_.addEventListener("click",()=>{location.href="../index.html"})
createAccount();