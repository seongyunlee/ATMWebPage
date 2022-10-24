var inputNumber = "";
var isPasswordMode = false;
var passwordAttempts = 5;
var accountInput = "";

//elements
const AccountNumberDiv_ = document.querySelector('#account-number');
const Numpads = document.querySelectorAll('.numpad');
const Title_ = document.querySelector('.title');
const Content_ =  document.querySelector(".content");
const ReturnBtn_ = document.querySelector("#return-card");
const CreateBtn_ = document.querySelector("#create-card");


function gotoPassword(){
    isPasswordMode = true;
    ReturnBtn_.hidden=false;
    CreateBtn_.hidden=true;
    Title_.hidden = true;
    Content_.innerHTML ="Please enter your PIN";
    accountInput= inputNumber;
    inputNumber = "";
    refreshInputNumber();
}
function getData(){
    return JSON.parse(localStorage.getItem("info"))
}
function dataCheck(){
    const info = localStorage.getItem("info");
    if(info==null){
        const info ={};
        info["1234567890123456"]={log:[{Date:(new Date()).toString(),out:0,in:0,balance:2000}],balance:2000,password:"1234"}
        info["1"]={log:[{Date:(new Date()).toString(),out:0,in:0,balance:2000}],balance:2000,password:"1"}
        localStorage.setItem("info",JSON.stringify(info));
    }
}
function checkAccountNumber(){
    
    if(getData().hasOwnProperty(inputNumber)){
        gotoPassword();
    }
    else{
        alert("That account number does not exist!")
    }
}

function loginSuccess(){
    sessionStorage.setItem("user",accountInput);
    location.href="./html/main.html";
}
function checkPassword(){
    if(inputNumber == getData()[accountInput].password){
        loginSuccess();
    }
    else{
        passwordAttempts-=1;
        if(passwordAttempts==0){
            location.reload();
        }
        else{
            alert("Incorrect PIN. You have "+passwordAttempts+" attempt"+(passwordAttempts!=1? "s":"")+" left");
            inputNumber="";
            refreshInputNumber();
        }
    }
}
function refreshInputNumber(){
    if(inputNumber.length==0){
        AccountNumberDiv_.classList.add("gray");
        AccountNumberDiv_.innerHTML=isPasswordMode? "Enter PIN":"Enter Account Number";
    }
    else{
        AccountNumberDiv_.classList.remove("gray");
        AccountNumberDiv_.innerHTML="·".repeat(inputNumber.length);
    }
}
function onClickNumpad(event){
    var input =event.target.id;
    if(input=="del")
        inputNumber = inputNumber.slice(0,-1);
    else if (input=="enter"){
        if(isPasswordMode==false)
            checkAccountNumber();
        else
            checkPassword();
    }
    else{
        inputNumber+=input;
    }
    refreshInputNumber();
}
//start
dataCheck();
for (var i = 0; i < Numpads.length; i++) {
    Numpads[i].addEventListener("click",onClickNumpad);
}
ReturnBtn_.addEventListener("click",(e)=>{location.reload()});
CreateBtn_.addEventListener("click",(e)=>{location.href="./html/create.html"});