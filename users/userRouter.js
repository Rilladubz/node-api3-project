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

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "there was a problem getting user's posts" });
    });
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
  const id = req.params.id;
  userDb
    .getUserPosts(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json({ post });
      } else {
        res
          .status(404)
          .json({ errorMessage: "A user with that post does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error when finding post" });
    });
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

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const body = req.body;
  userDb
    .getById(req.user.id)
    .then(user => {
      userDb
        .update(user.id, body)
        .then(updatedUser => {
          res.status(200).json({ updatedUser });
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "Error when mountingUpdate" });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error when gettingUserId" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  console.log("POST:", req);
  let id = req.params.id;
  userDb
    .getById(id)
    .then(post => {
      if (post) {
        req.user = post;
        console.log("currentUserVALIDATED:", req.user);
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

  if (user === undefined) {
    console.log("BODY NAME:", user);
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!

  let postBody = req.body;
  console.log("BODYYY", req.body);

  if (!postBody) {
    res.status(400).json({ message: "missing post data" });
  } else if (!postBody.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    console.log(postBody);
    next();
  }
}

module.exports = router;
