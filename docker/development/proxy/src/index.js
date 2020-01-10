const express = require("express");
const app = express();
const httpProxy = require("http-proxy");

let currentApp = "";

const BELGIUM_GOV_PORT = process.env.BELGIUM_GOV_PORT || "3003";
const DEMONSTRATOR_PORT = process.env.DEMONSTRATOR_PORT || "3001";
const EU_FUNDING_PORT = process.env.EU_FUNDING_PORT || "3006";
const FLEMISH_GOV_PORT = process.env.FLEMISH_GOV_PORT || "3004";
const SPANISH_UNIVERSITY_PORT = process.env.SPANISH_UNIVERSITY_PORT || "3005";
const WALLET_PORT = process.env.WALLET_PORT || "3000";
const NOTARY_PORT = process.env.NOTARY_PORT || "3045";

const HTTPS = process.env.HTTPS === "true" || false;
const protocol = HTTPS ? "https" : "http";

const apiProxy = httpProxy.createProxyServer();

function redirectBasedOnCurrentApp(req, res) {
  return apiProxy.web(req, res, { target: `${protocol}://${currentApp}` });
}

// Real magic starts here 🧙
// The following redirect uses the currentApp variable which keeps a trace of the most recent called app

app.all("/static*", redirectBasedOnCurrentApp);
app.all("/main.*.hot-update.js*", redirectBasedOnCurrentApp);
app.all("/sockjs-node*", redirectBasedOnCurrentApp);
app.all("/manifest.json", redirectBasedOnCurrentApp);
app.all(/\.(gif|jpg|jpeg|tiff|png|ico)$/i, redirectBasedOnCurrentApp);

// Map URLs with apps

app.all("/diploma/belgium-gov*", function(req, res) {
  currentApp = `belgium-gov:${BELGIUM_GOV_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

app.all("/diploma/flemish-gov*", function(req, res) {
  currentApp = `flemish-gov:${FLEMISH_GOV_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

app.all("/diploma/spanish-university*", function(req, res) {
  currentApp = `spanish-university:${SPANISH_UNIVERSITY_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

app.all("/eu-funding*", function(req, res) {
  currentApp = `eu-funding:${EU_FUNDING_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

app.all("/wallet*", function(req, res) {
  currentApp = `wallet:${WALLET_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

app.all("/notary*", function(req, res) {
  currentApp = `notarization:${NOTARY_PORT}`;
  redirectBasedOnCurrentApp(req, res);
});

// And the other requests go to demonstrator

app.all("/*", function(req, res) {
  currentApp = `demonstrator:${DEMONSTRATOR_PORT}`;
  console.log("demonstrator intercepted", req.url);
  redirectBasedOnCurrentApp(req, res);
});

app.listen(process.env.PORT);
