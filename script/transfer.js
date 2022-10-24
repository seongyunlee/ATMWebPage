//html elements
const SelectDivs = document.querySelectorAll(".select");
const Options = document.querySelectorAll(".option");
const Numpads = document.querySelectorAll('.numpad');
const AmountDiv_ = document.querySelector('#amount');
const dotBtn_ = document.querySelector('#dot');
const ChooseBox_ = document.querySelector('#choose-box');
const ConfirmBox_ = document.querySelector('#confirm-box');
const WaitBox_ = document.querySelector('#wait-box');
const SuccessBox_ = document.querySelector('#success-box');
const AmountCheck_ = document.querySelector('#amount-check');
const BtnYes_= document.querySelector('#btn-yes');
const BtnNo_= document.querySelector('#btn-no');
const BtnHome_ =document.querySelector('#btn-home');
const BtnAgain_ =document.querySelector('#btn-again');
const ReturnCard_ = document.querySelector('#btn-return');
const FromAccount_ = document.querySelector('.select#from');
const ToAccount_ = document.querySelector('.select#to');
const BackBtn_ = document.querySelector('#back');
const MyAccount_ = document.querySelector('#myAccount');

var inputNumber = ""; //input number
var isDotClicked = false; //Is decimal dot typed

//set the innerHTML to inputNumber. It should be called after change the inputNumber
function refreshInputNumber(){
    if(inputNumber.length==0){
        AmountDiv_.classList.add("gray");
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
        dotBtn_.classList.add("disabled");
    }
}

//show the success message and hide anothers
function successDeposit(){
    WaitBox_.classList.add("hidden");
    SuccessBox_.classList.remove("hidden")
}


function amountEnter(){
    const toAccount = ToAccount_.innerHTML;
    const fromAccount = FromAccount_.innerHTML;// Show amount to deposit to make confirmation.
    if(toAccount.length!=16 || fromAccount.length!=16){//check from and to account is valid
        alert("Invalid Account Number");
        return;
    }
    if(Number(inputNumber)==0)
        return;
    if(getBalance()<Number(inputNumber)){
        alert("Not enough balance");
        return;
    }
    //if all data valid
    ConfirmBox_.classList.remove("hidden");//show the confirm message and hide another
    ChooseBox_.classList.add("hidden");
    AmountCheck_.innerHTML="$"+inputNumber+"<br>From "+FromAccount_.innerHTML+"<br>To "+ToAccount_.innerHTML;
}

function dotErased(){
    isDotClicked=false;
    dotBtn_.classList.remove("disabled"); //when dot erased set dot button normal background again;
}
function getAccountNumber(){
    return sessionStorage.getItem("user"); //get current user account number from session storage;
}
function getBalance(){
    return JSON.parse(localStorage.getItem("info"))[getAccountNumber()].balance;
}
function writeData(){
    var info = JSON.parse(localStorage.getItem("info"));
    var userData= info[getAccountNumber()];
    console.log(userData);
    userData.balance += Number(inputNumber);
    userData.log.push({Date:(new Date()).toString(),out:Number(inputNumber),in:0,balance:userData.balance});//get current user's balance from localStorage;
    info[getAccountNumber()]=userData;
    localStorage.setItem("info",JSON.stringify(info));//save the new log data and change balance to localStorage
}
//show Insert Money Message(waiting for insert money) and hide confirm message;
function makeTransfer(){
    SuccessBox_.classList.remove("hidden");
    ConfirmBox_.classList.add("hidden");
    writeData();
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

//set from account to current account
function setMyAccount(){
    MyAccount_.innerHTML=getAccountNumber();
    MyAccount_.setAttribute("value",getAccountNumber());
}

//when select div click. show the ul tag ;
function onSelectClick(event){
    event.target.parentElement.querySelector('ul').classList.remove("hidden"); // same parent element
}

//when the option click set inner HTML, and hide the parent;
function onOptionClick(event){
    event.target.parentElement.parentElement.querySelector('.select').innerHTML=event.target.getAttribute("value");
    event.target.parentElement.classList.add("hidden");
}

//set listenter;
for(var i =0; i<SelectDivs.length;i++){
    SelectDivs[i].addEventListener('click',(e)=>onSelectClick(e));
}
for(var i =0; i<Options.length;i++){
    Options[i].addEventListener('click',(e)=>onOptionClick(e));
}

for (var i = 0; i < Numpads.length; i++) {
    Numpads[i].addEventListener("click",onClickNumpad);
  }

BtnNo_.addEventListener('click',()=>{location.reload()});
BtnYes_.addEventListener('click',makeTransfer);
BtnHome_.addEventListener('click',()=>{location.href="./main.html"});
BtnAgain_.addEventListener('click',()=>{location.reload()});
ReturnCard_.addEventListener('click',()=>{location.href="../index.html"});
BackBtn_.addEventListener('click',()=>{location.href="./main.html"});

//set Own Account Number;
setMyAccount();