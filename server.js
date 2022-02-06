const express = require("express");
const path = require("path");
const process = require("process");
const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

process.on('SIGINT', () => {
    console.info("Interrupted");
    process.exit(0);
  });

app = express();

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static("/src"));
app.use("/css", express.static(__dirname + "/src/css"));
app.use("/js" ,express.static(__dirname+ "/src/js"));

const port = 80;

async function createAssessment({
    projectID = "concise-rune-302709",
    recaptchaSiteKey = "6Lf2-1ceAAAAAKFggSYLN1GWxB69n45zr5EXvI5i",
    token = "action-token",
    recaptchaAction = "login",
  }) {
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);
    const request = ({
        assessment: {
          event: {
            token: token,
            siteKey: recaptchaSiteKey,
          },
        },
        parent: projectPath,
      });
      const [ response ] = await client.createAssessment(request);
      if (!response.tokenProperties.valid) {
        console.log("The CreateAssessment call failed because the token was: " +
          response.tokenProperties.invalidReason);
  
        return null;
       }
       if (response.tokenProperties.action === recaptchaAction) {
          return response.riskAnalysis.score;
         } else {
          console.log("The action attribute in your reCAPTCHA tag " +
            "does not match the action you are expecting to score");
          return null;
         }
  }

let recaptchaScore = createAssessment({});

//Render Web Page
app.get("/",(req,res)=>{
    res.render("index.ejs",{score:recaptchaScore});
})

app.listen(port,(err) =>{
    if(err){
        console.log(`Error: ${err.message}`);
    }
    else{
        console.log(`Running on port: ${port}`);
    }
});
  