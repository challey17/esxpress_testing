//needed to bring in app, remember app is the
//express() function
const app = require("./app");

//server controller code : the part of the code
//that starts the server listening on the givent port

app.listen(8000, () => {
  console.log("Server started at http://localhost:8000");
});
