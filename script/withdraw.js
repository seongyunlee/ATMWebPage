
//html elements
const QuickBtns = document.querySelectorAll("#quick");
const EnterBtn_ = document.querySelector('#enter');
const Amount_ = document.querySelector(".amount");
const ArrowBtns = document.querySelectorAll(".arrow");
const BtnYes_= document.querySelector('#btn-yes');
const BtnNo_= document.querySelector('#btn-no');
const BtnHome_ =document.querySelector('#btn-home');
const BtnAgain_ =document.querySelector('#btn-again');
const ReturnCard_ = document.querySelector('#btn-return');
const AmountBox_ = document.querySelector('#amount-box');
const ConfirmBox_ = document.querySelector('#confirm-box');
const SuccessBox_ = document.querySelector('#success-box');
const BackBtn_ = document.querySelector('#back');
const AmountCheck_ = document.querySelector('#amount-check');

var amount = 0; //withdraw amount

//change amount as much as change (when arrow buttons clicked)
function amountChange(change){
    if(amount+change<0)
        amount=0;
    else
        amount+=change;
    Amount_.innerHTML=amount;
}
//handle arrow buttons
function onArrowBtnClick(event){
    amountChange(Number(event.target.getAttribute('value')));
}
//handle quick buttons
function onQuickBtnClick(event){
    const value=event.target.getAttribute('value');
    amount=value;
    checkWithdraw(value);
}
//handle enterButton
function enterBtnClick(){
    checkWithdraw(amount);
}

//check the amount is valid
function checkWithdraw(amount){
    if(amount==0)
        return;
    if(getBalance()<amount){
        alert("Not enough balance!");
        return;
    }
    AmountBox_.classList.add("hidden");
    ConfirmBox_.classList.remove("hidden");
    AmountCheck_.innerHTML="$"+amount+"?";

}
//get current user account number from sessionStorage
function getAccountNumber(){
    return sessionStorage.getItem("user")
}
//get current user data  from localStorage

function getBalance(){
    return JSON.parse(localStorage.getItem("info"))[getAccountNumber()].balance;
}

//edit log, balance and save to the localStorage
function writeData(){
    var info = JSON.parse(localStorage.getItem("info"));
    var userData= info[getAccountNumber()];
    console.log(userData);
    userData.balance -= amount;
    userData.log.push({Date:(new Date()).toString(),in:0,out:Number(amount),balance:userData.balance});
    info[getAccountNumber()]=userData;
    localStorage.setItem("info",JSON.stringify(info));
}

function makeWithdraw(){
    ConfirmBox_.classList.add("hidden");
    SuccessBox_.classList.remove("hidden");//show only success message and hide others;
    writeData();

}

//set event listeners;
for(var i =0; i<QuickBtns.length;i++){
    QuickBtns[i].addEventListener('click',(e)=>onQuickBtnClick(e));
}
for(var i =0; i<ArrowBtns.length;i++){
    ArrowBtns[i].addEventListener('click',(e)=>onArrowBtnClick(e));
}
EnterBtn_.addEventListener('click',()=>checkWithdraw(amount));
BtnYes_.addEventListener('click',makeWithdraw);
BtnNo_.addEventListener('click',()=>{location.reload()});
BtnHome_.addEventListener('click',()=>{location.href="./main.html"});
BtnAgain_.addEventListener('click',()=>{location.reload()});
ReturnCard_.addEventListener('click',()=>{location.href="../index.html"});
BackBtn_.addEventListener('click',()=>{location.href="./main.html"})