var inputNumber = "";
var isPasswordMode = false;
var passwordAttempts = 5;
//elements
const AccountNumberDiv_ = document.querySelector('#account-number');
const Numpads = document.querySelectorAll('.numpad');
const Title_ = document.querySelector('.title');
const Content_ =  document.querySelector(".content");

function gotoPassword(){
    isPasswordMode = true;
    Title_.hidden = true;
    Content_.innerHTML ="Please enter your PIN";
    inputNumber = "";
    refreshInputNumber();
}

function checkAccountNumber(){
    if(inputNumber == "1234"){
        gotoPassword();
    }
    else{
        alert("That account number does not exist!")
    }
}
function revertToMain(){
    Title_.hidden=false;
    isPasswordMode=false;
    Content_.innerHTML ="Please enter your PIN";
    inputNumber = "";
    passwordAttempts=5;
    refreshInputNumber();
}
function loginSuccess(){
    location.href="./html/main.html";
}
function checkPassword(){
    if(inputNumber == "1234"){
        loginSuccess();
    }
    else{
        passwordAttempts-=1;
        if(passwordAttempts==0){
            revertToMain();
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
for (var i = 0; i < Numpads.length; i++) {
    console.log(i);
    Numpads[i].addEventListener("click",onClickNumpad);
  }