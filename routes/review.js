const express = require("express");
const router = express.Router({ mergeParams: true });
const { saveRedirectUrl, isLoggedIn, isOwner, isReviewAuthor } = require("../middleware.js");
const flash = require("connect-flash");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviews.js");


//create review  // full path /listings/:id/reviews
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));


//delete review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
