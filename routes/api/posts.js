//Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Posts Model
const Post = require("../../models/Posts");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load Post Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Route Works" }));

// @route   GET api/posts
// @desc    Get Posts
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
  }
);

// @route   GET api/posts
// @desc    Get Post by ID
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res
          .status(404)
          .json({ nopostfound: "No post found with ID " + req.params.id })
      );
  }
);

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check if user owns the post
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "You are not authorized to remove this post"
            });
          }

          //Delete if passes sanity check
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "Post could not be found" })
        );
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like a post post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have already liked this post" });
          }

          //Add user id to the likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "Post could not be found" })
        );
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Remove like
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked this post" });
          }

          //Get like index and remove it
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice array
          post.likes.splice(removeIndex);

          //Save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "Post could not be found" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add a comment
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);

        //Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "The comment does not exist" });
        }
        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        post.comments.splice(removeIndex);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
