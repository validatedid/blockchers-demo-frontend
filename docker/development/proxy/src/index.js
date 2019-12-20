const express = require("express");
const app = express();
const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createProxyServer();

let currentApp = "";

function redirectBasedOnCurrentApp(req, res) {
  return apiProxy.web(req, res, { target: `http://${currentApp}` });
}

// Map URLs with apps

app.all("/diploma/belgium-gov*", function(req, res) {
  currentApp = "belgium-gov:3003";
  redirectBasedOnCurrentApp(req, res);
});

app.all("/diploma/flemish-gov*", function(req, res) {
  currentApp = "flemish-gov:3004";
  redirectBasedOnCurrentApp(req, res);
});

app.all("/diploma/spanish-university*", function(req, res) {
  currentApp = "spanish-university:3005";
  redirectBasedOnCurrentApp(req, res);
});

app.all("/eu-funding*", function(req, res) {
  currentApp = "eu-funding:3006";
  redirectBasedOnCurrentApp(req, res);
});

app.all("/wallet*", function(req, res) {
  currentApp = "wallet:3000";
  redirectBasedOnCurrentApp(req, res);
});

// Real magic starts here 🧙
// The following redirect uses the currentApp variable which keeps a trace of the most recent called app

app.all("/static*", redirectBasedOnCurrentApp);
app.all("/main.*.hot-update.js*", redirectBasedOnCurrentApp);
app.all("/sockjs-node", redirectBasedOnCurrentApp);

// And the other requests go to demonstrator

app.all("/*", function(req, res) {
  currentApp = "demonstrator:3001";
  redirectBasedOnCurrentApp(req, res);
});

app.listen(process.env.PORT);
