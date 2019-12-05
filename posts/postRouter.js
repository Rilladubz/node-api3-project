const express = require("express");
const postDb = require("../posts/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  postDb
    .get()
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.body);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.body.id;
  postDb
    .remove(id)
    .then(recordsDeleted => {
      res.status(200).json({ recordsDeleted });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Post Could Was Not Deleted", err });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const body = req.body;
  const id = req.params.id;
  console.log("IN PUT:", body);
  postDb

    .getById(id)
    .then(post => {
      postDb
        .update(post.id, body)
        .then(updatedPost => {
          if (body.text) {
            res.status(200).json({ updatedPost });
          } else {
            console.log("THE TEXT:", body);
            res.status(406).json({ errorMessage: "text content missing!" });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ errorMessage: "Error when mountingUpdate", err });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error when gettingPOSTId", err });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  let id = req.params.id;
  console.log("ID:", id, req.body);
  postDb
    .getById(id)
    .then(post => {
      if (post) {
        req.body = post;
        console.log("New Body:", req.body);
        next();
      } else {
        console.log("INCOMING POST:", post);
        res.status(400).json({ errorMessage: "invalid post id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error when mounting specified post" });
    });
}

module.exports = router;
