let quiz = document.getElementById("myquiz");
let score = document.getElementById("myscore");
score.addEventListener("click", function () {
    score.style.color = "#1CD6CE";
    score.style.borderBottom = ".2rem solid #FEDB39";
    quiz.style.color = "grey";
    quiz.style.borderBottom = ".2rem solid grey";
    let scoreshow = document.getElementById("show-score");
    scoreshow.style.display = "block";
    let digit = document.getElementById("digit");
    digit.style.display = "block";
    let h = document.getElementById("form-heading");
    h.style.display = "none";
    let b = document.getElementById("form-btn");
    b.style.display = "none";
});
quiz.addEventListener("click", function () {
    quiz.style.color = "#1CD6CE";
    quiz.style.borderBottom = ".2rem solid #FEDB39";
    score.style.color = "grey";
    score.style.borderBottom = ".2rem solid grey";
    let scoreshow = document.getElementById("show-score");
    scoreshow.style.display = "none";
    let digit = document.getElementById("digit");
    digit.style.display = "none";
    let h = document.getElementById("form-heading");
    h.style.display = "block";
    let b = document.getElementById("form-btn");
    b.style.display = "inline";
});
/*------------------------------Cookies------------------------*/
let userName=document.getElementById("username").innerText;
userName=userName.toLowerCase();
document.cookie="userName="+userName+";";
document.cookie="score=0;";
