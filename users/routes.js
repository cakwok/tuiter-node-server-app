import * as dao from "./dao.js";

let currentUser = null;

function UserController(app) {
  const getUsers = async (req, res) => {
    const { username, role } = req.query;
    if (username) {
      // const user = users.find((user) => user.username === username);
      const user = await dao.findUserByUsername(username);
      res.json(user);
      return;
    }
    if (role) {
      const users = await dao.findUserByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const getUserById = async (req, res) => {
    const { id } = req.params;
    // const user = users.find((user) => user._id === id);
    const user = await dao.findUserById(id);
    res.json(user);
  };

  const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    // const user = users.find((user) => user.username === username);
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const createUser = async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    // users.push({
    //   _id: new Date().getTime().toString(),
    //   ...newUser,
    // });

    await dao.createUser(newUser);
    const users = await dao.findAllUsers();

    res.json(users);
  };

  const removeUser = async (req, res) => {
    const { id } = req.params;
    // const index = users.findIndex((user) => user._id === id);
    // users.splice(index, 1);
    await dao.deleteUser(id);
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    // users.forEach((user, index) => {
    //   if (user._id === id) {
    //     users[index] = {
    //       ...newUser,
    //       _id: id,
    //     };
    //   }
    // });
    await dao.updateUser(id, newUser);
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const register = async (req, res) => {
    const { username, password , role} = req.body;

    // const existingUser = users.find((user) => user.username === username);
    const existingUser = await dao.findUserByUsername(username);

    if (existingUser) {
      res.json({ error: "User already exists" });
      return;
    }

    const user = {
      username,
      password,
      role,
    };

    const actualUser = await dao.createUser(user);

    req.session["currentUser"] = actualUser;
    currentUser = actualUser;
    // users.push(user);
    res.json(actualUser);
  };
  const login = async (req, res) => {
    const { username, password } = req.body;

    // const user = users.find(
    //   (user) => user.username === username && user.password === password
    // );
    const user = await dao.findUserByCredentials({ username, password });

    if (!user) {
      res.json({ error: "User not found" });
      return;
    }

    req.session["currentUser"] = user;
    currentUser = user;

    res.json(user);
  };
  const profile = (req, res) => {
    res.json(req.session["currentUser"]);
    // res.json(currentUser);
  };
  const logout = (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.json({ status: "ok" });
  };

  app.post("/users/register", register);
  app.post("/users/login", login);
  app.post("/users/profile", profile);
  app.post("/users/logout", logout);

  app.get("/users", getUsers);
  app.get("/users/:id", getUserById);
  app.get("/users/username/:username", getUserByUsername);
  app.post("/users", createUser);
  app.delete("/users/:id", removeUser);
  app.put("/users/:id", updateUser);
}

export default UserController;