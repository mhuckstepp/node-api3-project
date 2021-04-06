const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(`URL: ${req.url} Method: ${req.method}`, req.body, req.params.id);
  next();
}

function validateUserId(req, res, next) {
  console.log("validateid", req.params.id);
  User.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
}

function validateUser(req, res, next) {
  const validUser = req.body;
  if (Object.keys(req.body).length) {
    if (!validUser.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length) {
    const text = req.body.text;
    if (!text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
