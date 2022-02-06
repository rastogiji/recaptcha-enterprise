const btn = document.querySelector("button");
const recaptchaScore = document.querySelector(".score-render")

btn.addEventListener("click", (e) =>{
    e.preventDefault();
    recaptchaScore.textContent = `The recaptcha score is ${score}`;
})

