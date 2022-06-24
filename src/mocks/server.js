// we will require the file
const jsonServer = require('json-server');
const middlewares = jsonServer.defaults();
// obtain our request endpoints
const endpoints = require('./endpoints');
// obtain an instance of a server
const server = jsonServer.create();
// wire up the default node middlewares
server.use(middlewares);
// parse the body using bodyParser middleware
server.use(jsonServer.bodyParser);
// LOGIN ROUTE - POST
const { postLogin } = endpoints;
server.post(postLogin.endpoint, (req, res, next) => {
  const { username,password } = req.body;
  const responseObj = (
    postLogin.data.username === username && postLogin.data.password === password
    ? postLogin.response
    : null
  );
  if (responseObj) {
    res.send(responseObj);
  } else {
    res.status(401);
    res.send({
      errorMsg: 'Wrong Username or Password',
      code: 401
    });
  }
next();
});
// SERVER ON PORT NUMBER AS SPECIFIED HERE
server.listen(4000, () => {
  console.log('JSON Server is running');
});