var inputNumber = "";
var isDotClicked = false;

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
function successDeposit(){
    WaitBox_.classList.add("hidden");
    SuccessBox_.classList.remove("hidden")
}
function amountEnter(){
    ConfirmBox_.classList.remove("hidden");
    Container_.classList.add("hidden");
    AmountCheck_.innerHTML="$"+inputNumber;
}
function dotErased(){
    isDotClicked=false;
    dotBtn_.classList.remove("disabled");
}
function writeData(){
    var info = JSON.parse(localStorage.getItem("info"));
    const balance = info.balance+Number(inputNumber);
    info.balance = balance;
    info.record.push({Date:(new Date()).toString(),out:0,in:Number(inputNumber),balance:balance});
    localStorage.setItem("info",JSON.stringify(info));
}
function makeDeposit(){
    WaitBox_.classList.remove("hidden");
    ConfirmBox_.classList.add("hidden");
    writeData()
}
function backToInput(){
    inputNumber="";
    ConfirmBox_.hidden=true;
    Container_.hidden=false;
    refreshInputNumber();
}
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
for (var i = 0; i < Numpads.length; i++) {
    Numpads[i].addEventListener("click",onClickNumpad);
  }
BtnNo_.addEventListener('click',backToInput);
BtnYes_.addEventListener('click',makeDeposit);
BtnOk_.addEventListener('click',successDeposit);
BtnHome_.addEventListener('click',()=>{location.href="./main.html"});
BtnAgain_.addEventListener('click',()=>{location.reload()});
ReturnCard_.addEventListener('click',()=>{location.href="../index.html"});