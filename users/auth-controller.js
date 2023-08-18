import * as usersDao from "./users-dao.js";

/* Assignment 5 */
const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
          res.sendStatus(409);
          return;
        }
        const newUser = usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
      };
     
    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };
      
    const profile = (req, res) => {
        console.log("auth-controller profile");
        const currentUser = req.session["currentUser"];
        console.log("auth-controller profile", currentUser);
        if (!currentUser) {
          res.sendStatus(404);
          return;
        }
        console.log(currentUser);
        res.json(currentUser);
      };
      
    const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    };
        
    const update   = (req, res) => { };
    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
    };


/* Assignment 6
const AuthController = (app) => {
  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = (req, res) => {
    console.log("auth-controller profile");
    const currentUser = req.session["currentUser"];
    console.log("auth-controller profile", currentUser);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    console.log(currentUser);
    res.json(currentUser);
  };
  
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
      
  const update   = (req, res) => { };

  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.post("/api/users/profile",  profile);
  app.post("/api/users/logout",   logout);
  app.put ("/api/users",          update);
  };
*/
/* keep */
export default AuthController;
