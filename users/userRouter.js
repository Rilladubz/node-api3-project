const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDb
    .insert(req.body)
    .then(newUser => {
      res.status(201).json({ newUser });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "New User Creation Failed." });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  userDb
    .get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.user.id;
  userDb
    .remove(id)
    .then(recordsDeleted => {
      res.status(200).json({ recordsDeleted });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "User Could Was Not Deleted" });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  let id = req.params.id;
  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ errorMessage: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  let user = req.body;

  if (user.length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
