const express = require("express");
const path = require("path");
const process = require("process");
const {
  RecaptchaEnterpriseServiceClient,
} = require("@google-cloud/recaptcha-enterprise");

process.on("SIGINT", () => {
  console.info("Interrupted");
  process.exit(0);
});

app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("/src"));
app.use("/css", express.static(__dirname + "/src/css"));
app.use("/js", express.static(__dirname + "/src/js"));
// this will help into getting json data from the request
app.use(express.json());

const port = 8080;

/*
 projectID = "concise-rune-302709",
  recaptchaSiteKey = "6Lf2-1ceAAAAAKFggSYLN1GWxB69n45zr5EXvI5i",
  token = "action-token",
  recaptchaAction = "login",
}
*/
async function createAssessment(
  projectID,
  recaptchaSiteKey,
  token,
  recaptchaAction
) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaSiteKey,
      },
    },
    parent: projectPath,
  };
  const [response] = await client.createAssessment(request);
  console.log(response);
  if (!response.tokenProperties.valid) {
    console.log(
      "The CreateAssessment call failed because the token was: " +
        response.tokenProperties.invalidReason
    );

    return null;
  }
  if (response.tokenProperties.action === recaptchaAction) {
    return response.riskAnalysis.score;
  } else {
    console.log(
      "The action attribute in your reCAPTCHA tag " +
        "does not match the action you are expecting to score"
    );
    return null;
  }
}

//---- step : 3 extracting token from the request and getting score for that token.
// then return score to the frontend so you can take decision based on this score.
app.post("/interpret", async (req, res) => {
  token = req.body.token;
  action = req.body.action;
  let recaptchaScore = await createAssessment(
    "concise-rune-302709",
    "6Lf2-1ceAAAAAKFggSYLN1GWxB69n45zr5EXvI5i",
    token,
    action
  );
  if (recaptchaScore != null) {
    res.json({ score: recaptchaScore });
  } else {
    res.json({ score: "Not able to fetch score."} );
  }
});

//Render Web Page
app.get("/", (req, res) => {
  res.render("index.ejs", { score: "" });
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`Running on port: ${port}`);
  }
});
