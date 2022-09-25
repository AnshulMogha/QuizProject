'use strict';
let nextBtn=document.getElementById('nextBtn');
let form=document.getElementById('hidden-form');
let questioNo=document.getElementById('ques-no').innerText;
questioNo=parseInt(questioNo);
let key=document.getElementById('hidden-val1');
let remainingQuestion=document.getElementById('remain-Que');
window.history.forward();
form.removeChild(key);
key=key.getAttribute('value');


function updateRemain()
{
    let remainValue=parseInt(remainingQuestion.innerText);
    remainValue=remainValue-questioNo;
    remainingQuestion.innerText=remainValue;
}
updateRemain();
function createInputEle(name,val)
{
    let Ele=document.createElement('input');
    Ele.setAttribute('type','hidden');
    Ele.setAttribute('name',name);
    Ele.setAttribute('value',val);
    return Ele; 
}
function getScore()
{
    let cookie=document.cookie;
    let i=cookie.lastIndexOf('=');
    let data=parseInt(cookie.slice(i+1));
    return data;
}
function getUser()
{
    let cookie=document.cookie;
    let i=cookie.indexOf('=');
    let e=cookie.indexOf(';');
    let data=cookie.slice(i+1,e)+"@gmail.com";
    return data;
}
if(questioNo<10)
{
    let newhiddenEle=createInputEle('QueNo',questioNo);
    form.appendChild(newhiddenEle);
}
else
{
    let user=createInputEle('userEmail',getUser());
    let score=createInputEle('score',getScore());
    form.appendChild(user);
    form.appendChild(score);
    nextBtn.setAttribute("value","submit");
    form.setAttribute("action","/submit");
}

function setCookies()
{
    let data=getScore();   
    data=data+2;
    document.cookie="score="+data+";";
}
function validateResult()
{
    let radio=document.getElementsByName("answer");
    for(let i=0;i<4;i++)
    {
        if(radio[i].checked && key==i+1)
        {
            setCookies();
        }
    }
    
}

nextBtn.addEventListener('click',()=>{
    validateResult();
    form.submit();
});



/*--------------------------In development --------------------------------------*/
document.getElementById('c-sec1').style.display='none';