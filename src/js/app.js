const btn = document.querySelector("button");
const recaptchaScore = document.querySelector(".score-render");

// There is 3 step to validate your user action with reCAPTCHA security
// 1. generate token a token with help of site key
// 2. send that token to the backend
// 3. varify token and create assessment to get score for that token

// For more info follow
// 1. https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages?authuser=1
// 2. https://cloud.google.com/recaptcha-enterprise/docs/create-assessment?authuser=1

btn.addEventListener("click", (e) => {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    //---- step : 1 generating token with help of site key (you can make site key public)
    const token = await grecaptcha.enterprise.execute(
      "6Lf2-1ceAAAAAKFggSYLN1GWxB69n45zr5EXvI5i",
      {
        action: "LOGIN",
      }
    );
    console.log(token);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, action: "LOGIN" }),
    };

    //---- step : 2 sending generated token to backend

    let res = await fetch("http://recaptcha.learning-cloud.co.in:8080/interpret", options);

    console.log(res);
    let resJson = await res.json();
    console.log(resJson);
    recaptchaScore.textContent = `The recaptcha score is ${resJson.score}`;
  });
});
