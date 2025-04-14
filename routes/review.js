const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js")

 //create reviews 
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview))

  //delete review
  router.delete("/:reviewId",isAuthor,wrapAsync(reviewController.deleteReview))

  module.exports=router
