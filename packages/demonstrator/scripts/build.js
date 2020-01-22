// Make sure the required environment variables are defined
process.env.NODE_ENV = "production";
const clientEnv = require("react-scripts/config/env")().raw;
const requiredVariables = require("../src/env");

Object.keys(requiredVariables).forEach(envVar => {
  if (!clientEnv[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

require("child_process").execFileSync("npx", ["react-scripts", "build"], {
  stdio: "inherit"
});
