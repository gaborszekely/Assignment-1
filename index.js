/*
 * HELLO WORLD API BY GABOR SZEKELY
 *
 * This API parses a request body and returns a message based on
 * the time of the request, the language reqyested and the user's
 * specified name.
 *
 */

const http = require("http");
const url = require("url");
const port = require("./config").PORT;
const StringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
  // Object
  const parsedUrl = url.parse(req.url, true);

  // Object
  const headers = req.headers;
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toUpperCase();

  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const chosenHandler = path in routes ? routes[path] : handlers.notFound;

    let data = {
      path,
      method,
      headers,
      payload: JSON.parse(buffer)
    };

    chosenHandler(data, (statusCode, payload = {}) => {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);

      res.end(payload);

      // Log request
      console.log(`Returning this response: ${statusCode}, ${payload}`);
    });
  });
});

server.listen(port, () => console.log(`Server started on Port ${port}`));

let handlers = {};

handlers.hello = (data, callback) => {
  const { payload } = data;

  // Check for language value in body
  // If none defined, default to english;
  let language =
    typeof payload.language !== "undefined"
      ? payload.language.toLowerCase().trim()
      : "english";

  // Check for name and set default
  const name =
    typeof payload.name !== "undefined" && payload.name.length > 0
      ? payload.name
      : "User";

  // Get current time in hours
  const time = new Date().getHours();

  let message = "";

  switch (language) {
    case "french":
      if (time < 12) {
        message += "Bonjour, ";
      } else if (time >= 12 && time < 17) {
        message += "Bon apres-midi, ";
      } else if (time >= 17 && time < 21) {
        message += "Bonsoir, ";
      } else {
        message += "Bonne nuit, ";
      }
      message += `${name}!`;
      break;
    case "spanish":
      if (time < 12) {
        message += "Buenas dias, ";
      } else if (time >= 12 && time < 17) {
        message += "Buenas tardes, ";
      } else if (time >= 17 && time < 21) {
        message += "Buenas noches, ";
      } else {
        message += "Buenas noches, ";
      }
      message += `${name}!`;
      break;
    case "english":
    default:
      if (time < 12) {
        message += "Good morning, ";
      } else if (time >= 12 && time < 17) {
        message += "Good afternoon, ";
      } else if (time >= 17 && time < 21) {
        message += "Good evening, ";
      } else {
        message += "Good night, ";
      }
      message += `${name}!`;
  }

  callback(200, { message });
};

handlers.notFound = (data, callback) => {
  callback(404, { error: "Page not found!" });
};

const routes = {
  hello: handlers.hello
};
