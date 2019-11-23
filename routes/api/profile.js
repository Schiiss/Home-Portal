//Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateMovieInput = require("../../validation/movies");
const validateBookInput = require("../../validation/books");

//Load profile model
const Profile = require("../../models/Profile");

//Load user model
const User = require("../../models/Users");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Route Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found for user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find()
      .populate("user", ["name"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: "There are no profiles" }));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get Profile by handle
// @access  Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile found for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get Profile by user id
// @access  Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile foind for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

// @route   POST api/profile
// @desc    Create/Edit User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Interests splits into an array
    if (typeof req.body.interests !== "undefined") {
      profileFields.interests = req.body.interests.split(",");
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update the profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/movies
// @desc    Add Movies to profile
// @access  Private
router.post(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMovieInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newMovie = {
        title: req.body.title,
        genre: req.body.genre
      };
      //Add to movie array
      profile.movies.unshift(newMovie);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/books
// @desc    Add Books to profile
// @access  Private
router.post(
  "/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBook = {
        title: req.body.title,
        author: req.body.author
      };
      //Add to movie array
      profile.books.unshift(newBook);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/movies/:movies_id
// @desc    Delete movie
// @access  Private
router.delete(
  "/movies/:movies_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.movies
          .map(item => item.id)
          .indexOf(req.params.movies_id);

        //Splice array
        profile.movies.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/books/:books_id
// @desc    Delete book
// @access  Private
router.delete(
  "/books/:books_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.books
          .map(item => item.id)
          .indexOf(req.params.books_id);

        //Splice array
        profile.books.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
