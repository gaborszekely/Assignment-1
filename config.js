let environments = {
  staging: {
    PORT: 3000,
    ENV_NAME: "staging"
  },
  production: {
    PORT: 5000,
    ENV_NAME: "production"
  }
};
// Trimmed to remove any whitespace

let env = typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Remove any whitespace
let trimmedEnv = env.toLowerCase().trim();

let envExport =
  typeof environments[trimmedEnv] !== "undefined"
    ? environments[trimmedEnv]
    : environments["staging"];

module.exports = envExport;
