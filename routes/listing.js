const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const flash = require("connect-flash");
const { log } = require("console");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const mongoose = require('mongoose');
const multer = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

const listingController = require("../controllers/listings.js");

//Index route
router.get("/", wrapAsync(listingController.index));


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
router.post("/", isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing)
);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



//Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing));


// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;