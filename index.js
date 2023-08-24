import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// Authentication details
const yourUsername = "Tembulon";
const yourPassword = "Kachumbari";
const yourAPIKey = "1a9bc1d0-f1a7-4fb0-a57f-7125f13440bb";
const yourBearerToken = "793d707c-da6b-4882-88f8-9d39bf18bf1c";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

// No authentication 
app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// username and password authentication
app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL + "/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// api key autherntication
app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// token requires header manipulation instead of parameters like previous code. creating header template to fill with token
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};
// token authentication
app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
