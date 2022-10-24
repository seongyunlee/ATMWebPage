var inputNumber = ""; //input number
var isDotClicked = false; //Is decimal dot typed


//html elements
const Numpads = document.querySelectorAll('.numpad');
const AmountDiv_ = document.querySelector('#amount');
const dotBtn_ = document.querySelector('#dot');
const Container_ = document.querySelector('.container');
const ConfirmBox_ = document.querySelector('#confirm-box');
const WaitBox_ = document.querySelector('#wait-box');
const SuccessBox_ = document.querySelector('#success-box');
const AmountCheck_ = document.querySelector('#amount-check');
const BtnYes_= document.querySelector('#btn-yes');
const BtnNo_= document.querySelector('#btn-no');
const BtnOk_= document.querySelector('#btn-ok');
const BtnHome_ =document.querySelector('#btn-home');
const BtnAgain_ =document.querySelector('#btn-again');
const ReturnCard_ = document.querySelector('#btn-return');
const BtnBack_ = document.querySelector("#back");

//set the innerHTML to inputNumber. It should be called after change the inputNumber
function refreshInputNumber(){
    if(inputNumber.length==0){
        AmountDiv_.classList.add("gray");//if inputNumber is empty show the hint
        AmountDiv_.innerHTML="$0000.00";
    }
    else{
        AmountDiv_.classList.remove("gray");
        AmountDiv_.innerHTML=inputNumber;
    }
}
//when dotClicked 
function dotClicked(){
    if(inputNumber.length==0){
        return;
    }
    if(!isDotClicked){
        inputNumber+="."
        isDotClicked=true;
        dotBtn_.classList.add("disabled"); // Make dot button gray
    }
}
function successDeposit(){
    WaitBox_.classList.add("hidden");
    SuccessBox_.classList.remove("hidden")
}
function amountEnter(){
    ConfirmBox_.classList.remove("hidden");
    Container_.classList.add("hidden");
    AmountCheck_.innerHTML="$"+inputNumber; // Show amount to deposit to make confirmation.
}
function dotErased(){
    isDotClicked=false;
    dotBtn_.classList.remove("disabled"); //when dot erased set dot button noraml background again;
}
function getAccountNumber(){
    return sessionStorage.getItem("user") //get current user account number from session storage;
}
function getBalance(){
    return JSON.parse(localStorage.getItem("info"))[getAccountNumber()].balance; //get current user's balance from localStorage;
}
function writeData(){
    var info = JSON.parse(localStorage.getItem("info"));
    var userData= info[getAccountNumber()];
    console.log(userData);
    userData.balance += Number(inputNumber);
    userData.log.push({Date:(new Date()).toString(),in:Number(inputNumber),out:0,balance:userData.balance});
    info[getAccountNumber()]=userData;
    localStorage.setItem("info",JSON.stringify(info));//save the new log data and change balance to localStorage
}

//show Insert Money Message(waiting for insert money) and hide confirm message;
function makeDeposit(){
    WaitBox_.classList.remove("hidden");
    ConfirmBox_.classList.add("hidden");//
    writeData()
}
//handling the numbered button click
function onClickNumpad(event){
    var input =event.target.id;
    if(input=="del"){
        if(inputNumber.at(-1)=="."){
            dotErased();
        }
        inputNumber = inputNumber.slice(0,-1);
    }
    else if (input=="enter"){
        amountEnter();
    }
    else if (input =="dot"){
        dotClicked()
    }
    else{
        inputNumber+=input;
    }
    refreshInputNumber();
}

//start

//set listeners to element
for (var i = 0; i < Numpads.length; i++) {
    Numpads[i].addEventListener("click",onClickNumpad);
  }
BtnNo_.addEventListener('click',()=>{location.reload()});
BtnYes_.addEventListener('click',makeDeposit);
BtnOk_.addEventListener('click',successDeposit);
BtnHome_.addEventListener('click',()=>{location.href="./main.html"});
BtnAgain_.addEventListener('click',()=>{location.reload()});
ReturnCard_.addEventListener('click',()=>{location.href="../index.html"});
BtnBack_.addEventListener('click',()=>{location.href="./main.html"})