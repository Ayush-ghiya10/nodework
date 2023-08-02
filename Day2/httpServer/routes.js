

const fs = require("fs");

const routeHandler = (req, res) => {
  if (req.url === "/message" && req.method === "GET") {
    res.write("<h1>Enter your message</h1>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message" placeholder="Your message"/><button type="submit">Submit</button></form>'
    );
    return res.end();
  } else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body)
        .toString()
        .split("=")[1]
        .replaceAll("+", " ");
      //   fs.writeFileSync("message.txt", parsedBody);
      fs.writeFile("message.txt", parsedBody, (err) => {
        if (err) {
          console.log("Error writing the file content");
          res.statusCode = 500;
          res.setHeader("Location", "/");
          return res.end();
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.write("<h1>Welcome to Home Page</h1>");
    res.end();
  }
};

module.exports = routeHandler;