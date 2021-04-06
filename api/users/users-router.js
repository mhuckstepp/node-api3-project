const express = require("express");
const User = require("./users-model");
const Post = require("../posts/posts-model");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {
  validateUserId,
  validatePost,
  validateUser,
} = require("../middleware/middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      next(err);
    });
});

//eslint-disable-next-line
router.get("/:id", validateUserId, (req, res, next) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

//eslint-disable-next-line
router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json({ id: Number(req.params.id), name: req.body.name });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then((user) => {
      res.status(200).json(req.user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  Post.getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  Post.insert(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      next(err);
    });
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    custom: "Went bad in Users",
    stack: err.stack,
  });
});

// do not forget to export the router
module.exports = router;
