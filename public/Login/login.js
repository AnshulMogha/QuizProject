'use strict';
let signInbtn=document.getElementById("SignInbtn");
let signUpbtn=document.getElementById("SignUpbtn");
let caption=document.getElementById("caption");
let submitBtn=document.getElementById("Submitbtn");
function changeData(captionText,subBtnText,signInCol,signUpCol)
{
    caption.innerText=captionText;
    submitBtn.innerText=subBtnText;
    signInbtn.style.backgroundColor=signInCol;
    signUpbtn.style.backgroundColor=signUpCol;
    submitBtn.setAttribute("value",captionText) 
}
signInbtn.addEventListener("click",()=>{
    changeData("SignIn","SignIn","#222831","#393E46");
});
signUpbtn.addEventListener("click",()=>{
    changeData("SignUp","SignUp","#393E46","#222831");
});