const btn = document.querySelector("button");
const recaptchaScore = document.querySelector(".score-render")

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    score.textContent = `The recaptcha score is ${score}`;
})

